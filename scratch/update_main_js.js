const fs = require("fs");
const mainPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\js\\main.js";
let code = fs.readFileSync(mainPath, "utf8");

// 1. Add ThemeManager and OurLittleCalls initialization
const initThemesAndCalls = `  // 0. Initialize Personalized Theme Engine (Part 1)
  if (window.ExhibitionThemeManager) {
    window.themeManager = new window.ExhibitionThemeManager();
  }

  // 1. Initialize Lenis Smooth Scrolling (Requirement 2)`;

if (!code.includes("window.ExhibitionThemeManager")) {
  code = code.replace("  // 1. Initialize Lenis Smooth Scrolling (Requirement 2)", initThemesAndCalls);
  console.log("Added ExhibitionThemeManager init");
}

const initCalls = `  const timelineModule = new window.StoryTimeline();

  // Initialize Our Little Calls (Section 7)
  if (window.OurLittleCalls) {
    new window.OurLittleCalls();
  }

  // Promise Beside You Lightbox Trigger
  const promiseTrigger = document.getElementById("promise-portrait-trigger");
  if (promiseTrigger) {
    promiseTrigger.addEventListener("click", () => {
      const modal = document.getElementById("artwork-lightbox-modal");
      if (modal) {
        const modalImg = modal.querySelector(".lightbox-img");
        const modalTitle = modal.querySelector(".lightbox-title");
        const modalCaption = modal.querySelector(".lightbox-caption");
        const modalMedium = modal.querySelector(".lightbox-medium");

        if (modalImg) modalImg.src = "assets/images/optimized/promise_beside_you_couple.jpg";
        if (modalTitle) modalTitle.textContent = "Walking Beside You";
        if (modalCaption) {
          modalCaption.innerHTML = "“I don't want to be ahead of you, deciding where we should go.<br>I don't want you to follow behind me either.<br>I want to walk beside you, discover things with you, and make memories at your pace. Not ahead of you. Not pulling you behind me. Just beside you.”";
        }
        if (modalMedium) modalMedium.textContent = "THE PROMISE · BESIDE YOU";

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  }`;

if (!code.includes("new window.OurLittleCalls()")) {
  code = code.replace("  const timelineModule = new window.StoryTimeline();", initCalls);
  console.log("Added OurLittleCalls and Promise Lightbox init");
}

// 2. Connected transitions (Part 5)
const transitionsCode = `
  // 5. Connected Universe & Garden Smooth Transitions (Part 5)
  const btnDescend = document.querySelector(".constellation-transition-bar a");
  if (btnDescend) {
    btnDescend.addEventListener("click", (e) => {
      e.preventDefault();
      window.exhibitionScrollTo("#garden", { offset: -70 });
    });
  }

  const btnAscend = document.querySelector(".garden-transition-bar a");
  if (btnAscend) {
    btnAscend.addEventListener("click", (e) => {
      e.preventDefault();
      window.exhibitionScrollTo("#constellation", { offset: -70 });
    });
  }
`;

if (!code.includes("Connected Universe & Garden Smooth Transitions")) {
  code = code.replace("  initScrollRevealObserver();\n});", "  initScrollRevealObserver();\n" + transitionsCode + "});");
  console.log("Added connected transitions listener");
}

fs.writeFileSync(mainPath, code, "utf8");
console.log("js/main.js updated successfully!");
