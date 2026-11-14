/**
 * ==============================================================================
 * THE ART OF HER — THEME MANAGER ENGINE
 * 5 Personalized Green/Emerald/Teal/Blue Palettes & Dynamic WebGL Synchronization
 * ==============================================================================
 */

(function() {
  const THEMES = {
    "emerald-royale": {
      id: "emerald-royale",
      roman: "01",
      name: "EMERALD ROYALE",
      desc: "Luxurious deep emerald, antique gold, elegant museum lighting and dark botanical backgrounds.",
      palette: ["#032F2A", "#064E46", "#087F78", "#C5A46D", "#FFF9EF"],
      threeColors: {
        background: 0x01110e,
        ambient: 0x064E46,
        starCore: 0xFFF9EF,
        starHalo: 0xF4E2BB,
        galaxyVortex: [0xF4E2BB, 0x087F78, 0x064E46],
        godRays: 0xF4E2BB,
        flowers: [0xC5A46D, 0xFFF9EF, 0x0cb3a7, 0x8C7348]
      }
    },
    "ocean-emerald": {
      id: "ocean-emerald",
      roman: "02",
      name: "OCEAN EMERALD",
      desc: "Deep ocean blue, emerald reflections, turquoise stars and soft aquatic light.",
      palette: ["#062F3A", "#075B66", "#0F8790", "#9ED8D0", "#E5F4F1"],
      threeColors: {
        background: 0x021217,
        ambient: 0x075B66,
        starCore: 0xE5F4F1,
        starHalo: 0x78D6C6,
        galaxyVortex: [0x78D6C6, 0x0F8790, 0x075B66],
        godRays: 0x9ED8D0,
        flowers: [0x43B0AA, 0x9ED8D0, 0xE5F4F1, 0x0F8790]
      }
    },
    "midnight-teal": {
      id: "midnight-teal",
      roman: "03",
      name: "MIDNIGHT TEAL",
      desc: "Moonlit teal, midnight blue, luminous stars and delicate silver-gold details.",
      palette: ["#071F2C", "#0B4F5C", "#177E89", "#A7DDE0", "#E8F2F0"],
      threeColors: {
        background: 0x030e16,
        ambient: 0x0B4F5C,
        starCore: 0xE8F2F0,
        starHalo: 0xA7DDE0,
        galaxyVortex: [0xA7DDE0, 0x177E89, 0x0B4F5C],
        godRays: 0xA7DDE0,
        flowers: [0x2AB7CA, 0xA7DDE0, 0xE8F2F0, 0x177E89]
      }
    },
    "jade-sage": {
      id: "jade-sage",
      roman: "04",
      name: "JADE AND SAGE",
      desc: "Jade leaves, sage green, soft daylight, delicate floral details and a peaceful garden.",
      palette: ["#183D35", "#376B5B", "#83A995", "#DDE9D8", "#D3B98B"],
      threeColors: {
        background: 0x0a1b17,
        ambient: 0x376B5B,
        starCore: 0xDDE9D8,
        starHalo: 0xD3B98B,
        galaxyVortex: [0xD3B98B, 0x83A995, 0x376B5B],
        godRays: 0xD3B98B,
        flowers: [0x83A995, 0xDDE9D8, 0xD3B98B, 0x528975]
      }
    },
    "sea-glass": {
      id: "sea-glass",
      roman: "05",
      name: "SEA GLASS",
      desc: "Sea glass, aquamarine reflections, soft teal, bright natural highlights and dreamy light.",
      palette: ["#0E3B42", "#2D7B7B", "#83C5BE", "#CDE9E3", "#F4F8F2"],
      threeColors: {
        background: 0x05191d,
        ambient: 0x2D7B7B,
        starCore: 0xF4F8F2,
        starHalo: 0x83C5BE,
        galaxyVortex: [0x83C5BE, 0x4D9E9B, 0x2D7B7B],
        godRays: 0xCDE9E3,
        flowers: [0x83C5BE, 0xCDE9E3, 0xF4F8F2, 0x2D7B7B]
      }
    }
  };

  class ThemeManager {
    constructor() {
      this.storageKey = "art_of_her_theme";
      this.currentTheme = "emerald-royale";
      this.overlay = document.getElementById("theme-selector-overlay");
      this.cards = document.querySelectorAll(".theme-option-card");
      this.confirmBtn = document.getElementById("theme-confirm-btn");
      this.closeBtn = document.getElementById("theme-selector-close-btn");
      this.pickerButtons = document.querySelectorAll(".theme-picker-btn");

      this.init();
    }

    init() {
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
    }

    bindEvents() {
      // Click on cards
      this.cards.forEach(card => {
        card.addEventListener("click", () => {
          const themeId = card.dataset.theme;
          if (themeId && THEMES[themeId]) {
            this.applyTheme(themeId, false);
            this.updateCardHighlight(themeId);
          }
        });
      });

      // Confirm button
      if (this.confirmBtn) {
        this.confirmBtn.addEventListener("click", () => {
          this.save(this.currentTheme);
          this.close();
        });
      }

      // Close button
      if (this.closeBtn) {
        this.closeBtn.addEventListener("click", () => {
          this.close();
        });
      }

      // Palette toggle buttons
      this.pickerButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.open();
        });
      });

      // Close on backdrop click
      if (this.overlay) {
        this.overlay.addEventListener("click", (e) => {
          if (e.target === this.overlay) {
            this.close();
          }
        });
      }

      // ESC key to close
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.overlay?.classList.contains("active")) {
          this.close();
        }
      });
    }

    applyTheme(themeId, shouldSave = false) {
      if (!THEMES[themeId]) return;
      this.currentTheme = themeId;
      document.documentElement.dataset.theme = themeId;
      document.body.dataset.theme = themeId;

      this.updateCardHighlight(themeId);

      if (shouldSave) {
        this.save(themeId);
      }

      // Broadcast event for WebGL 3D scenes (Constellation & Garden)
      window.dispatchEvent(new CustomEvent("artOfHerThemeChange", {
        detail: {
          themeId: themeId,
          theme: THEMES[themeId]
        }
      }));
    }

    updateCardHighlight(themeId) {
      this.cards.forEach(card => {
        if (card.dataset.theme === themeId) {
          card.classList.add("selected");
          card.setAttribute("aria-selected", "true");
        } else {
          card.classList.remove("selected");
          card.setAttribute("aria-selected", "false");
        }
      });
    }

    save(themeId) {
      try {
        localStorage.setItem(this.storageKey, themeId);
      } catch (e) {
        console.warn("Could not save theme to localStorage:", e);
      }
    }

    open() {
      if (this.overlay) {
        this.overlay.classList.add("active");
        this.overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        this.updateCardHighlight(this.currentTheme);
      }
    }

    close() {
      if (this.overlay) {
        this.overlay.classList.remove("active");
        this.overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    }

    getThemeData(themeId) {
      return THEMES[themeId || this.currentTheme];
    }
  }

  window.ExhibitionThemeManager = ThemeManager;
  window.EXHIBITION_THEMES = THEMES;
})();
