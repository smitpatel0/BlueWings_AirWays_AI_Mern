// Start Application

window.onload = function () {

    showWelcomeMessage();

    showHomeOptions();

};

// Home Buttons

function showHomeOptions() {

    clearQuickReplies();

    addQuickReply("✈ Book Flight", function () {

        currentMode = "booking";

        startBooking();

    });

    addQuickReply("🛄 Manage Booking", function () {

        currentMode = "manage";

        startManageBooking();

    });

    addQuickReply("📍 Flight Status", function () {

        currentMode = "status";

        clearQuickReplies();

        addBotMessage("Please enter your PNR Number.");

    });

    addQuickReply("💬 Talk to Agent", function () {

        talkToAgent();

    });

}

// Reset Chat

function resetChat() {

    clearChat();

    currentMode = "";

    showWelcomeMessage();

    showHomeOptions();

}

// Sidebar Active Button

let buttons = document.querySelectorAll(".menu-btn");

buttons.forEach(function(button){

    button.addEventListener("click", function(){

        buttons.forEach(function(btn){

            btn.classList.remove("active");

        });

        this.classList.add("active");

    });

});

// Optional Refresh Button

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        resetChat();

    }

});