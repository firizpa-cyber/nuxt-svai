import { z } from 'zod'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const itemSchema = z.object({
  product_id: z.string().optional(),
  name: z.string().min(1).max(200),
  qty: z.number().int().min(1).max(10000),
  price: z.number().min(0).max(10_000_000),
})

const createOrderSchema = z.object({
  contact_name: z.string().trim().min(2).max(120),
  contact_phone: z.string().trim().min(5).max(30),
  contact_email: z.string().trim().email().max(200).optional().or(z.literal('')),
  address: z.string().trim().max(500).optional(),
  comment: z.string().trim().max(2000).optional(),
  items: z.array(itemSchema).min(1).max(100),
})

function getOrdersFilePath() {
  return join(process.cwd(), 'server', 'data', 'orders.json')
}

function loadOrders() {
  const path = getOrdersFilePath()
  if (!existsSync(path)) return []
  try {
    return JSON.parse(readFileSync(path, 'utf-8'))
  } catch {
    return []
  }
}

function saveOrders(orders: unknown[]) {
  writeFileSync(getOrdersFilePath(), JSON.stringify(orders, null, 2))
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parsed = createOrderSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.message })
  }

  const data = parsed.data
  const total = data.items.reduce((sum, i) => sum + i.qty * i.price, 0)

  const orders = loadOrders()
  const orderNumber = orders.length + 1

  const order = {
    id: crypto.randomUUID(),
    order_number: orderNumber,
    contact_name: data.contact_name,
    contact_phone: data.contact_phone,
    contact_email: data.contact_email || null,
    address: data.address || null,
    comment: data.comment || null,
    items: data.items,
    total,
    status: 'new',
    status_note: null,
    created_at: new Date().toISOString(),
  }

  orders.push(order)
  saveOrders(orders)

  console.log(`[ORDER] New order #${orderNumber}`, { total, contact: data.contact_phone })

  // Send email notification
  try {
    const config = useRuntimeConfig()
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: Number(config.smtpPort),
      secure: true,
      auth: { user: config.smtpUser, pass: config.smtpPass },
    })

    const rows = data.items
      .map(
        (i) =>
          `<tr>
            <td style="padding:4px 8px;border-bottom:1px solid #eee">${i.name}</td>
            <td style="padding:4px 8px;text-align:center;border-bottom:1px solid #eee">${i.qty}</td>
            <td style="padding:4px 8px;text-align:right;border-bottom:1px solid #eee">${i.price.toLocaleString('ru-RU')} ₽</td>
            <td style="padding:4px 8px;text-align:right;border-bottom:1px solid #eee">${(i.price * i.qty).toLocaleString('ru-RU')} ₽</td>
          </tr>`,
      )
      .join('')

    await transporter.sendMail({
      from: config.senderEmail,
      to: config.recipientEmail,
      subject: `Новый заказ №${orderNumber} с сайта`,
      html: `
        <h2>Новый заказ №${orderNumber} с сайта</h2>
        <p><strong>Имя:</strong> ${data.contact_name}</p>
        <p><strong>Телефон:</strong> ${data.contact_phone}</p>
        ${data.contact_email ? `<p><strong>Email:</strong> ${data.contact_email}</p>` : ''}
        ${data.address ? `<p><strong>Адрес:</strong> ${data.address}</p>` : ''}
        ${data.comment ? `<p><strong>Комментарий:</strong> ${data.comment}</p>` : ''}
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <thead><tr style="background:#7c1a1a;color:#fff">
            <th style="padding:8px;text-align:left">Товар</th>
            <th style="padding:8px;text-align:center">Кол-во</th>
            <th style="padding:8px;text-align:right">Цена</th>
            <th style="padding:8px;text-align:right">Сумма</th>
          </tr></thead>
          <tbody>${rows}<tr style="font-weight:bold">
            <td colspan="3" style="padding:8px;text-align:right;border-top:2px solid #333">Итого:</td>
            <td style="padding:8px;text-align:right;border-top:2px solid #333">${total.toLocaleString('ru-RU')} ₽</td>
          </tr></tbody>
        </table>`,
    })
  } catch (e) {
    console.error('Email send error:', e)
    // Don't fail the order if email fails
  }

  return { order }
})
