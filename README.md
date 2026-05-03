# 🚀 Collaborative Team Hub

A full-stack real-time collaboration platform for managing teams, goals, announcements, and action items with live updates.

Built using a **Turborepo monorepo architecture** with Next.js frontend and Node.js backend.

---

## 🧠 Tech Stack

### Frontend
- Next.js 14 (App Router)
- JavaScript
- Tailwind CSS
- Zustand (State Management)

### Backend
- Node.js + Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication (Access + Refresh Tokens)

### Real-time & Services
- Socket.io (Live updates)
- Cloudinary (Image uploads)
- Nodemailer / EmailJS (Email notifications)

---

## 📁 Monorepo Structure

```

/apps
/frontend   → Next.js App
/backend    → Express API

/packages
/db         → Prisma schema & database config


## ⚙️ Environment Setup

### 🔐 Backend `.env`

Create `.env` inside `/apps/backend`

```

DATABASE_URL=your_postgres_url

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=[http://localhost:3000](http://localhost:3000)

```

---

### 🌐 Frontend `.env.local`

Create `.env.local` inside `/apps/frontend`

```

NEXT_PUBLIC_API_URL=[http://localhost:5000](http://localhost:5000)
NEXT_PUBLIC_SOCKET_URL=[http://localhost:5000](http://localhost:5000)

````

---

## 🚀 How to Run Locally

### 1️⃣ Clone the project

```bash
git clone https://github.com/Fahmida0010/Collaboration-Hub.git
cd your-repo
````

---

### 2️⃣ Install dependencies (Turborepo root)

```bash
npm install
```

---

### 3️⃣ Setup database (Prisma)

```bash
cd packages/db
npx prisma generate
npx prisma migrate dev
```

---

### 4️⃣ Run backend

```bash
cd apps/backend
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

### 5️⃣ Run frontend

Open a new terminal:

```bash
cd apps/frontend
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

## ⚡ Features

### 🔐 Authentication

* Register / Login with JWT
* Protected routes
* Profile with avatar upload

### 🏢 Workspaces

* Create & switch workspaces
* Invite members via email
* Role-based access (Admin / Member)

### 🎯 Goals System

* Create goals with milestones
* Progress tracking
* Activity feed

### 📢 Announcements

* Rich text posts
* Reactions + comments
* Pin important posts

### ✅ Action Items

* Task management system
* Kanban + list view
* Linked to goals

### ⚡ Real-time System

* Live updates with Socket.io
* Online users indicator
* @mentions notifications

### 📊 Analytics

* Goal stats dashboard
* Progress charts (Recharts)
* CSV export

---

## 🧪 Advanced Features

* ⚡ Optimistic UI updates
* 🧑‍🤝‍🧑 Real-time collaborative editing (live cursors)

---

## 🛠️ Requirements

* Node.js 18+
* PostgreSQL database
* npm

---

## ▶️ Start Command Summary

```bash
npm install
npx prisma generate
npm run dev
```

---

## 📌 Notes

* Make sure backend runs before frontend
* Ensure `.env` files are properly configured
* Prisma must be migrated before starting

