const fs = require("fs");
const path = require("path");

function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

const dir = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\assets\\screenshots";
fs.readdirSync(dir).filter(f => f.endsWith(".png")).forEach(f => {
  const d = getPngDimensions(path.join(dir, f));
  console.log(`${f}: ${d.width}x${d.height}`);
});
