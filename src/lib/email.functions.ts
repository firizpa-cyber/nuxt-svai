import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const cartItemSchema = z.object({
  product_id: z.string(),
  name: z.string(),
  price: z.number(),
  qty: z.number(),
});

const customerSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
});

const sendOrderSchema = z.object({
  cart: z.array(cartItemSchema),
  customer: customerSchema,
});

export const sendOrderEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => sendOrderSchema.parse(d))
  .handler(async ({ data }) => {
    // Dynamically import nodemailer to prevent it from being bundled on the client
    const nodemailer = await import("nodemailer");

    const { cart, customer } = data;

    // Build HTML email body
    const rows = cart
      .map(
        (i: any) => `
          <tr>
            <td style="padding:4px 8px; border-bottom:1px solid #eee;">${i.name}</td>
            <td style="padding:4px 8px; text-align:center; border-bottom:1px solid #eee;">${i.qty}</td>
            <td style="padding:4px 8px; text-align:right; border-bottom:1px solid #eee;">${i.price.toLocaleString()} ₽</td>
            <td style="padding:4px 8px; text-align:right; border-bottom:1px solid #eee;">${(i.price * i.qty).toLocaleString()} ₽</td>
          </tr>`
      )
      .join("");

    const total = cart.reduce((s: number, i: any) => s + i.price * i.qty, 0);

    const html = `
      <h2>Новый заказ с сайта</h2>
      <p><strong>Имя:</strong> ${customer.name}</p>
      <p><strong>Телефон:</strong> ${customer.phone}</p>
      <p><strong>E‑mail:</strong> ${customer.email}</p>
      <h3>Товары</h3>
      <table style="width:100%; border-collapse:collapse; margin-top:12px;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:6px 8px; text-align:left;">Товар</th>
            <th style="padding:6px 8px; text-align:center;">Кол‑во</th>
            <th style="padding:6px 8px; text-align:right;">Цена</th>
            <th style="padding:6px 8px; text-align:right;">Сумма</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr style="font-weight:bold;">
            <td colspan="3" style="padding:6px 8px; text-align:right; border-top:2px solid #333;">Итого:</td>
            <td style="padding:6px 8px; text-align:right; border-top:2px solid #333;">${total.toLocaleString()} ₽</td>
          </tr>
        </tbody>
      </table>`;

    // Create transporter using env variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIPIENT_EMAIL,
        subject: "Новый заказ",
        html,
      });
      return { success: true };
    } catch (err: any) {
      console.error("Email send error", err);
      throw new Error(err?.message || "Failed to send email");
    }
  });
