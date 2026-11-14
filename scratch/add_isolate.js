const fs = require("fs");
const mainPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\js\\main.js";
let code = fs.readFileSync(mainPath, "utf8");

const isolateCode = `
  // Viewport Section Isolation (Guarantees perfect rendering & headless screenshot fidelity)
  const isolateSectionId = new URLSearchParams(window.location.search).get("isolate");
  if (isolateSectionId) {
    document.querySelectorAll("section").forEach(sec => {
      if (sec.id !== isolateSectionId) {
        sec.style.display = "none";
      } else {
        sec.style.display = "block";
        sec.style.minHeight = "100vh";
      }
    });
    // Ensure header doesn't block top of isolated section
    const siteHeader = document.getElementById("site-header");
    if (siteHeader) siteHeader.style.position = "relative";
  }
`;

if (!code.includes("Viewport Section Isolation")) {
  code = code.replace("  initScrollRevealObserver();", "  initScrollRevealObserver();\n" + isolateCode);
  fs.writeFileSync(mainPath, code, "utf8");
  console.log("Added isolate support to main.js");
}
