const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
        walk(path.join(dir, file), fileList);
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

const allFiles = walk('.');
let anyCount = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(': any') || content.includes('<any>') || content.includes('any[]') || content.includes(' any ') || content.includes('(any)')) {
    console.log(`Found 'any' in ${file}`);
    anyCount++;
  }
}
console.log(`Total files with 'any': ${anyCount}`);
