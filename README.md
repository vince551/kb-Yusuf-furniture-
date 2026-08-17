# 🛋️ VINCE Maison

**A premium furniture commerce platform combining editorial product discovery, inventory-aware commerce and an AI furniture concierge.**

![Next.js](https://img.shields.io/badge/NEXT.JS-APP%20ROUTER-111827?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/REACT-19-61dafb?style=for-the-badge&logo=react&logoColor=111827)
![Supabase](https://img.shields.io/badge/SUPABASE-POSTGRES%20%2B%20AUTH-3ecf8e?style=for-the-badge&logo=supabase&logoColor=111827)
![Status](https://img.shields.io/badge/STATUS-ACTIVE-00ff88?style=for-the-badge&labelColor=0b1020)

## 🎯 Product vision

VINCE Maison is a commerce-focused build designed to demonstrate how a traditional furniture catalogue can become a modern digital product.

The application combines:

- 🛋️ Product discovery and categories
- 📦 Inventory-aware product data
- 🛒 Commerce/order foundations
- ❤️ Wishlists and reviews
- 👤 Customer profiles
- 🏠 Room inspiration / ideas
- 🤖 AI-assisted furniture discovery
- 🔐 Supabase Auth and database persistence
- ⚡ Next.js server-side and API capabilities

## 🏗️ Architecture

```text
                    Next.js App Router
                           │
            ┌──────────────┼──────────────┐
            │              │              │
        UI / pages    Route Handlers   AI Concierge
            │              │              │
            └──────────────┼──────────────┘
                           │
                        Supabase
                 ┌─────────┼─────────┐
                 ↓         ↓         ↓
             Postgres    Auth     Storage
```

Supabase is the source of truth for product, inventory, customer and order data. The Gemini integration should remain an intelligence layer rather than becoming a source of truth for business records.

## 🧰 Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase: PostgreSQL, Auth and Storage
- Gemini API for AI-assisted discovery
- Next.js Route Handlers
- Vercel-ready deployment

## 🗄️ Data model

Core tables planned for the commerce layer:

`products` · `categories` · `profiles` · `orders` · `order_items` · `wishlists` · `reviews` · `room_ideas`

Recommended `products` fields include:

`id`, `name`, `slug`, `description`, `price`, `category_id`, `images`, `stock`, `featured`, `created_at`

## 🔐 Environment & security

Copy `.env.example` to `.env.local` and configure the required Supabase and Gemini values.

Never commit:

- Real API keys
- Supabase service-role credentials
- Production database credentials
- Customer/order exports

For production, enforce Supabase RLS on user-owned data and validate all order/inventory operations server-side.

## 🚀 Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run start
```

## ☁️ Deployment

The project is structured for Vercel deployment. Configure all environment variables in the deployment platform before publishing.

The repository may contain legacy static HTML from the migration phase, but the **Next.js `app/` tree is the current application direction**.

## 🗺️ Roadmap

- [ ] Complete product CRUD
- [ ] Connect inventory to product availability
- [ ] Complete cart and checkout flow
- [ ] Order lifecycle and customer order history
- [ ] Secure admin dashboard
- [ ] RLS policy tests
- [ ] AI recommendations grounded in real product data
- [ ] Analytics and conversion insights
- [ ] Automated CI checks

## 👨‍💻 Builder

**Vince Odhiambo** — full-stack developer and technology builder.
