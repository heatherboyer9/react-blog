# React Blog

A full-stack blog application with article browsing, upvoting, and commenting. Authentication is handled via Firebase.

## Tech Stack

**Frontend:**

- React 18
- TypeScript
- Vite
- React Router v6
- Material UI (MUI)
- Tailwind CSS
- Axios
- Firebase (Auth, SDK)
- Emotion (CSS-in-JS for MUI)

**Backend:** Node.js, Express 5, TypeScript, MongoDB, Firebase Admin SDK

## Project Structure

```
react-blog/
├── frontend/   # React + Vite app
├── backend/    # Express API server
└── data/       # Seed data
```

## Prerequisites

- Node.js
- MongoDB running locally on port `27017`
- A Firebase project with Authentication enabled
- A Firebase Admin SDK credentials file at `backend/credentials.json`

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

The API server runs on `http://localhost:3000`.

Set `DB_HOST` as an environment variable to override the default MongoDB connection string.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. API requests are proxied to the backend via Vite's dev server config.

## API Endpoints

| Method | Path                           | Auth     | Description                       |
| ------ | ------------------------------ | -------- | --------------------------------- |
| GET    | `/api/articles`                | —        | List all articles                 |
| GET    | `/api/articles/:name`          | —        | Get a single article              |
| POST   | `/api/articles/:name/upvote`   | Required | Upvote an article (once per user) |
| POST   | `/api/articles/:name/comments` | Required | Add a comment to an article       |

Authenticated routes require a Firebase ID token passed as a Bearer token in the `Authorization` header.

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Email/Password authentication
3. Download a service account key and save it to `backend/credentials.json` (this file is gitignored)
4. Add your Firebase client config to the frontend (e.g. via environment variables or a config file)
