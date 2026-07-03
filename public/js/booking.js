let bookingData = {
    passengerName: "",
    gender: "",
    age: "",
    email: "",
    departure: "",
    arrival: "",
    flightNumber: ""
};

const flights = [

    // Delhi → Mumbai
    {
        flightNumber: "BW501",
        departure: "Delhi",
        arrival: "Mumbai",
        departureTime: "09:00 AM",
        arrivalTime: "11:00 AM"
    },
    {
        flightNumber: "BW502",
        departure: "Delhi",
        arrival: "Mumbai",
        departureTime: "08:30 PM",
        arrivalTime: "10:30 PM"
    },

    // Mumbai → Bangalore
    {
        flightNumber: "BW201",
        departure: "Mumbai",
        arrival: "Bangalore",
        departureTime: "10:00 AM",
        arrivalTime: "12:00 PM"
    },
    {
        flightNumber: "BW202",
        departure: "Mumbai",
        arrival: "Bangalore",
        departureTime: "09:00 PM",
        arrivalTime: "11:00 PM"
    },

    // Ahmedabad → Delhi
    {
        flightNumber: "BW301",
        departure: "Ahmedabad",
        arrival: "Delhi",
        departureTime: "08:00 AM",
        arrivalTime: "09:30 AM"
    },
    {
        flightNumber: "BW302",
        departure: "Ahmedabad",
        arrival: "Delhi",
        departureTime: "08:00 PM",
        arrivalTime: "09:30 PM"
    },

    // Chennai → Hyderabad
    {
        flightNumber: "BW401",
        departure: "Chennai",
        arrival: "Hyderabad",
        departureTime: "07:00 AM",
        arrivalTime: "08:30 AM"
    },
    {
        flightNumber: "BW402",
        departure: "Chennai",
        arrival: "Hyderabad",
        departureTime: "07:30 PM",
        arrivalTime: "09:00 PM"
    },

    // Pune → Goa
    {
        flightNumber: "BW601",
        departure: "Pune",
        arrival: "Goa",
        departureTime: "09:15 AM",
        arrivalTime: "10:20 AM"
    },
    {
        flightNumber: "BW602",
        departure: "Pune",
        arrival: "Goa",
        departureTime: "08:15 PM",
        arrivalTime: "09:20 PM"
    },

    // Jaipur → Kolkata
    {
        flightNumber: "BW701",
        departure: "Jaipur",
        arrival: "Kolkata",
        departureTime: "11:00 AM",
        arrivalTime: "01:20 PM"
    },
    {
        flightNumber: "BW702",
        departure: "Jaipur",
        arrival: "Kolkata",
        departureTime: "09:15 PM",
        arrivalTime: "11:35 PM"
    },

    // Kochi → Chennai
    {
        flightNumber: "BW801",
        departure: "Kochi",
        arrival: "Chennai",
        departureTime: "08:30 AM",
        arrivalTime: "09:45 AM"
    },
    {
        flightNumber: "BW802",
        departure: "Kochi",
        arrival: "Chennai",
        departureTime: "07:45 PM",
        arrivalTime: "09:00 PM"
    },

    // Lucknow → Delhi
    {
        flightNumber: "BW901",
        departure: "Lucknow",
        arrival: "Delhi",
        departureTime: "09:40 AM",
        arrivalTime: "10:50 AM"
    },
    {
        flightNumber: "BW902",
        departure: "Lucknow",
        arrival: "Delhi",
        departureTime: "08:40 PM",
        arrivalTime: "09:50 PM"
    },

    // Surat → Mumbai
    {
        flightNumber: "BW1001",
        departure: "Surat",
        arrival: "Mumbai",
        departureTime: "10:10 AM",
        arrivalTime: "11:00 AM"
    },
    {
        flightNumber: "BW1002",
        departure: "Surat",
        arrival: "Mumbai",
        departureTime: "09:10 PM",
        arrivalTime: "10:00 PM"
    },

    // Bangalore → Hyderabad
    {
        flightNumber: "BW1101",
        departure: "Bangalore",
        arrival: "Hyderabad",
        departureTime: "08:45 AM",
        arrivalTime: "10:00 AM"
    },
    {
        flightNumber: "BW1102",
        departure: "Bangalore",
        arrival: "Hyderabad",
        departureTime: "08:45 PM",
        arrivalTime: "10:00 PM"
    }

];


const cities = [...new Set(
    flights.flatMap(flight => [
        flight.departure,
        flight.arrival
    ])
)];

function showCityDropdown(type){

    const select=document.createElement("select");

    select.className="city-select";

    select.innerHTML="<option>Select City</option>";

    cities.forEach(function(city){

        const option=document.createElement("option");

        option.value=city;
        option.textContent=city;

        select.appendChild(option);

    });

    select.onchange=function(){

        if(type==="departure"){

            bookingData.departure=select.value;

            showCityDropdown("arrival");

        }

        else{

            bookingData.arrival=select.value;

            showAvailableFlights();

        }

    };

    chatMessages.appendChild(select);

    scrollChat();

}


