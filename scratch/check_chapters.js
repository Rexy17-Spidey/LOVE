const fs = require("fs");
const cfg = fs.readFileSync("c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\config.js", "utf8");

const storyMatch = cfg.match(/storyOfUs:\s*\{[\s\S]*?chapters:\s*\[([\s\S]*?)\]\s*,\s*grandFinale/);
if (storyMatch) {
  console.log("Chapters length:", storyMatch[1].length);
  // print chapter titles and image paths
  const chRegex = /chapterNumber:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
  let m;
  while ((m = chRegex.exec(storyMatch[1])) !== null) {
    console.log(m[1], m[2], "-> image:", m[3]);
  }
}
