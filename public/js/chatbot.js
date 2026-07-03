// Current Conversation

let currentMode = "";

// Booking Button

document.getElementById("bookBtn").addEventListener("click", function () {

    currentMode = "booking";

    startBooking();

});

// Manage Button

document.getElementById("manageBtn").addEventListener("click", function () {

    currentMode = "manage";

    startManageBooking();

});

// Flight Status Button

document.getElementById("statusBtn").addEventListener("click", function () {

    currentMode = "status";

    clearQuickReplies();

    addBotMessage("Please enter your PNR Number to check flight status.");

});

// Agent Button

document.getElementById("agentBtn").addEventListener("click", function () {

    talkToAgent();

});

// Send Message

function sendMessage() {

    let input = document.getElementById("messageInput");
    let message = input.value.trim();

    if(message == "") return;

    addUserMessage(message);
    input.value = "";

    // If chatbot is waiting for a callback (seat/meal input)
    if(window.chatCallback){

        let cb = window.chatCallback;
        window.chatCallback = null;
        cb(message);

        return;
    }

    // Normal flows
    if(currentMode == "booking"){
        handleBooking(message);
        return;
    }

    if(currentMode == "manage"){
        handleManageBooking(message);
        return;
    }

    if(currentMode == "status"){
        checkFlightStatus(message);
        return;
    }

    addBotMessage("Please select an option from menu.");
}

// Flight Status

async function checkFlightStatus(pnr) {

    showTyping();

    const result = await getFlightStatus(pnr);

    hideTyping();

    if (result.success) {

        const booking = result.booking;

        addBotMessage(
            "<b>Flight Status</b><br><br>" +
            "PNR : " + booking.pnr + "<br>" +
            "Flight : " + booking.flightNumber + "<br>" +
            "Route : " + booking.departure + " → " + booking.arrival + "<br>" +
            "Status : <b>" + booking.flightStatus + "</b>"
        );

    }
    else {

        addBotMessage(result.message);

    }

}

// Enter Key Support

document
.getElementById("messageInput")
.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});

// Send Button

document
.getElementById("sendBtn")
.addEventListener("click", function () {

    sendMessage();

});