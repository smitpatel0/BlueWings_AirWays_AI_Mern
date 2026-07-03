// Chat Area
const chatMessages = document.getElementById("chatMessages");
const quickReplies = document.getElementById("quickReplies");

// Add Bot Message
function addBotMessage(message) {

    let messageDiv = document.createElement("div");
    messageDiv.className = "bot-message";

    messageDiv.innerHTML = `
        <div class="bot-icon">🤖</div>

        <div class="bot-bubble">
            ${message}
            <span class="time">${getTime()}</span>
        </div>
    `;

    chatMessages.appendChild(messageDiv);

    scrollChat();

}

// Add User Message
function addUserMessage(message) {

    let messageDiv = document.createElement("div");
    messageDiv.className = "user-message";

    messageDiv.innerHTML = `
        <div class="user-bubble">
            ${message}
            <span class="time">${getTime()}</span>
        </div>

        <div class="user-icon">😊</div>
    `;

    chatMessages.appendChild(messageDiv);

    scrollChat();

}

// Show Flight Card
function showFlightCard(flight) {

    let card = document.createElement("div");

    card.className = "flight-card";

    card.innerHTML = `
    <h3>${flight.flightNumber}</h3>

    <p><strong>Departure:</strong> ${flight.departureTime}</p>

    <p><strong>Arrival:</strong> ${flight.arrivalTime}</p>

    <button onclick="selectFlight('${flight.flightNumber}')">
        Select Flight
    </button>
`;

    chatMessages.appendChild(card);

    scrollChat();

}

// Show Booking Details
function showBookingCard(booking) {

    let card = document.createElement("div");

    card.className = "booking-card";

    card.innerHTML = `
        <h3>Booking Confirmed</h3>

        <p><b>PNR:</b> ${booking.pnr}</p>

        <p><b>Name:</b> ${booking.passengerName}</p>

        <p><b>Gender:</b> ${booking.gender}</p>

        <p><b>Age:</b> ${booking.age}</p>

        <p><b>Email:</b> ${booking.email}</p>

        <p><b>Flight:</b> ${booking.flightNumber}</p>

        <p><b>Seat:</b> ${booking.seatNumber}</p>

        <p><b>Meal:</b> ${booking.mealPreference}</p>

        <p><b>Route:</b> ${booking.departure} → ${booking.arrival}</p>

        <p><b>Status:</b> ${booking.flightStatus}</p>
    `;

    chatMessages.appendChild(card);

    scrollChat();
}

// Typing Animation

function showTyping() {

    let typing = document.createElement("div");

    typing.className = "typing";

    typing.id = "typing";

    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    chatMessages.appendChild(typing);

    scrollChat();

}

function hideTyping() {

    let typing = document.getElementById("typing");

    if (typing) {
        typing.remove();
    }

}

// Quick Reply Buttons

function clearQuickReplies() {

    quickReplies.innerHTML = "";

}

function addQuickReply(text, onclickFunction) {

    let button = document.createElement("button");

    button.className = "quick-btn";

    button.innerText = text;

    button.onclick = onclickFunction;

    quickReplies.appendChild(button);

}

// Time

function getTime() {

    let now = new Date();

    return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

// Scroll

function scrollChat() {

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

// Clear Chat (Optional)

function clearChat() {

    chatMessages.innerHTML = "";

}

// Welcome Message

function showWelcomeMessage() {

    addBotMessage(`
        <b>✈ Welcome to BlueWings Airlines</b><br><br>

        I am your virtual travel assistant.<br><br>

        I can help you with:<br>

        ✈ Booking a flight<br>
        🛄 Managing your booking<br>
        📍 Checking flight status<br>
        💬 Connecting to support agent<br><br>

        Please choose an option from the left menu or below.
    `);

    setTimeout(function(){

    showHomeOptions();

    }, 500);
}