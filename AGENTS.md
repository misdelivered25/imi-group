# Architecture rules

- Keep package rates, individual design prices, and Pricing image mappings in the shared site data module so pricing and booking entry points stay consistent.- AI project advisor on Pricing page: recommendations come from a backend function that only offers services and prices from the shared site data catalog.
- Invoice records and address books are owner-scoped in Cloud; a database trigger allocates sequential numbers and recalculates totals to prevent tampering.
- Use a shared invoice document model and jsPDF text/table rendering for A4 exports; never rasterize invoice pages.
- User administration uses a JWT-validated, role-checked Cloud function and existing user_roles; deactivation is enforced by account access and auth bans.
