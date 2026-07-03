const BASE_URL = "http://localhost:5000";

// Create Booking
async function createBooking(data) {
    const res = await fetch("http://localhost:5000/api/bookings/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await res.json();
}

// Verify Booking

async function verifyBooking(pnr, passengerName) {

    try {

        const response = await fetch(BASE_URL + "/api/bookings/verify", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                pnr,
                passengerName
            })

        });

        return await response.json();

    } catch (error) {

        console.log(error);

        return {
            success: false,
            message: "Server Error"
        };

    }
}

// Update Seat & Meal

async function updateServices(pnr, mealPreference, seatNumber) {

    try {

        const response = await fetch(BASE_URL + "/api/bookings/" + pnr + "/services", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                mealPreference,
                seatNumber

            })

        });

        return await response.json();

    }
    catch (error) {

        console.log(error);

        return {

            success: false,

            message: "Server Error"

        };

    }

}

// Rebook Flight

async function rebookFlight(pnr) {

    try {

        const response = await fetch(BASE_URL + "/api/bookings/" + pnr + "/rebook", {

            method: "POST"

        });

        return await response.json();

    }
    catch (error) {

        console.log(error);

        return {

            success: false,

            message: "Server Error"

        };

    }

}

// Get Flight Status

async function getFlightStatus(pnr) {

    try {

        const response = await fetch(

            BASE_URL + "/api/bookings/status/" + pnr

        );

        return await response.json();

    }
    catch (error) {

        console.log(error);

        return {

            success: false,

            message: "Server Error"

        };

    }

}