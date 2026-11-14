const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../assets/screenshots/test_museum_mobile_masterpiece.png');
const buf = fs.readFileSync(file);
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log('Mobile Screenshot dimensions: ' + width + ' x ' + height);

