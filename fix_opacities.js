const fs = require('fs');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('.');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Target specifically the background image div opacities
  const targetRegex = /opacity-\[0\.0[2-5]\] dark:opacity-\[0\.0[4-8]\]/g;
  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, 'opacity-[0.20] dark:opacity-[0.35]');
    changed = true;
  }
  
  const targetRegex2 = /opacity-\[0\.03\] dark:opacity-\[0\.08\]/g;
  if (targetRegex2.test(content)) {
    content = content.replace(targetRegex2, 'opacity-[0.20] dark:opacity-[0.35]');
    changed = true;
  }
  
  const targetRegex3 = /opacity-\[0\.04\]/g;
  if (targetRegex3.test(content)) {
    content = content.replace(targetRegex3, 'opacity-[0.20]');
    changed = true;
  }

  const targetRegex4 = /opacity-\[0\.05\] dark:opacity-\[0\.08\]/g;
  if (targetRegex4.test(content)) {
    content = content.replace(targetRegex4, 'opacity-[0.20] dark:opacity-[0.35]');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated opacities in ${file}`);
  }
});
