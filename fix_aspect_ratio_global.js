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

  const regexes = [
    /w=3840&q=100(?!&h=2160)/g, // Find ones that don't have height yet
    /w=3840&q=100&fit=crop/g
  ];

  if (content.match(/w=3840&q=100(?!&h=)/) || content.match(/w=3840&q=100&fit=crop/)) {
    content = content.replace(/w=3840&q=100&fit=crop/g, 'w=3840&h=2160&q=100&fit=crop');
    content = content.replace(/w=3840&q=100(?!&h=)/g, 'w=3840&h=2160&q=100&fit=crop');
    // Clean duplicates if they happen
    content = content.replace(/&fit=crop&fit=crop/g, '&fit=crop');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated aspect ratio in ${file}`);
  }
}
