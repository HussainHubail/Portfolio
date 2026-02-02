const fs = require('fs');
const path = require('path');

// Using svg as a simple way to create a placeholder
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad1)"/>
  <text x="600" y="200" font-size="72" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">Relentic</text>
  <text x="600" y="280" font-size="32" text-anchor="middle" fill="#e0e7ff" font-family="Arial, sans-serif">Full-Stack Fitness Platform</text>
  <text x="600" y="350" font-size="24" text-anchor="middle" fill="#c7d2fe" font-family="Arial, sans-serif">Personalized Workouts • Halal Meal Planning • AI Coach</text>
  <text x="600" y="420" font-size="20" text-anchor="middle" fill="#a5b4fc" font-family="Arial, sans-serif">Real-time Progress Tracking • Mobile-First Design</text>
  <circle cx="200" cy="550" r="30" fill="#60a5fa" opacity="0.6"/>
  <circle cx="1000" cy="100" r="40" fill="#60a5fa" opacity="0.4"/>
  <circle cx="1100" cy="550" r="25" fill="#60a5fa" opacity="0.5"/>
</svg>`;

const outputPath = path.join(__dirname, '../public/relentic-thumb.png');
const svgPath = path.join(__dirname, '../public/relentic-thumb.svg');

// Write SVG (can be used directly)
fs.writeFileSync(svgPath, svg);
console.log('SVG created at:', svgPath);

// Also try to convert to PNG if sharp is available
try {
  const sharp = require('sharp');
  sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath)
    .then(() => console.log('PNG created at:', outputPath))
    .catch(err => console.log('PNG conversion skipped, using SVG instead:', err.message));
} catch {
  console.log('Sharp not available, using SVG instead');
}
