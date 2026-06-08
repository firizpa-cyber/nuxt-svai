import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const path = join(process.cwd(), 'server', 'data', 'orders.json')
  if (!existsSync(path)) return { orders: [] }
  try {
    const orders = JSON.parse(readFileSync(path, 'utf-8'))
    return { orders: orders.sort((a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )}
  } catch {
    return { orders: [] }
  }
})
