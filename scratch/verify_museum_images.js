const fs = require('fs');
const data = require('../js/museum-data.js');
const path = require('path');
const base = path.join(__dirname, '..');
const images = [];

function findImages(obj) {
  if (!obj) return;
  if (typeof obj === 'string' && (obj.endsWith('.jpg') || obj.endsWith('.jpeg') || obj.endsWith('.svg'))) {
    images.push(obj);
  } else if (Array.isArray(obj)) {
    obj.forEach(findImages);
  } else if (typeof obj === 'object') {
    Object.values(obj).forEach(findImages);
  }
}

findImages(data);
console.log('Total image references in museum data:', images.length);
let missing = 0;
images.forEach(img => {
  const full = path.join(base, img);
  if (!fs.existsSync(full)) {
    console.error('MISSING:', img);
    missing++;
  }
});
if (missing === 0) {
  console.log('✓ All ' + images.length + ' museum images verified exist on disk!');
}
