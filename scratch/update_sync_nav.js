const fs = require("fs");
const mainPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\js\\main.js";
let code = fs.readFileSync(mainPath, "utf8");

const oldNav = `  // Immediate Initial Hash Navigation (Supports direct linking to #constellation, #garden, #calls, etc.)
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

const newNav = `  // Immediate Initial Hash Navigation (Supports direct linking to #constellation, #garden, #calls, etc.)
  const urlFocus = new URLSearchParams(window.location.search).get("focus");
  const targetHash = urlFocus ? "#" + urlFocus : window.location.hash;
  if (targetHash && targetHash !== "#opening") {
    const target = document.querySelector(targetHash);
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo(0, offsetTop);
      document.documentElement.scrollTop = offsetTop;
      document.body.scrollTop = offsetTop;
      if (window.lenis) {
        window.lenis.scrollTo(target, { immediate: true });
      }
    }
  }`;

code = code.replace(oldNav, newNav);
fs.writeFileSync(mainPath, code, "utf8");
console.log("Updated synchronous navigation in main.js");
