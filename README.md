# LaundroFlow - Mini Laundry Order Management System

A production-like laundry management system built with Node.js (Express) and React (Vite).

## 🚀 Features

- **Dashboard:** Real-time stats for total orders, revenue, and status counts.
- **Order Management:** Create orders with multiple garment types and quantities.
- **Tracking:** View current orders with search and status filtering.
- **Dynamic Pricing:** Automatic calculation based on garment types:
  - Shirt: $10
  - Pants: $15
  - Saree: $20
- **Status Workflow:** Validated status transitions:
  - `RECEIVED` → `PROCESSING` → `READY` → `DELIVERED`
- **Smart Fields:** Estimated delivery date (auto-calculated as 3 days from order).
- **Responsive UI:** Clean, professional dashboard using Tailwind CSS and Lucide icons.

## 📁 Project Structure

```
backend/
  routes/       # API route definitions
  controllers/  # Request/response handlers
  services/     # Core business logic (price calc, etc.)
  data/         # In-memory data storage
  constants/    # Prices and status definitions
frontend/ (src/)
  components/   # Reusable UI components
  services/     # API interaction (Axios)
  App.tsx       # Main application entry
```

## 🛠️ Setup

1. The app is pre-configured to run both the backend and frontend simultaneously.
2. Run `npm run dev` to start the development server.
3. Access the application at `http://localhost:3000`.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/orders` | Get all orders (supports `status` and `search` filters) |
| POST   | `/api/orders` | Create a new order |
| PATCH  | `/api/orders/:id/status` | Update order status |
| GET    | `/api/dashboard` | Get summary statistics |

## 💡 Tech Stack

- **Backend:** Express, Node.js, TSX
- **Frontend:** React 19, Vite, Tailwind CSS, Axios, Lucide Icons, Framer Motion
