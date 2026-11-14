const fs = require("fs");
const configPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\config.js";
let content = fs.readFileSync(configPath, "utf8");

// Replace chapter-4-engineering-night
content = content.replace(
  /image:\s*"assets\/images\/memories\/chapter-4-engineering-night\.svg"[\s\S]*?realSrc:\s*"assets\/images\/memories\/chapter-4-engineering-night\.jpg"[\s\S]*?caption:\s*"[^"]*"/,
  'image: "assets/images/optimized/museum_profile_grace.jpg",\n        realSrc: "assets/images/optimized/museum_profile_grace.jpg",\n        caption: "Supporting memory keepsake: That gentle profile and nervous laughter under the quiet campus streetlights behind Engineering."'
);

// Replace chapter-5-11-11
content = content.replace(
  /image:\s*"assets\/images\/memories\/chapter-5-11-11\.svg"[\s\S]*?realSrc:\s*"assets\/images\/memories\/chapter-5-11-11\.jpg"[\s\S]*?caption:\s*"[^"]*"/,
  'image: "assets/images/optimized/timeline_interlude_soft_profile.jpg",\n        realSrc: "assets/images/optimized/timeline_interlude_soft_profile.jpg",\n        caption: "Supporting memory keepsake: 27 September 2026, around 11:11 PM — thinking about you as I sent those three words: I LOVE U."'
);

// Replace chapter-6-present
content = content.replace(
  /image:\s*"assets\/images\/memories\/chapter-6-present\.svg"[\s\S]*?realSrc:\s*"assets\/images\/memories\/chapter-6-present\.jpg"[\s\S]*?caption:\s*"[^"]*"/,
  'image: "assets/images/optimized/editorial_spread_green_jersey.jpg",\n        realSrc: "assets/images/optimized/editorial_spread_green_jersey.jpg",\n        caption: "Supporting memory keepsake: One of my absolute favourite casual smiles — radiant, completely unscripted, and true."'
);

// Replace chapter-7-roads-ahead
content = content.replace(
  /image:\s*"assets\/images\/memories\/chapter-7-roads-ahead\.svg"[\s\S]*?realSrc:\s*"assets\/images\/memories\/chapter-7-roads-ahead\.jpg"[\s\S]*?caption:\s*"[^"]*"/,
  'image: "assets/images/optimized/promise_beside_you_couple.jpg",\n        realSrc: "assets/images/optimized/promise_beside_you_couple.jpg",\n        caption: "Supporting memory keepsake: The two of us, side by side — ready for every road and every tomorrow ahead."'
);

fs.writeFileSync(configPath, content, "utf8");
console.log("Updated remaining chapters in config.js!");
