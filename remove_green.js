const { Jimp, intToRGBA } = require('jimp');
const fs = require('fs');

async function processImage(filename) {
  try {
    const image = await Jimp.read(`public/${filename}`);
    
    // Target green color: Get the exact background color from the top-left pixel (0, 0)
    const bgColor = image.getPixelColor(0, 0);
    const bgRGBA = intToRGBA(bgColor);
    
    console.log(`Processing ${filename}, BG color:`, bgRGBA);

    // Tolerance for color matching
    const tolerance = 45; 
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];

      // Check distance from BG color
      const distance = Math.sqrt(
        Math.pow(r - bgRGBA.r, 2) + 
        Math.pow(g - bgRGBA.g, 2) + 
        Math.pow(b - bgRGBA.b, 2)
      );

      if (distance < tolerance) {
        // Make transparent
        this.bitmap.data[idx + 3] = 0; // alpha to 0
      } else if (distance < tolerance * 1.8) {
        // Anti-aliasing edge softening
        const alphaFade = (distance - tolerance) / (tolerance * 0.8);
        this.bitmap.data[idx + 3] = Math.max(0, Math.min(255, Math.floor(alphaFade * 255)));
      }
    });

    image.write(`public/${filename}`);
    console.log(`Successfully processed ${filename}`);
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
}

async function main() {
  await processImage('logos1.png');
  await processImage('logos2.png');
  await processImage('logos3.png');
  await processImage('logos4.png');
}

main();
