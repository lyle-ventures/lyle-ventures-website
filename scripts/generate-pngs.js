const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoDir = './src/assets/logos';

// Logo files to convert
const logos = [
  'lyle-ventures-indigo-dark',
  'lyle-ventures-mono-dark',
  'lyle-ventures-black-light',
  'lv-icon-white',
  'lv-icon-indigo',
  'lv-icon-black'
];

// Sizes for icons (favicons)
const iconSizes = [16, 32, 48, 64, 128, 256, 512];

async function convertLogos() {
  for (const logo of logos) {
    const svgPath = path.join(logoDir, `${logo}.svg`);
    const pngPath = path.join(logoDir, `${logo}.png`);
    
    if (!fs.existsSync(svgPath)) {
      console.log(`Skipping ${logo} - SVG not found`);
      continue;
    }
    
    try {
      // Standard PNG at 2x resolution
      await sharp(svgPath)
        .resize({ width: 400 })
        .png()
        .toFile(pngPath);
      console.log(`Created ${pngPath}`);
      
      // For icons, create multiple sizes
      if (logo.startsWith('lv-icon')) {
        for (const size of iconSizes) {
          const sizedPath = path.join(logoDir, `${logo}-${size}.png`);
          await sharp(svgPath)
            .resize(size, size)
            .png()
            .toFile(sizedPath);
          console.log(`Created ${sizedPath}`);
        }
      }
    } catch (err) {
      console.error(`Error converting ${logo}:`, err.message);
    }
  }
}

convertLogos().then(() => {
  console.log('Done!');
}).catch(console.error);
