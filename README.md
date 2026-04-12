# Veil Board

A community-driven message board built with **Node.js**, **Express**, **EJS**, and **PostgreSQL**. Users can sign up, log in, create posts, edit and delete their own posts, and join a membership role for additional authorization behavior.

## Live Demo

[View Live Demo](#)

## Features

- **User Authentication**: Sign up with secure password hashing and log in with Passport.js local strategy
- **Protected Routes**: Only authenticated users can access profiles, post creation, and membership pages
- **Post Management**: Create, read, update, and delete posts with title and content validation
- **Role-Based Authorization**: Users can upgrade to a member role and only owners or admins can edit/delete posts
- **User Profiles**: View a user profile page with their posts and contextual actions
- **Server-Side Rendering**: EJS templates with layout support for dynamic page rendering
- **Session Persistence**: PostgreSQL-backed session storage using `connect-pg-simple`
- **Form Validation**: Input validation with `express-validator` on signup, login, and post forms

## Tech Stack

- **Backend**: Node.js, Express.js
- **Templating**: EJS, express-ejs-layouts
- **Database**: PostgreSQL
- **Authentication**: Passport.js, bcrypt
- **Session Store**: connect-pg-simple
- **Validation**: express-validator

## Getting Started

```bash
git clone https://github.com/Sai-Eshwar-Supreet/veil-board.git
cd veil-board
npm install
```

### Initialize the database

```bash
npm run db:init -- <your_connection_string>
```

### Run the app

```bash
npm run dev
```

The application will start on `http://localhost:8080` by default.

## Environment Configuration

Create a `.env` file in the project root with the following values:

```env
PORT=8080
DB_CONNECTION_STRING=<your_connection_string>
SESSION_SECRET=<your_session_secret>
TITLE=Veil Board
SALT_ROUNDS=10
NODE_ENV=<production | development>
```

## Project Structure

```text
.
├── app.cjs                # Main Express app and route mounting
├── configs/               # Passport and session setup
├── controllers/           # Application request handlers
├── db/                    # PostgreSQL queries and initialization scripts
├── lib/                   # Middleware, utilities, and helpers
├── models/                # Shared app settings
├── posts/                 # Post formatting helpers
├── public/                # Static assets and styles
├── routes/                # Route definitions
└── views/                 # EJS templates and partials
```

## Notes

- Uses PostgreSQL for both application data and session storage
- Includes user registration, login, profile pages, and membership promotion
- Validates user input and handles errors with friendly feedback
