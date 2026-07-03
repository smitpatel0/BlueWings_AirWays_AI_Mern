# ✈️ BlueWings AI – Airline Customer Support & Booking Assistant

BlueWings AI is a full-stack airline customer support chatbot developed as a Minimum Viable Product (MVP) for the 22North Hackathon. The application streamlines the customer journey by enabling users to book flights, manage reservations, check flight status, update seat and meal preferences, and receive instant support through an interactive conversational interface.

## 🚀 Features

* 🤖 AI-powered conversational chatbot interface
* ✈️ Flight booking with dynamic PNR generation
* 💳 Simulated payment and booking confirmation
* 📋 Manage booking using PNR and Passenger Name
* 💺 Change seat with limited seat availability
* 🍽️ Update meal preferences
* 🔄 Flight rebooking for delayed flights
* 📡 Real-time flight status lookup
* 📱 WhatsApp customer support integration
* 🗄️ MongoDB-backed booking management
* 🔗 RESTful API architecture

## 🛠️ Tech Stack

**Frontend**

* HTML5
* CSS3
* JavaScript (Vanilla)

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

## 📂 Project Highlights

* End-to-end airline booking workflow
* Modular REST APIs
* Dynamic booking and PNR generation
* Interactive chatbot-driven customer experience
* Clean separation of frontend, backend, and database layers
* Designed as a scalable foundation for future AI/LLM integration

## 📡 REST APIs

* `POST /api/bookings/new` – Create a booking
* `POST /api/bookings/verify` – Verify booking
* `PUT /api/bookings/:pnr/services` – Update seat and meal
* `GET /api/bookings/status/:pnr` – Check flight status
* `POST /api/bookings/:pnr/rebook` – Rebook delayed flight

## 🎯 Customer Journey

Book Flight → Select Cities → Choose Flight → Payment → Generate PNR → Manage Booking → Change Seat/Meal → Flight Status → Customer Support

## 💡 Future Enhancements

* Integration with real payment gateways
* Live flight schedules and inventory
* AI/LLM-powered conversational assistant
* Authentication and user accounts
* Interactive seat map
* Email and SMS ticket delivery
* Admin analytics dashboard


Directory Overview:
public/
│
├── index.html
│
├── css/
│   ├── style.css
│   ├── chat.css
│   ├── responsive.css
│   └── animations.css
│
├── js/
│   ├── app.js
│   ├── chatbot.js
│   ├── booking.js
│   ├── manageBooking.js
│   ├── api.js
│   └── ui.js
│
└── server.js
|__ README.md
|__ package.json


TEST DATA(From Mongoose) :
{
  "pnr": "BWASHD",
  "passengerName": "sbk main",
  "gender": "other",
  "age": 33,
  "email": "sss",
  "flightNumber": "BW302",
  "departure": "Ahmedabad",
  "arrival": "Delhi",
  "flightStatus": "On Time",
  "mealPreference": "Jain",
  "seatNumber": "12A",
  "__v": 0
}
