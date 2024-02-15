Backend for Civic Engagement App 🛠️

This backend repository is part of the Civic Engagement App project, aimed at empowering users to participate in political and social activism. Built with Express, Node.js, and PostgreSQL, this backend provides the necessary APIs to support event management and donation functionalities.

Features 🚀
Event Management: Users can view, create, and delete events happening in their area.
Donation Support: Backend facilitates donation processing within the user's locality.

Technologies Used 💻
Express: A fast, unopinionated, minimalist web framework for Node.js.
Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
PostgreSQL: An open-source relational database system.


Setup Instructions 📋
Clone this repository.
Install dependencies using <npm install>.
Set up your PostgreSQL database and update the database configuration in 
Run migrations and seed data with 
Start the server with <npm start>.


Backend APIs will be accessible at http://localhost:
API Endpoints 📡
GET /events: Retrieve a list of events in the user's area.
POST /events: Create a new event.
DELETE /events/:id: Delete an existing event by ID.
POST /donate: Process a donation within the user's locality.
