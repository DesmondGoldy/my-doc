import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, '../public/docs');
const outputFile = path.join(__dirname, '../public/catalog.json');

if (!fs.existsSync(docsDir)) {
  console.error('Docs directory not found:', docsDir);
  process.exit(1);
}

const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));

const catalog = files.map(file => {
  const content = fs.readFileSync(path.join(docsDir, file), 'utf-8');
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
  
  return {
    id: file,
    title,
    path: `/docs/${file}`,
    content
  };
});

fs.writeFileSync(outputFile, JSON.stringify(catalog, null, 2));
console.log('Catalog generated at public/catalog.json');
