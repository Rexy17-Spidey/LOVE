const fs = require("fs");
const vm = require("vm");

const configPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\config.js";
const code = fs.readFileSync(configPath, "utf8");
try {
  new vm.Script(code);
  console.log("✓ config.js is syntactically valid!");
} catch (err) {
  console.error("✗ Error in config.js:", err.message);
}
