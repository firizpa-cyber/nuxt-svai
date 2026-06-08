export interface Product {
  id: string
  name: string
  slug: string
  diameter_mm: number
  length_m: number
  wall_thickness_mm: number
  price: number
  install_price: number
  category: string
  in_stock: boolean
  image_url: string
  description: string
}

export function parseProductsCSV(csvContent: string): Product[] {
  const lines = csvContent.split('\n').filter((l) => l.trim())
  return lines
    .slice(1)
    .map((line, idx) => {
      const values = line.split(',')
      const name = values[0] || ''
      const slug =
        name
          .toLowerCase()
          .replace(/[^a-zа-яё0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/[а-яё]/g, (c) => {
            const map: Record<string, string> = {
              а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
              з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
              п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts',
              ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
            }
            return map[c] || c
          }) || `product-${idx}`

      return {
        id: `product-${idx}-${name.replace(/\s/g, '')}`,
        name,
        slug,
        diameter_mm: Number(values[1]) || 0,
        length_m: Number(values[2]) || 0,
        wall_thickness_mm: Number(values[3]) || 0,
        price: Number(values[4]) || 0,
        install_price: Number(values[5]) || 0,
        category: values[6]?.trim() || 'Стандарт',
        in_stock: true,
        image_url: '',
        description: '',
      }
    })
    .filter((p) => p.name)
}
