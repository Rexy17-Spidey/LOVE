const fs = require("fs");
const path = require("path");

const root = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her";
const cfg = fs.readFileSync(path.join(root, "config.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const imagePaths = new Set();
const imgRegex = /assets\/[a-zA-Z0-9_\-\.\/]+?\.(jpg|jpeg|png|svg)/g;

let m;
while ((m = imgRegex.exec(cfg)) !== null) {
  imagePaths.add(m[0]);
}
while ((m = imgRegex.exec(html)) !== null) {
  imagePaths.add(m[0]);
}

console.log(`Found ${imagePaths.size} unique image references across config.js and index.html:`);

let missingCount = 0;
imagePaths.forEach(imgPath => {
  const fullPath = path.join(root, imgPath.replace(/\//g, "\\"));
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    console.error(`✗ MISSING: ${imgPath}`);
    missingCount++;
  } else {
    const stat = fs.statSync(fullPath);
    console.log(`✓ ${imgPath} (${(stat.size / 1024).toFixed(1)} KB)`);
  }
});

if (missingCount === 0) {
  console.log("\nALL 100% of referenced images exist on disk!");
} else {
  console.error(`\n${missingCount} images are missing!`);
}
