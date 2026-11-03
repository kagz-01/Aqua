# Aqua staff roles and business flow

This guide explains who does each job, from receiving fish to handing an order
to a customer. The person who records a payment is not the only person who
checks it.

## Roles

### Owner

- Oversees the business, staff access, reports, and payment checks.
- Can review and manage customer orders, including exceptional status changes
  and pickup completion.
- Can open all staff pages.

### House manager

- Keeps fisher, boat, and fisher-group details.
- Records fish deliveries, including different kinds of fish, their weight,
  cost, and temperature. Each delivery gets a batch number.
- Checks fish stock, low-stock warnings, batch records, and temperatures entered
  by staff.
- Confirms customer orders, prepares them, and marks them ready for pickup.
- Can cancel an uncompleted customer order; the reserved quantities are
  returned to stock and their original batches.
- Does not record payments to fishers or check customer payments.

### Floor attendant

- Records shop-counter sales, serves customers who visit, and checks delivery
  history by batch number.
- Handles customer orders that are ready for pickup.
- At pickup, records whether the customer paid by cash or M-Pesa and completes
  the handover. Aqua creates the sale, receipt, payment record, and fish-sale
  details linked to the batch.
- Does not record fish deliveries, money owed to fishers, or payment checks.

### Accounts officer

- Checks receipts and recorded cash/M-Pesa payments.
- Checks delivery costs and records money paid to fishers.
- Reviews the money reports available to the role.
- Does not receive fish, change stock, or prepare customer orders.

### Customer

- Shops available fish at `/client`, manages a basket, places a pickup
  request, and tracks their own order and receipt.
- When sign-in is on, customers can only see orders placed with their account.

## End-to-end fish-to-sale workflow

1. **Fish delivery:** the house manager records who brought the fish, where it
   came from, the fish type, weight, cost, and temperature. Aqua adds the fish
   to stock and gives the delivery a batch number. Money owed to a fisher is
   based on delivery costs and recorded payments.
2. **Shopping:** the customer places an order from available stock. The
   system reserves the requested amount so another order or counter sale cannot
   use the same fish.
3. **Preparation:** the house manager advances the order through confirmation,
   preparation, and ready for pickup. If cancelled before completion, the fish
   is returned to stock and its original batch.
4. **Pickup and sale:** the floor attendant verifies the ready order, records
   cash or M-Pesa, and completes pickup. Aqua creates the receipt and payment
   record and links the sale to the fish batch. It does not reduce stock twice.
5. **Payment checks:** Accounts checks recorded payments. The owner can also
   review them. Money paid to fishers is recorded separately from customer
   payments.
6. **Reports and fish history:** reports use sales, payment, stock, fisher, and
   batch records. A batch stays linked from delivery through sale.

## Access boundaries and integration status

- When sign-in is enabled, staff roles are checked for each protected action,
  not just hidden from the menu. The preview has sign-in turned off and is for
  testing; it is not production access control.
- M-Pesa payment checking is a demo action. Aqua is not connected to Safaricom
  to confirm real payments.
- Aqua can record alerts, but sending SMS or WhatsApp messages is not connected.
- Supplier/customer edit and archive flows, fish catalog maintenance and stock
  corrections, and the remaining reports are listed as partial in
  [the requirements coverage map](./docs/requirements-coverage.md).
