# 🌟 TaskPulse – Real-Time Job Scheduler

TaskPulse is a full-stack web application that allows users to **schedule, execute, and monitor jobs in real time**. It supports **one-time tasks**, **recurring jobs**, and provides **live execution logs** through WebSockets for a seamless and reactive user experience.

### 🔗 Live Demo

👉 [https://taskpulse-jdh4.onrender.com](https://taskpulse-jdh4.onrender.com)

---

## 📑 Table of Contents

* [Features](#-features)
* [How the Scheduler Works](#-how-the-scheduler-works)
* [Tech Stack](#-tech-stack)
* [Installation](#-installation)
* [Usage](#-usage)
* [Examples](#-examples)
* [Troubleshooting](#-troubleshooting)
* [Contributing](#-contributing)
* [License](#-license)

---

## ⚡ Features

### 🔐 Secure Authentication

* JWT-based Register/Login
* Password hashing with **bcrypt**

### ⏰ Job Scheduling

* Schedule one-time jobs for any future timestamp
* Execute **shell commands** (`curl`, `ls`, scripts, etc.)

### 🔁 Recurring Jobs

* Run tasks repeatedly at custom intervals
* Example: run `curl my-api` every **30 seconds**

### 📡 Real-Time Dashboard (Socket.IO)

* Live countdown timers
* Immediate job results (success/error)
* Auto-refreshing job list

### 📋 Job Management

* View upcoming and completed jobs
* Delete individual tasks or clear all
* Personal job execution history

---

## 🧠 How the Scheduler Works

### 1️⃣ Loading Jobs on Startup

* Jobs are fetched from MongoDB
* Stored in an in-memory Map: **jobMap**

  * **Key:** timestamp (seconds)
  * **Value:** array of jobs for that second

### 2️⃣ Ticker Loop

A `setInterval` runs every second:

* Gets current timestamp
* Checks jobMap for any jobs due

### 3️⃣ Queue + Worker Model

* Matching jobs are placed in `jobQueue`
* A **single worker** runs jobs one at a time
* Commands executed via `child_process.exec`
* Results streamed to clients via Socket.IO

### 4️⃣ Real-Time Feedback

Worker emits:

* Success output
* Error logs
* Status updates to dashboard

### 5️⃣ Recurring Jobs

* Scheduler calculates next run time
* Updates job in MongoDB
* Re-inserts job into jobMap

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express
**Database:** MongoDB Atlas + Mongoose
**Authentication:** JWT, bcrypt
**Real-Time:** Socket.IO
**Frontend:** EJS, Bootstrap
**Deployment:** Render + MongoDB Atlas

---

## 🚀 Installation

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```
ATLASDB_URL=mongodb+srv://your_user:your_pass@cluster.mongodb.net/jobSchedulerDB
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

### 4. Start Development Server

```sh
npm run dev
```

### 5. Open the App

👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Usage

1. **Register/Login** to create an account
2. Navigate to **Dashboard**
3. Create:

   * One-time job
   * Recurring job
4. View:

   * Job status
   * Real-time logs
   * Countdown timers
5. Manage:

   * Delete jobs
   * Clear history

---

## 📘 Examples

### Example 1: Run a cURL Request in 20 Seconds

* Command: `curl https://api.github.com`
* Time: `now + 20 seconds`

### Example 2: Recurring Task Every 30 Seconds

* Command: `curl http://your-api/ping`
* Interval: `30` seconds

---

## 🧯 Troubleshooting

| Issue                      | Possible Cause               | Fix                                  |
| -------------------------- | ---------------------------- | ------------------------------------ |
| Jobs not executing         | Server clock mismatch        | Ensure server time is correct        |
| WebSocket not connecting   | Render timeout / proxy issue | Enable WebSockets in Render settings |
| “MongoDB connection error” | Wrong ATLASDB_URL            | Verify credentials, IP whitelist     |

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue to discuss your ideas.

---

## 📜 License

This project is licensed under the **MIT License**.

---

