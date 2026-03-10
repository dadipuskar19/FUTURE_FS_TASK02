# LeadFlow CRM

A simple, professional CRM application to manage client leads generated from website contact forms.

Built with **React** (Vite) · **Node.js / Express** · **MongoDB / Mongoose**

---

## Features

- 🔐 **Secure Admin Access** — JWT-based authentication (register / login)
- 📋 **Lead Listing** — View all leads with name, email, source, and status
- 🔍 **Search & Filter** — Search leads by name/email, filter by status
- ✏️ **Lead Management** — Create, update, and delete leads
- 🔄 **Status Updates** — Track lead progress (New → Contacted → Qualified → Converted / Lost)
- 📝 **Notes & Follow-ups** — Add timestamped notes to each lead
- 📊 **Dashboard Stats** — Quick overview of lead counts by status

---

## Project Structure

```
task2/
├── package.json              # Server dependencies + scripts
├── .env                      # Environment variables
├── server/
│   ├── server.js             # Express entry point
│   ├── config/db.js          # MongoDB connection
│   ├── middleware/auth.js    # JWT middleware
│   ├── models/               # Mongoose schemas (Lead, User)
│   ├── routes/               # API routes (auth, leads)
│   └── seed.js               # Demo data seeder
└── client/
    ├── package.json          # React dependencies
    ├── vite.config.js        # Vite config with API proxy
    ├── index.html
    └── src/
        ├── main.jsx          # React entry point
        ├── App.jsx           # Routes & layout
        ├── index.css         # Design system & styles
        ├── api.js            # Axios helper with JWT
        ├── context/          # Auth context
        ├── components/       # Navbar, ProtectedRoute
        └── pages/            # Login, Dashboard, AddLead, LeadDetail
```

---

## Prerequisites

- **Node.js** v18+ — [https://nodejs.org](https://nodejs.org)
- **MongoDB** — either installed locally, or use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## How to Run

### 1. Install dependencies

Open a terminal in the `task2` folder and run:

```bash
npm install
cd client && npm install && cd ..
```

### 2. Configure environment variables

Edit the `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/crm_leads
JWT_SECRET=your_jwt_secret_key_here
```

> If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 3. (Optional) Seed demo data

This creates an admin account and 5 sample leads:

```bash
npm run seed
```

> Seeded admin credentials: **admin@crm.com** / **admin123**

### 4. Start the application

```bash
npm run dev
```

This runs both the Express server (port 5000) and the React dev server (port 3000) concurrently.

### 5. Open the app

Go to **[http://localhost:3000](http://localhost:3000)** in your browser.

- If you seeded data, log in with `admin@crm.com` / `admin123`
- Otherwise, click **Register** to create a new account

---

## API Endpoints

| Method | Route                    | Description             | Auth |
|--------|--------------------------|-------------------------|------|
| POST   | `/api/auth/register`     | Register new user       | No   |
| POST   | `/api/auth/login`        | Login & get JWT token   | No   |
| GET    | `/api/leads`             | List all leads          | Yes  |
| POST   | `/api/leads`             | Create a new lead       | Yes  |
| GET    | `/api/leads/:id`         | Get single lead         | Yes  |
| PUT    | `/api/leads/:id`         | Update a lead           | Yes  |
| DELETE | `/api/leads/:id`         | Delete a lead           | Yes  |
| POST   | `/api/leads/:id/notes`   | Add note to a lead      | Yes  |

---

## Tech Stack

| Layer    | Technology               |
|----------|--------------------------|
| Frontend | React 18, Vite, React Router, Axios |
| Backend  | Node.js, Express, JWT, bcrypt |
| Database | MongoDB, Mongoose        |
| Styling  | Vanilla CSS (dark theme) |
