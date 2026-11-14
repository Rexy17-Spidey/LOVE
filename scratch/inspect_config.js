const fs = require("fs");
const cfg = fs.readFileSync("c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\config.js", "utf8");
console.log("has ourLittleCalls:", cfg.includes("ourLittleCalls"));
console.log("has promisePortrait:", cfg.includes("promisePortrait"));
const navMatch = cfg.match(/navigation:\s*\[([\s\S]*?)\]/);
if (navMatch) console.log("navigation:", navMatch[1]);
