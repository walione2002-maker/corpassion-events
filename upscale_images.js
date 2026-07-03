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
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

const allFiles = walk('.');

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // We want to target the background images (typically w >= 1900)
  // Example: ?w=2000&auto=format&fit=crop
  // Example: ?q=80&w=2070&auto=format&fit=crop
  // Replace with ?q=100&w=3840&auto=format&fit=crop (4K resolution)
  
  const regexes = [
    /w=2000/g,
    /w=2069/g,
    /w=2070/g,
    /w=1974/g,
    /q=80/g
  ];

  regexes.forEach(regex => {
    if (content.match(regex)) {
      changed = true;
    }
  });

  if (changed) {
    // Standardize to 4K resolution and 100% quality for backgrounds
    content = content.replace(/w=2000/g, 'w=3840&q=100');
    content = content.replace(/w=2069/g, 'w=3840&q=100');
    content = content.replace(/w=2070/g, 'w=3840&q=100');
    content = content.replace(/w=1974/g, 'w=3840&q=100');
    content = content.replace(/q=80&/g, ''); // Remove q=80 since we appended q=100
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
