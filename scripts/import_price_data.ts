import 'dotenv/config';
import { createReadStream, readdirSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { supabaseAdmin } from '../src/integrations/supabase/client.server.ts';
const supabase = supabaseAdmin;

// Prepare public images folder and copy source images
const srcImageDir = path.resolve('src/db');
const publicImageDir = path.resolve('public/images');
if (!existsSync(publicImageDir)) {
  mkdirSync(publicImageDir, { recursive: true });
}
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const allFiles = readdirSync(srcImageDir);
const imageFiles = allFiles.filter(f => imageExtensions.includes(path.extname(f).toLowerCase()));
// Copy images to public folder (skip if already exists)
imageFiles.forEach(file => {
  const srcPath = path.join(srcImageDir, file);
  const destPath = path.join(publicImageDir, file);
  if (!existsSync(destPath)) {
    copyFileSync(srcPath, destPath);
  }
});

async function importPriceList() {
  const results: any[] = [];
  return new Promise<void>((resolve, reject) => {
    createReadStream('src/db/price-list.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (let i = 0; i < results.length; i++) {
          const row = results[i];
          const name = row.name?.trim();
          const diameter = Number(row.diameter_mm) || null;
          const length = Number(row.length_m) || null;
          const wall = Number(row.wall_thickness_mm) || null;
          const price = Number(row.price) || null;
          const install = Number(row.install_price) || null;
          const category = row.category?.trim() || null;
          // Assign a local image if available, otherwise fallback to Unsplash
          const localImage = imageFiles[i % imageFiles.length];
          const image_url = localImage ? `/images/${localImage}` : `https://source.unsplash.com/featured/400x300?${encodeURIComponent(name)}`;
          const { error } = await supabase
            .from('products')
            .upsert({
              name,
              diameter_mm: diameter,
              length_m: length,
              wall_thickness_mm: wall,
              price,
              install_price: install,
              category,
              image_url,
            });
          if (error) console.error('Upsert error:', error);
        }
        console.log('Imported', results.length, 'rows');
        resolve();
      })
      .on('error', reject);
  });
}

importPriceList()
  .then(() => console.log('Import completed'))
  .catch(console.error);
