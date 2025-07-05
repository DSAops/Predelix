# 🧠 Predelix: AI-Powered Retail Supply Chain & Last-Mile Delivery Platform

## 📚 Table of Contents
- [🚀 Project Overview](#-project-overview)
- [🏆 Problem Statement](#-problem-statement)
- [💡 What Does Predelix Do?](#-what-does-predelix-do)
- [📦 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ How It Works](#-how-it-works)
- [🚀 Getting Started](#-getting-started)
- [📡 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [🔭 Ongoing Development](#-ongoing-development)
- [👥 Team & Credits](#-team--credits)
- [📬 Contact](#-contact)

---

## 🚀 Project Overview
**Predelix** is an intelligent, end-to-end AI solution designed to transform modern retail supply chains. It addresses two key operational pain points:
1. **Inventory Demand Forecasting** – helping vendors prevent stockouts and overstocking.
2. **Last-Mile Delivery Coordination** – automating customer communication via AI-powered voice bots.

Built for scale and real-world usability, Predelix leverages machine learning, voice automation, and real-time analytics to help businesses operate smarter and faster.

---

## 🏆 Problem Statement

> **Transforming retail supply chains: From inventory management to last-mile delivery**
>
> The complexity of modern retail demands intelligent automation—from predicting product demand to coordinating timely deliveries. Shortages, overstocking, delivery failures, and missed customer communication lead to financial losses and poor customer experience.
>
> Can AI and predictive analytics create a seamless, efficient, and customer-friendly supply chain?

---

## 💡 What Does Predelix Do?

### 📊 **1. Intelligent Stock Optimization**
- Accepts CSV sales data from retail stores.
- Predicts store-level demand by date and SKU using AI.
- Helps prevent both overstocking and product shortages.
- Ensures vendors always stock the right quantity, at the right time, in the right store.

### 📞 **2. Automated Delivery Coordination**
- Accepts CSV input of customers from delivery partners.
- Bot automatically calls each customer to:
  - Confirm delivery availability time.
  - Ask for specific delivery instructions.
- Transcribes user responses and displays them in the dashboard.
- Missed/disconnected calls are queued.
- Delivery agents can trigger **“Retry Calls”** for failed numbers using a button.

---

## 📦 Features

- 📁 Upload CSVs for both sales and delivery data.
- 🤖 AI prediction for store-level stock needs.
- 📞 Voice bot integration via Twilio for delivery coordination.
- 🧠 Real-time transcription and call queue management.
- 🛠️ REST APIs for integration with frontend or 3rd-party services.
- 📊 Intuitive dashboards for vendors and delivery partners.
- 🔐 Secure, scalable backend.
- 💻 Responsive, modern frontend using React + Tailwind.

---

## 🛠️ Tech Stack

| Layer       | Technology |
|-------------|-------------|
| Frontend    | React, Tailwind CSS, Vite |
| Backend     | Python, Flask |
| AI/ML       | Pandas, Scikit-learn |
| Voice Bot   | Twilio API, SpeechRecognition |
| Deployment  | Render |
| Webhook Testing | Ngrok (for local) |

---

## ⚙️ How It Works

### 🧮 Stock Prediction Workflow:
1. Vendor uploads sales CSV.
2. AI model analyzes past trends.
3. Platform predicts product quantities needed by store & date.
4. Results shown on dashboard and available via API.

### 📞 Delivery Workflow:
1. Delivery partner uploads customer CSV.
2. Voice bot calls each customer, collects responses.
3. Bot transcribes and stores delivery preferences.
4. Unanswered/disconnected calls go to queue.
5. Delivery agent retries only queued calls using **“Retry Call”** button.

---

## 🚀 Getting Started

### Backend Setup:
```bash
git clone https://github.com/your-username/predelix.git
cd predelix/backend
pip install -r requirements.txt
python app.py


### 💻 Frontend
```bash
cd ../frontend
npm install
npm run dev
```


```

## 🌐 Webhook (for local testing)
```bash
ngrok http 5000
```

## 📡 API Documentation

| Method | Endpoint              | Description                                 |
|--------|----------------------|---------------------------------------------|
| GET    | /                    | Health check                                |
| POST   | /predict-stock       | Upload sales CSV & get stock forecast       |
| POST   | /initiate-calls      | Upload delivery CSV and start calls         |
| GET    | /call-status         | Fetch real-time call status & transcripts   |
| POST   | /retry-failed-calls  | Retry only failed/disconnected calls        |


---

## 🤝 Contributing
We welcome contributions to improve Predelix! Here’s how to get started:

```bash
# Fork the repo
git fork https://github.com/your-username/predelix.git

# Clone and create a new branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Added amazing feature"

# Push and create a pull request
git push origin feature/amazing-feature
```

---

## 🔭 Ongoing Development
We are continuously working on expanding the platform with:
- 🌍 Multilingual voice support
- 🗺️ Google Maps integration for delivery optimization
- 🔐 Role-based dashboards (vendors, agents, admins)
- 🧾 PDF/Excel download reports

Track progress here:
📌 GitHub Repo: https://github.com/your-username/predelix

---

## 👥 Team & Credits
**Team Predelix**
- Anuj Sahu – Fullstack Developer
- Devraj Patil – Fullstack Developer
- Saksham Gupta – Fullstack Developer

---

## 📬 Contact
Need a demo or have questions?
📧 Email us at: officialanuj004@gmail.com

---

Predelix: Powering the future of retail supply chains with AI.

> 🚧 **Disclaimer:** This repository contains a hackathon prototype built for learning and demo purposes only (Walmart Hackathon ’25).
