const fs = require("fs");
const mainPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\js\\main.js";
let code = fs.readFileSync(mainPath, "utf8");

const hashScrollCode = `
  // Immediate Initial Hash Navigation (Permits direct linking to #constellation, #garden, etc.)
  if (window.location.hash && window.location.hash !== "#opening") {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }, 100);
  }
`;

if (!code.includes("Immediate Initial Hash Navigation")) {
  code = code.replace("  initScrollRevealObserver();", "  initScrollRevealObserver();\n" + hashScrollCode);
  fs.writeFileSync(mainPath, code, "utf8");
  console.log("Added immediate initial hash navigation to main.js");
}
