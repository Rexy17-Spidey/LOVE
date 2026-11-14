const fs = require("fs");
const themesJsPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\js\\themes.js";
let code = fs.readFileSync(themesJsPath, "utf8");

// Add query param support in init()
const oldInit = `    init() {
      const saved = localStorage.getItem(this.storageKey);
      if (saved && THEMES[saved]) {
        this.applyTheme(saved, false);
      } else {
        // First visit: Default to emerald-royale and show the selection experience!
        this.applyTheme("emerald-royale", false);
        this.open();
      }

      this.bindEvents();
    }`;

const newInit = `    init() {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get("theme");
      const noModal = urlParams.has("nomodal") || window.location.hash.length > 1;

      const saved = urlTheme || localStorage.getItem(this.storageKey);
      if (saved && THEMES[saved]) {
        this.applyTheme(saved, false);
        if (!noModal && !localStorage.getItem(this.storageKey) && !urlTheme) {
          this.open();
        }
      } else {
        // First visit: Default to emerald-royale and show the selection experience!
        this.applyTheme("emerald-royale", false);
        if (!noModal) {
          this.open();
        }
      }

      this.bindEvents();
    }`;

code = code.replace(oldInit, newInit);
fs.writeFileSync(themesJsPath, code, "utf8");
console.log("Updated themes.js with url parameter support");
