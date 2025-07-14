# 🧠 Predelix: AI-Powered Retail Supply Chain & Last-Mile Delivery Platform

## 📚 Table of Contents
- [🚀 Project Overview](#-project-overview)
- [🏆 Problem Statement](#-problem-statement)
- [💡 What Does Predelix Do?](#-what-does-predelix-do)
- [📦 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ How It Works](#how-it-works)
- [🚀 Getting Started](#-getting-started)
- [📡 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [🔭 Ongoing Development](#-ongoing-development)
- [👥 Team & Credits](#-team--credits)
- [📈 Charts](#charts)
- [📸 Snapshots](#snapshots)
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
Retailers contend with two critical, costly challenges:

Inventory Imbalance: Manual forecasting leads to stockouts (lost sales, unhappy customers) or overstock (excess capital tied up, waste).

Delivery Inefficiency: Unconfirmed delivery windows result in failed drop‑offs, wasted driver time, and poor customer experience.
These issues occur daily across all stores and delivery zones—especially during peak seasons—eroding profitability and brand loyalty.

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
## 🧠 ML Model Details

We use a **Random Forest Regressor** from Scikit-learn to predict stock requirements per store and SKU.

### 📄 Dataset:
- Format: CSV with `date`, `SKU ID`, `store ID`, `units sold`
- Source: Simulated real-world retail sales data

### 🔍 Feature Engineering:
- Date-based features: day of week, month, holidays
- Lag variables and rolling average sales
- One-hot encoding of categorical variables

### 🧠 Model Used:
- Algorithm: `RandomForestRegressor`
- Parameters: `n_estimators=100`, `max_depth=10`
- Framework: `Scikit-learn`

> 📌 This model enables store-specific predictions for each product to reduce understocking and wastage.

---

## 🧩 Use Cases

- 🏬 **Retail Chains**: Automate stock distribution across branches.
- 🚚 **Logistics Teams**: Ensure customer availability before dispatch.
- 🛒 **D2C Brands**: Use AI to improve customer delivery coordination.
- 📦 **Warehousing Units**: Forecast demand and reduce excess inventory.

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
# .env
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
and more....


```

## 🌐 Webhook (for local testing)
```bash
ngrok http 5000
```

## 📡 API Documentation

| Method | Endpoint              | Description                                 |
|--------|----------------------|---------------------------------------------|
| GET    | /                    | Health check                                |
| POST   | /api/predict      | Upload sales CSV & get stock forecast       |
| POST   | /api/trigger_calls | Upload delivery CSV and start calls         |
| GET    | /api/results        | Fetch real-time call status & transcripts   |
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

Track progress here:
📌 GitHub Repo: [https://github.com/your-username/predelix](https://github.com/DSAops/Predelix)

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

## charts
![WhatsApp Image 2025-07-13 at 23 05 44_2b1a6b80](https://github.com/user-attachments/assets/4ad574f2-7841-4725-977c-20faf2fb431e)


---
## Snapshots

![Screenshot 2025-07-09 030247](https://github.com/user-attachments/assets/79696671-c9d4-4631-8b8c-22dacbec1055)
![Screenshot 2025-07-09 025836](https://github.com/user-attachments/assets/f78999b7-2bc0-4d7d-84eb-3a575396d48e)
![Screenshot 2025-07-09 025853](https://github.com/user-attachments/assets/ce05987b-e54a-4e90-93fa-8b850a6daae0)
![image](https://github.com/user-attachments/assets/c7971fe2-552c-4f38-b9e5-3343e5865cc5)
![image](https://github.com/user-attachments/assets/4fb75658-dead-4c88-829b-37fa44cb1df0)
![Screenshot 2025-07-09 025759](https://github.com/user-attachments/assets/3437f175-16d5-4c83-94cf-e3c0e622a99e)
![Screenshot 2025-07-09 025807](https://github.com/user-attachments/assets/02b52b50-0a51-46ac-94f6-b4ea1b7f0ec3)
![Screenshot 2025-07-09 025720](https://github.com/user-attachments/assets/9660a0ed-7c6a-4102-a74d-ca709d5e422b)
![Screenshot 2025-07-09 025824](https://github.com/user-attachments/assets/879a270b-4e27-4132-a472-3e8300fbf40a)


---


Predelix: Powering the future of retail supply chains with AI.

> 🚧 **Disclaimer:** This repository contains a hackathon prototype built for learning and demo purposes only.
>
> 💡 Made with ❤️ during Walmart Hackathon '25 by Team DSA. (Devraj, Saksham, and Anuj)
