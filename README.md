# MetricsPulse: Enterprise SaaS Analytics Dashboard & Stripe Billing Engine

MetricsPulse is a production-grade full-stack SaaS analytics and financial telemetry dashboard built with Next.js 14 App Router, TypeScript, Prisma ORM, Stripe API, Chart.js, and Tailwind CSS.

## Features
- **Executive Revenue Telemetry:** Real-time MRR, active subscription counters, churn metrics, and API volume processing.
- **Chart.js Financial Visualization:** Interactive revenue trajectory and usage trend visualization.
- **Stripe Billing Portal Integration:** Complete checkout session creation and webhooks reconciliation (`checkout.session.completed`, `customer.subscription.updated`).
- **Relational Data Modeling:** SQLite/PostgreSQL schema via Prisma ORM covering Users, Subscriptions, and MetricEvents.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Generate Prisma ORM client:
   ```bash
   npm run prisma:generate
   ```
3. Initialize local SQLite database:
   ```bash
   npm run prisma:db:push
   ```
4. (Optional) Set up environment variables in `.env.local`:
   ```env
   DATABASE_URL="file:./dev.db"
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```
5. Run the Next.js development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view your executive analytics portal!
