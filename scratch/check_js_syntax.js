const fs = require("fs");
const path = require("path");
const vm = require("vm");

const jsDir = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\js";
const files = fs.readdirSync(jsDir).filter(f => f.endsWith(".js") && !f.includes(".min."));

let errors = 0;
files.forEach(f => {
  const filePath = path.join(jsDir, f);
  const code = fs.readFileSync(filePath, "utf8");
  try {
    new vm.Script(code);
    console.log(`✓ ${f} is syntactically valid.`);
  } catch (err) {
    console.error(`✗ Error in ${f}:`, err.message);
    errors++;
  }
});

if (errors === 0) {
  console.log("\nALL JavaScript files pass syntax check with ZERO errors!");
} else {
  console.error(`\nFound ${errors} syntax errors!`);
}
