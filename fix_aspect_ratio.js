const fs = require('fs');

let content = fs.readFileSync('data/events.ts', 'utf8');

// The current URLs look like: w=3840&q=100&fit=crop
// Let's add h=2160 to force a 16:9 landscape aspect ratio so Unsplash crops it nicely
content = content.replace(/w=3840&q=100&fit=crop/g, 'w=3840&h=2160&q=100&fit=crop');
// Also if it doesn't have fit=crop, add it
content = content.replace(/w=3840&q=100/g, 'w=3840&h=2160&q=100&fit=crop');

// Fix duplicates
content = content.replace(/&fit=crop&fit=crop/g, '&fit=crop');

fs.writeFileSync('data/events.ts', content, 'utf8');
console.log('Fixed aspect ratio in events.ts');
