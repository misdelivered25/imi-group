import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import invoiceLogo from "@/assets/invoice-logo.jpg.asset.json";
import { calculateInvoice, displayDate, effectiveStatus, money, type InvoiceDocument } from "./invoice";

type RGB = [number, number, number];
function token(name: string): RGB {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("PDF colours could not be loaded.");
  ctx.fillStyle = `hsl(${value})`; ctx.fillRect(0, 0, 1, 1);
  const pixel = ctx.getImageData(0, 0, 1, 1).data; return [pixel[0], pixel[1], pixel[2]];
}
export async function logoData(source: string): Promise<string> {
  if (source.startsWith("data:image/")) return source;
  const result = await fetch(source);
  if (!result.ok) throw new Error("The invoice logo could not be loaded. Please retry.");
  const blob = await result.blob();
  if (!blob.type.startsWith("image/")) throw new Error("The invoice logo is unavailable. Please retry.");
  return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(blob); });
}
export async function buildInvoicePDF(d: InvoiceDocument): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const blue = token("--invoice-blue"), orange = token("--invoice-orange"), ink = token("--invoice-ink"), grey = token("--invoice-grey"), green = token("--invoice-success"), paper = token("--invoice-paper"), border = token("--invoice-border");
  const totals = calculateInvoice(d), status = effectiveStatus(d);
  const m = 16, right = 194, width = right - m;
  const text = (value: string, x: number, y: number, size = 8, bold = false, color: RGB = ink, max = width) => {
    doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(size); doc.setTextColor(...color);
    const lines: string[] = doc.splitTextToSize(value || "—", max); doc.text(lines, x, y); return y + lines.length * size * .4;
  };
  const line = (y: number, color: RGB) => { doc.setDrawColor(...color); doc.setLineWidth(.5); doc.line(m, y, right, y); };
  doc.addImage(await logoData(d.business.logo || invoiceLogo.url), "JPEG", 16, 12, 39, 39);
  text(d.business.parent || "IMI GROUP", 64, 26, 9, true, ink, 130);
  text("Technology, Media & Business Solutions Group", 64, 30, 8, false, ink, 130);
  text(d.business.name.toUpperCase(), 64, 37, 9, true, orange, 130);
  text(d.business.tagline, 64, 41, 8, false, ink, 130);
  line(55, blue);
  text("INVOICE", 16, 69, 30, true);
  text(status === "Paid" ? "P A I D  I N  F U L L" : status.toUpperCase(), 16, 74, 8, true, blue);
  let fromY = 84, billY = 84, infoY = 84;
  fromY = text("FROM", 17, fromY, 8, true, ink, 64);
  fromY = text(d.business.name, 17, fromY, 11, true, ink, 64);
  if (d.business.parent) fromY = text(`A Division of ${d.business.parent}`, 17, fromY, 8, false, ink, 64);
  for (const value of [d.business.email, d.business.phone, d.business.website, d.business.address]) if (value) fromY = text(value, 17, fromY, 8, false, ink, 64);
  billY = text("BILL TO", 86, billY, 8, true, ink, 44);
  billY = text(d.customer.name, 86, billY, 11, true, ink, 44);
  for (const value of [d.customer.contact, d.customer.phone, d.customer.email, d.customer.address, d.customer.identification]) if (value) billY = text(value, 86, billY, 8, false, ink, 44);
  if (d.paidBy) { billY += 4; billY = text("PAID BY", 86, billY, 8, true, ink, 44); billY = text(d.paidBy, 86, billY, 8, false, ink, 44); }
  for (const [label, value] of [["INVOICE NO.", d.number], ["ISSUED", displayDate(d.issueDate)], [d.paymentDate ? "PAYMENT DATE" : "DUE DATE", displayDate(d.paymentDate || d.dueDate)]]) {
    infoY = text(label, 137, infoY, 8, true, ink, 57); infoY = text(value, 137, infoY, 8, label === "INVOICE NO.", label === "INVOICE NO." ? orange : ink, 57) + 4;
  }
  infoY = text(`STATUS: ${status.toUpperCase()}`, 137, infoY, 8, true, status === "Paid" ? green : blue, 57);
  const infoBottom = Math.max(119, fromY, billY, infoY);
  doc.setDrawColor(...border); doc.setLineWidth(.2); doc.line(83, 79, 83, infoBottom); doc.line(133, 79, 133, infoBottom);
  autoTable(doc, { startY: infoBottom + 6, margin: { left: m, right: m, bottom: 25 }, head: [["DESCRIPTION", "QTY", `RATE (${d.currency})`, `AMOUNT (${d.currency})`]],
    body: d.items.map(i => [`${i.description}${i.details ? `\n${i.details}` : ""}`, String(i.quantity), money(i.rate, d.currency), money(i.quantity * i.rate, d.currency)]),
    styles: { font: "helvetica", fontSize: 8, cellPadding: 3, textColor: ink, overflow: "linebreak" }, headStyles: { fillColor: blue, textColor: paper, fontStyle: "bold" }, alternateRowStyles: { fillColor: grey },
    columnStyles: { 0: { cellWidth: 88 }, 1: { cellWidth: 18 }, 2: { cellWidth: 34 }, 3: { cellWidth: 38 } },
    didParseCell: data => { if (data.section === "body" && data.column.index === 0) data.cell.styles.fontStyle = "bold"; },
  });
  let y = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? infoBottom + 20;
  const ensure = (height: number) => { if (y + height > 266) { doc.addPage(); y = 22; } };
  y += 8; ensure(48);
  const summary = (label: string, amount: number, bold = false) => { text(label, 116, y, 8, bold, ink, 50); doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(8); doc.text(money(amount, d.currency), right - 3, y, { align: "right" }); y += 8; };
  summary("Subtotal", totals.subtotal);
  if (d.discount) summary(`Discount${d.discountType === "percent" ? ` (${d.discount}%)` : ""}`, -totals.discount, true);
  if (d.tax) summary(`Tax (${d.tax}%)`, totals.tax);
  if (d.charges) summary("Additional charges", d.charges);
  doc.setFillColor(...blue); doc.rect(113, y - 4, 81, 10, "F"); text(status === "Paid" ? "TOTAL PAID" : "TOTAL DUE", 116, y + 3, 11, true, paper, 43);
  doc.setTextColor(...paper); doc.setFontSize(14); doc.text(money(totals.total, d.currency), right - 3, y + 3, { align: "right" }); y += 16;
  if (d.amountPaid > 0 && status !== "Paid") { summary("Amount received", d.amountPaid); summary("Outstanding balance", totals.balance, true); }
  ensure(40); text("PAYMENT CONFIRMATION", m, y, 10, true, blue); y += 3;
  const boxY = y, leftLines = doc.splitTextToSize(`PAYMENT METHOD\n${d.paymentMethod}\nAmount received: ${d.currency} ${d.amountPaid.toFixed(2)}`, 77), rightLines = doc.splitTextToSize(`PAID BY\n${d.paidBy || d.customer.name || "—"}\n\nAPPROVAL / TRANSACTION CODE\n${d.transaction || "—"}${d.reference ? `\nReference: ${d.reference}` : ""}`, 81);
  const boxHeight = Math.max(26, Math.max(leftLines.length, rightLines.length) * 3.4 + 9);
  ensure(boxHeight + 5); const paymentY = y;
  doc.setFillColor(...grey); doc.setDrawColor(...border); doc.rect(m, paymentY, width, boxHeight, "FD"); doc.setDrawColor(...orange); doc.rect(m, paymentY, 86, boxHeight, "S");
  text(leftLines.join("\n"), m + 4, paymentY + 8, 8, false, ink, 77); text(rightLines.join("\n"), 106, paymentY + 6, 8, false, ink, 81); y = paymentY + boxHeight + 8;
  for (const [label, value] of [["NOTES", d.notes], ["PAYMENT INSTRUCTIONS", d.instructions], ["TERMS & CONDITIONS", d.terms]]) if (value) {
    const lines: string[] = doc.splitTextToSize(value, width); ensure(12); text(label, m, y, 10, true, blue); y += 5;
    for (const l of lines) { ensure(5); text(l, m, y, 8); y += 3.5; } y += 5;
  }
  ensure(16); line(y, orange); text("IMI GROUP | IMI TECHNOLOGIES • IMI MEDIA • IMI DESIGN", m, y + 6, 8, true, blue); text("INQUIRE. MOTIVATE. INSPIRE.", m, y + 10, 8, true);
  const pages = doc.getNumberOfPages(); if (pages > 1) for (let i = 1; i <= pages; i++) { doc.setPage(i); text(`${d.number} | ${i} / ${pages}`, m, 285, 7); }
  doc.setProperties({ title: `Invoice ${d.number} — ${d.business.name}`, subject: "IMI Group Invoice", author: d.business.parent || d.business.name });
  return doc;
}
export async function downloadInvoicePDF(d: InvoiceDocument) { const pdf = await buildInvoicePDF(d); pdf.save(`${d.number.replace(/[^A-Za-z0-9-]/g, "_")}.pdf`); }
export async function printInvoicePDF(d: InvoiceDocument) { const pdf = await buildInvoicePDF(d); pdf.autoPrint(); const url = URL.createObjectURL(pdf.output("blob")); window.open(url, "_blank", "noopener,noreferrer"); setTimeout(() => URL.revokeObjectURL(url), 60000); }