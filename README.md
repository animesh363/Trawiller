# Trawiller 🏔️

**Trawiller** is a full-stack, multi-role tourism platform built for Indian hill-station destinations (Manali, Shimla, Mussoorie, Rishikesh, Nainital).

It connects **tourists** with local **service providers**: hotels/homestays, restaurants, taxi drivers, activity operators, and local shops across six distinct roles using a unified authentication system and customized role-based dashboards.

---

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Redux Toolkit, RTK Query, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Node.js, Express 4, MongoDB + Mongoose, JWT (httpOnly cookies), bcryptjs, express-validator, multer + Cloudinary.
- **Tooling**: Concurrently, Nodemon.

---

## 📦 Project Structure

```
Trawiller/
├── package.json          # Root scripts (concurrently dev runner)
├── Docs/                 # Project documentation specs & guidelines
├── server/               # Express API server
└── client/               # Vite + React SPA client
```

---

## 🛠️ Quick Start

```bash
# Install root, server, and client dependencies
npm run install:all

# Start both backend (port 5000) and frontend (port 5173) concurrently
npm run dev
```

---

## 🔐 Environment Setup

Copy `.env.example` in `server/` to `server/.env` and update the database URI and JWT secrets.
