# VINCE Maison

Premium furniture commerce platform rebuilt with a modern full-stack architecture.

## Stack
- Next.js App Router + React 19
- TypeScript
- Tailwind CSS
- Supabase: Postgres database, Auth and Storage
- Gemini API: AI furniture concierge
- Next.js Route Handlers for backend APIs
- Vercel-ready deployment

## Architecture
The frontend is no longer limited to static HTML/CSS/JS. Next.js handles the application, server-rendered pages and backend route handlers. Supabase is the persistent source of truth for products, inventory, customers, orders and reviews. Gemini is an intelligence layer, not the database.

## Supabase tables to create
`products`, `categories`, `profiles`, `orders`, `order_items`, `wishlists`, `reviews`, `room_ideas`.

Recommended `products` fields: `id`, `name`, `slug`, `description`, `price`, `category_id`, `images`, `stock`, `featured`, `created_at`.

## Environment
Copy `.env.example` to `.env.local` and add Supabase credentials plus `GEMINI_API_KEY`. Never commit real secrets.

## Run locally
`npm install`
`npm run dev`

## Deployment
Import the repository into Vercel, add the environment variables, and deploy. The current static HTML files can remain during migration, but the Next.js `app/` tree is the new application entry point.
