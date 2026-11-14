const fs = require("fs");
const cfg = fs.readFileSync("c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\config.js", "utf8");
const categories = [...cfg.matchAll(/category:\s*"([^"]+)"/g)].map(m => m[1]);
console.log("Categories found:", categories);
