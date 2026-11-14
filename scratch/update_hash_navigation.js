const fs = require("fs");
const mainPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\js\\main.js";
let code = fs.readFileSync(mainPath, "utf8");

// Update hash scroll to use lenis.scrollTo if available
const oldHashScroll = `  // Immediate Initial Hash Navigation (Permits direct linking to #constellation, #garden, etc.)
  if (window.location.hash && window.location.hash !== "#opening") {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }, 100);
  }`;

const newHashScroll = `  // Immediate Initial Hash Navigation (Supports direct linking to #constellation, #garden, #calls, etc.)
  const targetHash = window.location.hash || (new URLSearchParams(window.location.search).get("focus") ? "#" + new URLSearchParams(window.location.search).get("focus") : "");
  if (targetHash && targetHash !== "#opening") {
    const target = document.querySelector(targetHash);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { immediate: true });
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }
  }`;

code = code.replace(oldHashScroll, newHashScroll);
fs.writeFileSync(mainPath, code, "utf8");
console.log("Updated main.js with immediate lenis.scrollTo navigation");
