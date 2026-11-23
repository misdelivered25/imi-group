import { describe, expect, it } from "vitest";
import { calculateInvoice, effectiveStatus, newInvoice, validateInvoice } from "../lib/invoice";

describe("invoice rules", () => {
  it("reproduces the supplied 15% discounted paid invoice", () => {
    const d = newInvoice(); d.items[0].rate = 5.88; d.discount = 15; d.amountPaid = 5;
    expect(calculateInvoice(d)).toEqual({ subtotal: 5.88, discount: .88, tax: 0, total: 5, balance: 0 });
  });
  it("updates quantities, fixed discount, tax and additional charges", () => {
    const d = newInvoice(); d.items[0].rate = 20; d.items[0].quantity = 3; d.discountType = "fixed"; d.discount = 10; d.tax = 15; d.charges = 5; d.amountPaid = 25;
    expect(calculateInvoice(d)).toEqual({ subtotal: 60, discount: 10, tax: 7.5, total: 62.5, balance: 37.5 });
  });
  it("requires full payment for Paid status", () => {
    const d = newInvoice(); d.customer.name = "Client"; d.items[0].description = "Design"; d.items[0].rate = 5; d.status = "Paid";
    expect(validateInvoice(d)).toBe("A paid invoice must be paid in full."); d.amountPaid = 5; expect(validateInvoice(d)).toBeUndefined();
  });
  it("marks unpaid past-due invoices overdue without changing paid or draft invoices", () => {
    expect(effectiveStatus({ status: "Unpaid", dueDate: "2026-11-04" }, "2026-11-05")).toBe("Overdue");
    expect(effectiveStatus({ status: "Paid", dueDate: "2026-11-04" }, "2026-11-05")).toBe("Paid");
    expect(effectiveStatus({ status: "Draft", dueDate: "2026-11-04" }, "2026-11-05")).toBe("Draft");
  });
  it("rejects percentage discounts above 100", () => { const d = newInvoice(); d.discount = 101; expect(validateInvoice(d)).toBe("Check discounts, tax and payment amounts."); });
});