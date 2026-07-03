const fs = require('fs');

let content = fs.readFileSync('data/events.ts', 'utf8');

// Replace all width and height constraints on Unsplash images to maximum resolution
content = content.replace(/w=\d+&h=\d+/g, 'w=3840&q=100');

fs.writeFileSync('data/events.ts', content, 'utf8');
console.log('Upscaled Unsplash images in data/events.ts');
