# Muneem Ji — Supabase Setup

## 1. Create the project
Create a Supabase project.

## 2. Run the database schema
Open **SQL Editor** in Supabase and run:

`supabase/schema.sql`

This creates shops, products, sales, sale_items, RLS policies, signup shop creation, and transaction-safe restock/sale functions.

## 3. Add frontend environment variables
Copy `.env.example` to `.env.local`:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Use the browser-safe publishable/anon key only. **Never use a service_role/secret key in this React app.**

## 4. Install and run

```bash
npm install
npm run dev
```

## Important
This package is the **Supabase foundation**, not the final connected build yet. The existing demo UI remains available while the project credentials are configured.

After you create the Supabase project and run the SQL, the next implementation step is to connect:
- real signup/login
- shop setup
- products CRUD
- restock RPC
- complete-sale RPC
- reports from persistent sales
- logout/session restore


## Auth confirmation
If email confirmation is enabled in Supabase Auth, signup may show a confirmation message instead of logging in immediately. Confirm the email, then use Login.

The current Phase 4.1 UI uses **email + password** for authentication. Phone/SMS login can be added later once the shop's preferred login method is finalized.
