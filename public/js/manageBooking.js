let manageData = {};
let currentBooking = null;

// Start Manage Booking

function startManageBooking() {

    clearQuickReplies();

    manageData = {};

    addBotMessage("Let's manage your booking.");

    setTimeout(function () {

        addBotMessage("Enter your PNR Number.");

    }, 500);

}

// Handle Conversation

function handleManageBooking(message) {

    // STEP 1: PNR
    if (!manageData.pnr) {

        manageData.pnr = message.toUpperCase().trim();
        addBotMessage("Enter your Name.");
        return;
    }

    // STEP 2: Passenger Name
    if (!manageData.passengerName) {

        const passengerName = message.trim();

        if (!passengerName) {
            addBotMessage("Please enter a valid name.");
            return;
        }

        manageData.passengerName = passengerName;

        verifyBookingRequest();
    }
}

// Verify Booking

async function verifyBookingRequest() {

    showTyping();

    const result = await verifyBooking(
        manageData.pnr,
        manageData.passengerName
    );

    hideTyping();

    if (result.success) {

        currentBooking = result.booking;

        addBotMessage("Booking Found ✅");

        showBookingCard(currentBooking);

        showManageOptions();

    }
    else {

        addBotMessage(result.message);

        addQuickReply("Try Again", function () {

            startManageBooking();

        });

    }

}

// Show Options

function showManageOptions() {

    clearQuickReplies();

    addQuickReply("Change Seat", function () {

        changeSeat();

    });

    addQuickReply("Change Meal", function () {

        changeMeal();

    });

    addQuickReply("Rebook Flight", function () {

        rebookCurrentFlight();

    });

    addQuickReply("Talk to Agent", function () {

        talkToAgent();

    });

}

// Change Seat

async function changeSeat() {

    addBotMessage("⚠ Only limited seats are left.");

    const availableSeats = [
        "2A", "3C", "4F",
        "7B", "9A", "10C",
        "14D", "16F"
    ];

    let seatContainer = document.createElement("div");
    seatContainer.className = "seat-container";

    availableSeats.forEach(function(seat){

        let btn = document.createElement("button");

        btn.className = "seat-btn";
        btn.innerText = seat;

        btn.onclick = async function(){

            showTyping();

            const result = await updateServices(
                currentBooking.pnr,
                currentBooking.mealPreference,
                seat
            );

            hideTyping();

            if(result.success){

                currentBooking = result.booking;

                addBotMessage("✅ Seat changed successfully to " + seat);

                showBookingCard(currentBooking);

                seatContainer.remove();

            }
            else{

                addBotMessage(result.message);

            }

        };

        seatContainer.appendChild(btn);

    });

    chatMessages.appendChild(seatContainer);

    scrollChat();
}
// Change Meal

async function changeMeal() {

    askInChat("Please enter meal preference (Veg / Non-Veg / Jain).", async function(meal){

        showTyping();

        const result = await updateServices(
            currentBooking.pnr,
            meal,
            currentBooking.seatNumber
        );

        hideTyping();

        if(result.success){

            currentBooking = result.booking;

            addBotMessage("Meal updated successfully.");

            showBookingCard(currentBooking);

        }

    });

}

// Rebook Flight

async function rebookCurrentFlight() {

    showTyping();

    const result = await rebookFlight(currentBooking.pnr);

    hideTyping();

    if (result.success) {

        currentBooking = result.booking;

        addBotMessage("Your Flight Has Been Rebooked.");

        showBookingCard(currentBooking);

    }
    else {

        addBotMessage(result.message);

    }

}

// WhatsApp Agent

function talkToAgent() {

    addBotMessage(

        "Redirecting you to a customer support agent."

    );

    setTimeout(function () {

        window.open(

            "https://wa.me/911234567890",

            "_blank"

        );

    }, 1000);

}


function askInChat(question, callback) {

    addBotMessage(question);

    window.chatCallback = callback;

}