import fs from 'fs';
import path from 'path';

const blogDir = path.resolve('src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
let fixed = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('primaryKeyword:')) {
    const match = content.match(/title:\s*["'](.*?)["']/);
    const kw = match ? match[1].slice(0, 50).replace(/"/g, '') : file.replace('.md', '');
    content = content.replace(/(author:\s*["'].*?["'])/, `$1\nprimaryKeyword: "${kw}"`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed primaryKeyword in:', file);
    fixed++;
  }
}

console.log(`✅ Audit complete. Fixed ${fixed} files.`);
