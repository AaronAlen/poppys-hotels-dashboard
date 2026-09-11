# Poppys Hotels — Hotel Management & AI Analytics Dashboard (MERN Stack)

A modern, enterprise-grade **Hotel Management & AI Analytics Business Intelligence Platform** designed for **Poppys Hotels**, optimized for a 16:9 desktop workspace.

Built with the **MERN Stack**:
- **MongoDB / Mongoose**: Schemas & models for Branches, Bookings, Room Categories, Restaurant orders, Staff, and AI Alerts.
- **Express.js**: REST API server on port `5000` with 12 operational endpoints and conversational AI inference.
- **React.js (Vite)**: Modern component architecture, separate tab navigation, Chart.js neon charts, interactive Tamil Nadu regional map, and real-time AI assistant.
- **Node.js**: Unified runtime powering both client and server via a single `npm run dev` command.

---

## 🚀 Quick Start (Single Command)

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Install Dependencies
```bash
# Install root, server, and client dependencies
npm install
npm install --prefix server
npm install --prefix client
```

### 2. Start Both Server & Client Concurrently
```bash
npm run dev
```

- **Frontend (React + Vite)**: `http://localhost:5173`
- **Backend (Express REST API)**: `http://localhost:5000/api`

---

## 🌟 Key Features

1. **Dedicated Tab Views (No Awkward Single-Page Scrolling)**:
   - **Overview**: 8 KPI cards, active alerts, revenue & occupancy neon charts, channel donut.
   - **Branches**: 8-branch operational matrix, sorting, search, and interactive Tamil Nadu regional map with pulsating status pins.
   - **Rooms & Occupancy**: Room category yield (Standard, Deluxe, Premium, Suite, Family) and 7-day AI predictive occupancy forecast.
   - **Bookings**: Channel distribution (Direct Website 38%, OTA 27%, Corporate 14%, etc.) and 7-day daily volume pace.
   - **Restaurant (F&B)**: Past week daily orders bar chart (Saturday peak 782 orders) and top 5 dishes (Chicken Biryani, Masala Dosa, etc.).
   - **Staff**: 186 headcount breakdown across 6 wings and branch staff/guest ratios.
   - **Revenue**: Stream breakdown, RevPAR (₹1,653), and ADR (₹4,820) analytics.
   - **Guest Experience**: 4.4/5 CSAT rating, criterion breakdown, and feedback sentiment tags.
   - **AI Hotel Analyst**: Full-width conversational intelligence studio with prompt chips, natural language querying, and executive recommendations.
   - **Alerts & Recommendations**: Operational anomaly detection center with action triggers (OTA policy adjustments, promo packages, strategy replication).

2. **Official Poppys Hotels Branding**:
   - Signature golden lotus emblem favicon and high-resolution vector logos.
   - Customized sleek scrollbars across all panels and tables.
   - Zero horizontal overflow for 16:9 desktop monitors.
   - Unique neon lined charts with glowing cubic bezier animations.

---

## 📡 REST API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/kpis` | `GET` | Aggregated or branch-filtered (`?branch=Madurai`) 8 KPI metrics |
| `/api/branches` | `GET` | Full operational metrics for all 8 properties |
| `/api/alerts` | `GET` | Real-time high-priority operational alerts |
| `/api/alerts/:id/acknowledge` | `POST` | Acknowledge & silence active anomaly alerts |
| `/api/occupancy-trend` | `GET` | 7-day occupancy comparison (This Week vs Last Week) |
| `/api/bookings` | `GET` | Channel breakdown & daily pace |
| `/api/room-categories` | `GET` | Yield & occupancy by category |
| `/api/restaurant` | `GET` | Past week F&B daily orders & top 5 dish rankings |
| `/api/staff` | `GET` | Headcount breakdown across 6 departments |
| `/api/revenue-breakdown`| `GET` | Rooms, F&B, Events, and Other revenue streams |
| `/api/guest-experience` | `GET` | CSAT breakdown & sentiment tags |
| `/api/occupancy-forecast`| `GET` | 7-day predictive machine learning forecast |
| `/api/ai/query` | `POST` | Natural language conversational AI hospitality analysis |

---

## 📄 License
ISC © Poppys Hotels Group
