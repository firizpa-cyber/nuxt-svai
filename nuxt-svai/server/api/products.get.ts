import { readFileSync } from 'fs'
import { join } from 'path'
import { parseProductsCSV } from '~/utils/products'

export default defineEventHandler(() => {
  try {
    const csvPath = join(process.cwd(), 'server', 'data', 'price-list.csv')
    const csvContent = readFileSync(csvPath, 'utf-8')
    const products = parseProductsCSV(csvContent)
    return { products }
  } catch (error) {
    console.error('Error reading CSV:', error)
    return { products: [] }
  }
})