// Start Booking

function startBooking() {

    clearQuickReplies();

    bookingData = {
    passengerName: "",
    gender: "",
    age: "",
    email: "",
    departure: "",
    arrival: "",
    flightNumber: ""
};

    addBotMessage("Let's book your flight ✈");

    setTimeout(function () {

        addBotMessage("What is your name?");

    }, 500);

}

// Handle User Messages During Booking

function handleBooking(message) {

    // Full Name
    if (!bookingData.passengerName) {

        bookingData.passengerName = message;

        addBotMessage("Enter your Gender (Male / Female / Other)");

        return;
    }

    // Gender
    if (!bookingData.gender) {

        bookingData.gender = message;

        addBotMessage("Enter your Age");

        return;
    }

    // Age
    if (!bookingData.age) {

        bookingData.age = message;

        addBotMessage("Enter your Email ID");

        return;
    }

    // Email
    if (!bookingData.email) {

        bookingData.email = message;

        //addBotMessage("Select Departure City");
        showDepartureDropdown();

        return;
    }

    cities.filter(city=>city!==bookingData.departure)

    // Departure
    if (!bookingData.departure) {

        bookingData.departure = message;

        //addBotMessage("Select Arrival City");
        showArrivalDropdown()

        return;
    }

    // Arrival
    if (!bookingData.arrival) {

        bookingData.arrival = message;

        showAvailableFlights();

    }
}

function showDepartureDropdown() {

    addBotMessage("Select Departure City");

    const select = document.createElement("select");
    select.className = "city-select";

    select.innerHTML = `<option value="">Choose Departure</option>`;

    cities.forEach(city => {
        select.innerHTML += `<option value="${city}">${city}</option>`;
    });

    select.onchange = function () {

        bookingData.departure = this.value;

        this.remove();

        showArrivalDropdown();
    };

    chatMessages.appendChild(select);

    scrollChat();
}

function showArrivalDropdown() {

    addBotMessage("Select Arrival City");

    const select = document.createElement("select");

    select.className = "city-select";

    select.innerHTML = `<option value="">Choose Arrival</option>`;

    cities
        .filter(city => city !== bookingData.departure)
        .forEach(city => {

            select.innerHTML += `<option value="${city}">${city}</option>`;

        });

    select.onchange = function () {

        bookingData.arrival = this.value;

        this.remove();

        showAvailableFlights();

    };

    chatMessages.appendChild(select);

    scrollChat();
}


function showAvailableFlights() {

    let availableFlights = flights.filter(function(flight){

        return flight.departure.toLowerCase() ==
        bookingData.departure.toLowerCase()

        &&

        flight.arrival.toLowerCase() ==
        bookingData.arrival.toLowerCase();

    });

    if(availableFlights.length == 0){

        addBotMessage("Sorry! No flights are available for this route.");

        addQuickReply("Book Again", function(){

            startBooking();

        });

        return;

    }

    addBotMessage("Available Flights");

    availableFlights.forEach(function(flight){

        showFlightCard(flight);

    });

}


// Send Data to Backend

async function createBookingRequestWithPNR() {

    // 🔴 VALIDATION GATE (FIXES YOUR ERROR)
    if (
        !bookingData.passengerName ||
        !bookingData.gender ||
        !bookingData.age ||
        !bookingData.email ||
        !bookingData.departure ||
        !bookingData.arrival ||
        !bookingData.flightNumber
    ) {
        addBotMessage("❌ Booking failed: missing required passenger details.");
        return;
    }

    showTyping();

    const result = await createBooking(bookingData);

    hideTyping();

    if (result.success) {

        addBotMessage("🎉 Ticket Confirmed!");
        addBotMessage("PNR: <b>" + result.booking.pnr + "</b>");

        showBookingCard(result.booking);

        clearQuickReplies();

        addQuickReply("Manage Booking", function () {
            startManageBooking();
        });

        addQuickReply("Book Another Flight", function () {
            startBooking();
        });

    } else {
        addBotMessage(result.message);
    }
}

// Dummy Function
function selectFlight(flightNumber){

    bookingData.flightNumber = flightNumber;

    addBotMessage("✈ You selected flight " + flightNumber);

    showPaymentOption();

}

function showPaymentOption(){

    addBotMessage("💳 Proceed to payment to confirm your booking.");

    let payBtn = document.createElement("button");

    payBtn.innerText = "Pay Now ₹4999";

    payBtn.className = "action-btn";

    payBtn.onclick = function(){

        processPayment();

    };

    chatMessages.appendChild(payBtn);

    scrollChat();

}

async function processPayment() {

    showTyping();

    setTimeout(async function () {

        hideTyping();

        addBotMessage("✅ Payment Successful!");

        // ONLY proceed if flight is selected
        if (!bookingData.flightNumber) {
            addBotMessage("❌ No flight selected. Booking cancelled.");
            return;
        }

        await createBookingRequestWithPNR();

    }, 1500);
}