const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bluewings')
  .then(() => console.log("🟢 Connected to MongoDB Engine"))
  .catch((err) => console.error("🔴 Critical DB Connection Failure:", err));

// --- DATA STRUCTURE SCHEMA ---
const BookingSchema = new mongoose.Schema({
    pnr: String,
    passengerName: String,
    gender: String,
    age: Number,
    email: String,
    flightNumber: String,
    departure: String,
    arrival: String,
    flightStatus: { type: String, default: "On Time" },
    mealPreference: { type: String, default: "Standard" },
    seatNumber: { type: String, default: "12A" }
});

const Booking = mongoose.model('Booking', BookingSchema);

// --- SEED INITIAL TEST DATA ---
async function insertSampleTestData() {
    try {
        const count = await Booking.countDocuments({});
        if (count === 0) {
            await Booking.create([
                { pnr: 'BW1234', passengerName: 'Rahul Sharma', flightNumber: 'BW-501', departure: 'DEL (Delhi)', arrival: 'BOM (Mumbai)', flightStatus: 'On Time' },
                { pnr: 'DELAY7', passengerName: 'Aanya Patel', flightNumber: 'BW-202', departure: 'BOM (Mumbai)', arrival: 'BLR (Bangalore)', flightStatus: 'Delayed' }
            ]);
            console.log("⭐ Database empty. Seeding verification profiles.");
        }
    } catch (error) {
        console.error("Database seeding failed:", error);
    }
}
insertSampleTestData();

// --- JURY-READY REST API ROUTES ---

// 1. Dynamic Booking Engine with Input Validation
app.post('/api/bookings/new', async (req, res) => {

    try {
        const {
            passengerName,
            gender,
            age,
            email,
            flightNumber,
            departure,
            arrival
        } = req.body;

        // VALIDATION
        if (
            !passengerName ||
            !gender ||
            !age ||
            !email ||
            !flightNumber ||
            !departure ||
            !arrival
        ) {
            return res.status(400).json({
                success: false,
                message: "Validation Failed: All fields required"
            });
        }

        const generatedPnr =
            "BW" + Math.random().toString(36).substring(2, 6).toUpperCase();

        const newBooking = await Booking.create({
            pnr: generatedPnr,
            passengerName,
            gender,
            age,
            email,
            flightNumber,
            departure,
            arrival
        });

        return res.status(201).json({
            success: true,
            booking: newBooking
        });

    } catch (err) {
        console.error("BOOKING ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// 2. Authentication Endpoint
app.post('/api/bookings/verify', async (req, res) => {
    const { pnr, passengerName } = req.body;

    if (!pnr || !passengerName) {
        return res.status(400).json({ success: false, message: "Credentials missing from request." });
    }

    try {
        const match = await Booking.findOne({ 
            pnr: pnr.toUpperCase().trim(), 
            passengerName: { $regex: new RegExp("^" + passengerName.trim() + "$", "i") } 
        });

        if (!match) {
            return res.status(404).json({ success: false, message: "Invalid PNR or Passenger Name combination." });
        }

        return res.json({ success: true, booking: match });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error executing credential match query." });
    }
});

// Get Flight Status
app.get("/api/bookings/status/:pnr", async (req, res) => {

    try {

        const booking = await Booking.findOne({
            pnr: req.params.pnr.toUpperCase()
        });

        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });

        }

        res.json({
            success: true,
            booking: {
                pnr: booking.pnr,
                passengerName: booking.passengerName,
                flightNumber: booking.flightNumber,
                departure: booking.departure,
                arrival: booking.arrival,
                flightStatus: booking.flightStatus
            }
        });

    }
    catch (err) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});


// 3. Ancillary Updates with Structural Data Guards
app.put('/api/bookings/:pnr/services', async (req, res) => {
    const { mealPreference, seatNumber } = req.body;

    // Reject empty structural updates
    if (!mealPreference || !seatNumber) {
        return res.status(400).json({ success: false, message: "Service preferences cannot be blank." });
    }

    try {
        const updatedBooking = await Booking.findOneAndUpdate(
            { pnr: req.params.pnr.toUpperCase() },
            { mealPreference, seatNumber },
            { new: true, runValidators: true }
        );
        
        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Booking target reference not found." });
        }

        return res.json({ success: true, booking: updatedBooking });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to persist data configurations to MongoDB." });
    }
});

// 4. Automated Core Disruption Mitigation Engine
app.post('/api/bookings/:pnr/rebook', async (req, res) => {
    try {
        const flightRecord = await Booking.findOne({ pnr: req.params.pnr.toUpperCase() });

        if (!flightRecord) {
            return res.status(404).json({ success: false, message: "Itinerary target not found." });
        }

        if (flightRecord.flightStatus !== 'Delayed') {
            return res.status(400).json({ success: false, message: "Flight is operating normally. Process aborted." });
        }

        // Apply business logic transformation rules
        flightRecord.flightNumber = flightRecord.flightNumber + "-ALT";
        flightRecord.flightStatus = 'On Time'; 
        await flightRecord.save();

        return res.json({ success: true, booking: flightRecord });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Automated schedule assignment processor failed." });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Secure Production Engine executing on http://localhost:${PORT}`));