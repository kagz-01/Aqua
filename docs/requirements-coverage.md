# Lakeside Fish Management System: requirement coverage

This map compares the proposal documents in `attachments/` with the current
workspace. The proposal describes required outcomes, not proof that every
outside service or edit option is ready. Status is deliberately conservative.

## Staff responsibilities

| Role             | Main responsibilities                                                                           | App pages                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Owner            | Oversee staff, sales, payments, customer orders, and reports                                    | `/staff/owner`, `/app/team`, `/app/`                                                                        |
| House manager    | Keep fisher details, receive fish, check stock and temperatures, prepare customer orders        | `/staff/housemanager`, `/app/suppliers`, `/app/inventory`, `/app/batches`, `/app/cold-chain`, `/app/orders` |
| Floor attendant  | Record counter sales, give receipts, hand over online orders, and look up fish delivery records | `/staff/attendant`, `/app/sales`, `/app/orders`, `/app/customers`, `/app/batches`                           |
| Accounts officer | Check cash and M-Pesa records, record payments to fishers, and review money reports             | `/staff/accounts`, `/app/payments`, `/app/suppliers`, `/app/reports`                                        |
| Customer         | Browse fish, fill a basket, place a pickup order, and follow its progress                       | `/client`                                                                                                   |

The house manager adds fishers and records fish deliveries. The accounts
officer checks delivery costs and records payments to fishers. The owner can
review the business.

## Proposal function coverage

| Proposal function                                                      | Current workspace implementation                                                                                     | Status / remaining gap                                                                                                     |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| User login and role management                                         | Authentication routes and owner-managed staff roles at `/app/team`                                                   | Partial: password-change workflow and role audit history are not present                                                   |
| Add, edit, delete, and search fishermen/suppliers                      | Add supplier and view supplier/delivery records at `/app/suppliers`; manager role owns supplier intake               | Partial: editing, deletion/archiving, and supplier search are not implemented                                              |
| Add fish, update/delete stock, search inventory, and trace deliveries  | Delivery intake updates stock and creates traceable batches; inventory is visible at `/app/inventory`                | Partial: fish catalog CRUD, stock correction/adjustment, and inventory search are not implemented                          |
| Register, update, and search customers                                 | Customer accounts, staff customer list, and customer storefront at `/client`                                         | Partial: staff-side customer editing and search are not implemented                                                        |
| Record sales, totals, payments, receipts, and inventory changes        | `/app/sales` records counter sales; online pickup converts its reserved batches to a traced sale at `/app/orders`    | Partial: M-Pesa confirmation is simulated; a verified provider callback and production payment integration are not present |
| SMS/WhatsApp notifications and daily owner summary                     | Notification records and staff messaging surface at `/app/alerts`                                                    | Partial: live provider delivery, retry queue, and scheduled daily summary are not implemented                              |
| Fish delivery records                                                  | Staff can review fish delivery records; the public fish-record page shows where fish came from and sales history     | Implemented for the current delivery workflow; QR codes open the record, while printing depends on the device              |
| Daily, weekly, monthly, stock, customer, supplier, and payment reports | `/app/reports` provides current sales/stock summaries and sales export; `/app/payments` reconciles incoming payments | Partial: monthly and dedicated customer/supplier reports are not present                                                   |

## Role assignment

The owner gives staff access from **Staff access**. The allowed roles are
house manager, floor attendant, and accounts officer; customers remain
customers unless the owner gives them a staff role. When sign-in is enabled,
the app checks each staff member's role before allowing staff actions. Sign-in
is off in the local preview, so it is for testing and does not protect a live
business.

## Customer order to pickup flow

1. A customer signs in at `/client`, chooses available fish, and places a pickup
   order. Aqua checks the stock and holds the requested amount so it cannot be
   sold to someone else at the same time.
2. The house manager confirms the request, prepares it, and marks it ready.
   Cancelling an active order returns the held fish to stock and its delivery
   record.
3. The floor attendant sees ready pickups, records cash or M-Pesa at handoff,
   and completes the order. Aqua creates a sale, receipt, and payment record
   linked to the fish delivery. It does not reduce the held stock a second time.
4. The customer can follow order progress and see the receipt and payment
   details at `/client`. Accounts checks payments at `/app/payments`.

M-Pesa is not connected to a live provider: the current reconciliation action
records a clearly labelled demo confirmation and generated reference. Supplier
settlements, live notification delivery, and the other gaps above remain
separate work.
