import { createFileRoute } from "@tanstack/react-router";
import * as nodemailer from "nodemailer";

export const Route = createFileRoute("/api/send-order")({
  // Handles order submission via POST request and sends email
  async loader({ request }: any) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse incoming JSON payload
    const payload = await request.json();
    const { name, phone, email, cart } = payload as {
      name: string;
      phone: string;
      email: string;
      cart: Array<{ title: string; price: number; qty: number }>;
    };

    // Build HTML email content
    const itemsHtml = (cart || [])
      .map(
        (i) => `
        <tr>
          <td style="padding:4px 8px; border-bottom:1px solid #eee;">${i.title}</td>
          <td style="padding:4px 8px; text-align:center; border-bottom:1px solid #eee;">${i.qty}</td>
          <td style="padding:4px 8px; text-align:right; border-bottom:1px solid #eee;">${i.price.toLocaleString()} ₽</td>
          <td style="padding:4px 8px; text-align:right; border-bottom:1px solid #eee;">${(i.price * i.qty).toLocaleString()} ₽</td>
        </tr>`
      )
      .join("");

    const total = (cart || []).reduce((s, i) => s + i.price * i.qty, 0);

    const html = `
      <h2>Новый заказ с сайта</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <table style="width:100%; border-collapse:collapse; margin-top:16px;">
        <thead>
          <tr>
            <th style="padding:4px 8px; border-bottom:2px solid #000; text-align:left;">Товар</th>
            <th style="padding:4px 8px; border-bottom:2px solid #000; text-align:center;">Кол-во</th>
            <th style="padding:4px 8px; border-bottom:2px solid #000; text-align:right;">Цена</th>
            <th style="padding:4px 8px; border-bottom:2px solid #000; text-align:right;">Сумма</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr>
            <td colspan="3" style="padding:4px 8px; text-align:right; font-weight:bold;">Итого:</td>
            <td style="padding:4px 8px; text-align:right; font-weight:bold;">${total.toLocaleString()} ₽</td>
          </tr>
        </tbody>
      </table>`;

    // Configure nodemailer transport – uses environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: "Новый заказ с сайта",
      html,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
});
