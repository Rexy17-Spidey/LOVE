const fs = require("fs");
const cfg = fs.readFileSync("c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\config.js", "utf8");
console.log("has constellation finalMessage:", cfg.includes("I could keep finding new things to love about you"));
console.log("has garden final message:", cfg.includes("If I could plant every beautiful thing I notice about you"));

const starsMatch = cfg.match(/constellation:\s*\{[\s\S]*?stars:\s*\[([\s\S]*?)\]\s*,\s*connections/);
if (starsMatch) {
  const categories = [...starsMatch[1].matchAll(/category:\s*"([^"]+)"/g)].map(m => m[1]);
  console.log("Constellation categories (" + categories.length + "):", categories);
}
