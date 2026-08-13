# Muneem Ji — Update 2 / Phase 1

## Included
- Product delete (archived from active inventory so old sales remain valid)
- Sale delete with transaction-safe stock restoration
- Per-item profit shown in sale details and recent sales
- Total profit on dashboard and reports
- Dashboard date is dynamic
- Active products reload correctly from Supabase
- Delete actions require confirmation
- Sales history includes delete controls
- Existing Auth, Products, Sales, Reports and PWA flow preserved

## REQUIRED: Run the database migration first
Open Supabase **SQL Editor** and run:

`supabase/update2_phase1.sql`

Do **not** disable RLS.

The migration adds `is_active`, product-archive/delete logic, and transaction-safe sale deletion.

## Local setup
Create `.env.local` from `.env.example` and add your existing Supabase URL and publishable key.

```bash
npm install
npm run dev
```

## Test checklist
1. Add product → edit/restock → refresh.
2. Delete an unused product → it disappears from Products.
3. Create a sale → stock decreases.
4. Delete that sale from Sales or Reports → stock returns to the previous quantity.
5. Check per-item profit and total profit.
6. Logout → login → confirm products, sales, stock and reports remain correct.
7. Confirm an old sold product can be removed from active inventory without breaking its historical sale record.
