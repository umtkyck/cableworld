# CableWorld Backend

Backend services for the CableWorld platform.

## 🏗️ Architecture

```
backend/
├── api/                    # REST API endpoints
│   ├── auth/              # Authentication & authorization
│   ├── quotes/            # Quote generation
│   ├── orders/            # Order management
│   └── payments/          # Payment processing
│
├── services/              # Business logic services
│   ├── parser/           # AI diagram parsing
│   ├── pricing/          # Price calculation
│   ├── suppliers/        # Supplier integrations
│   └── notifications/    # Email & push notifications
│
├── database/              # Database schemas
│   ├── migrations/       # Database migrations
│   └── seeders/          # Seed data
│
└── tests/                 # Unit & integration tests
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

API runs on `http://localhost:8000`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Quotes
- `POST /api/quotes/upload` - Upload diagram
- `GET /api/quotes/:id` - Get quote details
- `POST /api/quotes/:id/accept` - Accept quote

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/:id/tracking` - Track order

### Payments
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

## 🔧 Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Redis
- AWS S3

## 📦 Coming Soon

Detailed backend implementation will be added in the next phase.
