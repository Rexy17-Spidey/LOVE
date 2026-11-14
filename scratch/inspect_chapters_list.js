const fs = require("fs");
const cfg = fs.readFileSync("c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\config.js", "utf8");

// Extract storyOfUs
const storyMatch = cfg.match(/storyOfUs:\s*\{[\s\S]*?chapters:\s*\[([\s\S]*?)\]\s*,\s*grandFinale/);
if (storyMatch) {
  const chBlock = storyMatch[1];
  const items = chBlock.split(/\n\s*\{\s*\n/).filter(x => x.trim().length > 0);
  items.forEach((item, i) => {
    const id = item.match(/id:\s*"([^"]+)"/)?.[1];
    const num = item.match(/number:\s*"([^"]+)"/)?.[1];
    const title = item.match(/title:\s*"([^"]+)"/)?.[1];
    const img = item.match(/image:\s*"([^"]+)"/)?.[1];
    console.log(`[${i}] ID: ${id} | Number: ${num} | Title: ${title} | Image: ${img}`);
  });
}
