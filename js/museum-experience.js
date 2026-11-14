/**
 * ==============================================================================
 * THE MUSEUM OF HER — INTERACTIVE EXHIBITION CONTROLLER
 * Architecture: Self-Contained Standalone Experience for museum.html
 * Mobile-First · Touch-Friendly · Theme Engine · Lightbox · Floor Plan
 * ==============================================================================
 */

class MuseumExperience {
  constructor() {
    this.data = window.MUSEUM_DATA;
    if (!this.data) {
      console.error("MuseumExperience: MUSEUM_DATA not found.");
      return;
    }

    // State
    this.currentTheme = localStorage.getItem("museum_of_her_theme") || "emerald-royale";
    this.currentRoomIndex = 0;
    this.allExhibitsList = [];
    this.currentLightboxIndex = 0;
    this.audioCtx = null;
    this.synthOsc = null;
    this.synthGain = null;
    this.audioElement = null;
    this.isAudioPlaying = false;

    // DOM Elements
    this.entranceScreen = document.getElementById("museum-entrance");
    this.enterBtn = document.getElementById("enter-exhibition-btn");
    this.skipIntroBtn = document.getElementById("skip-intro-btn");
    this.entranceThemeBtn = document.getElementById("entrance-theme-btn");
    this.themePickerBtn = document.getElementById("header-theme-btn");
    this.themeModal = document.getElementById("theme-selector-modal");
    this.themeModalClose = document.getElementById("theme-modal-close");
    this.audioToggleBtn = document.getElementById("audio-toggle-btn");
    this.floorPlanToggleBtn = document.getElementById("floorplan-toggle-btn");
    this.floorPlanDrawer = document.getElementById("floorplan-drawer");
    this.floorPlanClose = document.getElementById("floorplan-close");
    this.bottomPrevBtn = document.getElementById("bottom-prev-room");
    this.bottomNextBtn = document.getElementById("bottom-next-room");
    this.bottomRoomLabel = document.getElementById("bottom-room-label");
    this.lightboxModal = document.getElementById("museum-lightbox-modal");
    this.lightboxClose = document.getElementById("lightbox-close");
    this.lightboxPrev = document.getElementById("lightbox-prev");
    this.lightboxNext = document.getElementById("lightbox-next");
    this.secretModal = document.getElementById("secret-note-modal");
    this.secretModalClose = document.getElementById("secret-modal-close");

    this.init();
  }

  init() {
    // 1. Initialize 3D Spatial Atmosphere
    if (window.Museum3DAtmosphere) {
      this.atmosphere = new window.Museum3DAtmosphere();
    }

    // 2. Apply Stored Theme
    this.applyTheme(this.currentTheme, false);

    // 3. Render Galleries & Floor Plan
    this.renderAllRooms();
    this.renderFloorPlan();
    this.collectAllExhibits();

    // 4. Bind Global Event Handlers
    this.bindEntrance();
    this.bindThemes();
    this.bindRoomScrollObserver();
    this.bindNavigationControls();
    this.bindLightbox();
    this.bindArchiveFilter();
    this.bindSecretDiscovery();
    this.bindAudio();

    // 5. Check hash for direct jump / modal preview / section isolation
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      if (hash === "theme-modal") {
        this.entranceScreen?.classList.add("hidden");
        this.themeModal?.classList.add("active");
      } else if (hash === "lightbox") {
        this.entranceScreen?.classList.add("hidden");
        this.openLightbox(1); // Inspect Masterpiece
      } else if (hash === "secret-note") {
        this.entranceScreen?.classList.add("hidden");
        this.secretModal?.classList.add("active");
      } else if (hash.startsWith("isolate-")) {
        const isolateId = hash.replace("isolate-", "");
        this.entranceScreen?.classList.add("hidden");
        document.querySelectorAll(".museum-room-section").forEach(sec => {
          if (sec.id !== isolateId) {
            sec.style.display = "none";
          }
        });
        window.scrollTo(0, 0);
      } else {
        const target = document.getElementById(hash);
        if (target) {
          this.entranceScreen?.classList.add("hidden");
          window.scrollTo({ top: target.offsetTop - 70, behavior: "instant" });
        }
      }
    }
  }

  /* ----------------------------------------------------------------------------
   * THEME ENGINE (7 COMPLETE THEMES)
   * ---------------------------------------------------------------------------- */
  applyTheme(themeId, animate = true) {
    const theme = this.data.themes.find(t => t.id === themeId) || this.data.themes[0];
    this.currentTheme = theme.id;
    localStorage.setItem("museum_of_her_theme", theme.id);

    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    // Update 3D canvas atmosphere lighting colors
    if (this.atmosphere) {
      this.atmosphere.updateThemeColors(theme.vars);
    }

    // Update active state in theme modal swatches
    document.querySelectorAll(".theme-card-option").forEach(card => {
      card.classList.toggle("active", card.dataset.themeId === theme.id);
    });

    if (animate) {
      document.body.classList.add("theme-transitioning");
      setTimeout(() => document.body.classList.remove("theme-transitioning"), 400);
    }
  }

  bindThemes() {
    const renderThemeCards = () => {
      const container = document.getElementById("theme-options-grid");
      if (!container) return;

      container.innerHTML = this.data.themes.map(t => `
        <button class="theme-card-option ${t.id === this.currentTheme ? "active" : ""}" data-theme-id="${t.id}" aria-label="Select theme ${t.name}">
          <div class="theme-preview-palette" style="background:${t.bgBase};">
            <span class="preview-dot" style="background:${t.accent};"></span>
            <span class="preview-dot" style="background:${t.vars["--museum-gold"]};"></span>
            <span class="preview-dot" style="background:${t.vars["--museum-text-title"]};"></span>
          </div>
          <div class="theme-option-info">
            <div class="theme-option-name">${t.name}</div>
            <div class="theme-option-tagline">${t.tagline}</div>
          </div>
          <div class="theme-check-icon">✓</div>
        </button>
      `).join("");

      container.querySelectorAll(".theme-card-option").forEach(btn => {
        btn.addEventListener("click", () => {
          this.applyTheme(btn.dataset.themeId, true);
        });
      });
    };

    renderThemeCards();

    const openThemeModal = () => {
      if (this.themeModal) {
        this.themeModal.classList.add("active");
        this.themeModal.setAttribute("aria-hidden", "false");
      }
    };

    const closeThemeModal = () => {
      if (this.themeModal) {
        this.themeModal.classList.remove("active");
        this.themeModal.setAttribute("aria-hidden", "true");
      }
    };

    if (this.themePickerBtn) this.themePickerBtn.addEventListener("click", openThemeModal);
    if (this.entranceThemeBtn) this.entranceThemeBtn.addEventListener("click", openThemeModal);
    if (this.themeModalClose) this.themeModalClose.addEventListener("click", closeThemeModal);
    if (this.themeModal) {
      this.themeModal.addEventListener("click", (e) => {
        if (e.target === this.themeModal) closeThemeModal();
      });
    }
  }

  /* ----------------------------------------------------------------------------
   * ENTRANCE & PROLOGUE TRANSITION
   * ---------------------------------------------------------------------------- */
  bindEntrance() {
    if (!this.entranceScreen) return;

    // Check if visitor has visited before
    const hasVisited = localStorage.getItem("museum_of_her_visited");
    if (hasVisited && this.skipIntroBtn) {
      this.skipIntroBtn.classList.add("suggested");
    }

    const enterExhibition = (targetHash = "#room-00") => {
      localStorage.setItem("museum_of_her_visited", "true");
      this.entranceScreen.classList.add("fade-out");

      setTimeout(() => {
        this.entranceScreen.classList.add("hidden");
        const target = document.querySelector(targetHash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 700);
    };

    if (this.enterBtn) {
      this.enterBtn.addEventListener("click", () => enterExhibition("#room-00"));
    }

    if (this.skipIntroBtn) {
      this.skipIntroBtn.addEventListener("click", () => enterExhibition("#room-01"));
    }
  }

  /* ----------------------------------------------------------------------------
   * DYNAMIC ROOM RENDERING
   * ---------------------------------------------------------------------------- */
  renderAllRooms() {
    const container = document.getElementById("museum-galleries-container");
    if (!container) return;

    let html = "";
    this.data.rooms.forEach((room, idx) => {
      html += this.renderSingleRoom(room, idx);
    });

    container.innerHTML = html;
  }

  renderSingleRoom(room, idx) {
    switch (room.id) {
      case "room-00":
        return this.renderRoom00Intro(room, idx);
      case "room-01":
        return this.renderRoom01Masterpiece(room, idx);
      case "room-02":
        return this.renderRoom02Details(room, idx);
      case "room-03":
        return this.renderRoom03Moods(room, idx);
      case "room-04":
        return this.renderRoom04Monochrome(room, idx);
      case "room-05":
        return this.renderRoom05Archive(room, idx);
      case "room-06":
        return this.renderRoom06Notes(room, idx);
      case "room-07":
        return this.renderRoom07Final(room, idx);
      default:
        return "";
    }
  }

  renderRoom00Intro(room, idx) {
    const h = room.heroExhibit;
    return `
      <section class="museum-room-section room-intro-section" id="${room.id}" data-room-index="${idx}">
        <div class="museum-room-inner">
          <header class="room-editorial-header">
            <div class="room-number-badge">${room.number} &middot; ${room.roman}</div>
            <h2 class="room-title gold-shimmer">${room.title}</h2>
            <div class="room-subtitle">${room.subtitle}</div>
            <div class="museum-gold-divider"><span>✦</span></div>
          </header>

          <div class="intro-curator-prologue">
            <div class="prologue-text-block">
              ${room.paragraphs.map(p => `<p class="prologue-paragraph">${p}</p>`).join("")}
              <div class="prologue-signature">— Rahul &middot; Curator</div>
            </div>

            <div class="intro-hero-frame-wrapper">
              <div class="gilded-museum-frame interactive-frame" 
                   data-img="${h.image}" 
                   data-fallback="${h.fallback}"
                   data-title="${h.title}" 
                   data-room="${room.title}"
                   data-caption="${h.caption}"
                   data-voice="${h.curatorNote || ""}"
                   data-medium="${h.medium || ""}"
                   data-date="${h.date || ""}"
                   role="button" tabindex="0" aria-label="Inspect ${h.title}">
                <div class="frame-art-box">
                  <img src="${h.image}" alt="${h.title}" loading="eager" onerror="this.onerror=null; this.src='${h.fallback}';" />
                  <div class="frame-lighting-glare"></div>
                  <span class="frame-expand-pill">⤢ Inspect</span>
                </div>
                <div class="frame-museum-plaque">
                  <div class="plaque-title">${h.title}</div>
                  <div class="plaque-medium">${h.medium} &middot; ${h.date}</div>
                  <div class="plaque-caption">${h.caption}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderRoom01Masterpiece(room, idx) {
    const h = room.heroExhibit;
    return `
      <section class="museum-room-section room-masterpiece-section" id="${room.id}" data-room-index="${idx}">
        <div class="museum-room-inner">
          <header class="room-editorial-header">
            <div class="room-number-badge">${room.number} &middot; ${room.roman}</div>
            <h2 class="room-title gold-shimmer">${room.title}</h2>
            <div class="room-subtitle">${room.subtitle}</div>
            <div class="museum-gold-divider"><span>✦</span></div>
          </header>

          <p class="room-editorial-intro">${room.intro}</p>

          <div class="masterpiece-monument-display">
            <div class="masterpiece-spotlight-halo"></div>
            <div class="grand-gold-frame interactive-frame"
                 data-img="${h.image}" 
                 data-fallback="${h.fallback}"
                 data-title="${h.title}" 
                 data-room="${room.title}"
                 data-caption="${h.caption}"
                 data-voice="${h.curatorNote || ""}"
                 data-medium="${h.medium || ""}"
                 data-date="${h.date || ""}"
                 role="button" tabindex="0" aria-label="Inspect ${h.title}">
              <div class="grand-art-box">
                <img src="${h.image}" alt="${h.title}" loading="lazy" onerror="this.onerror=null; this.src='${h.fallback}';" />
                <div class="masterpiece-vignette-overlay"></div>
                <div class="frame-lighting-glare"></div>
                <span class="frame-expand-pill">⤢ Inspect Masterpiece</span>
              </div>
            </div>

            <div class="masterpiece-brass-plaque">
              <div class="brass-monogram">B</div>
              <div class="brass-inscription">${h.inscription}</div>
              <h3 class="brass-title">${h.title}</h3>
              <p class="brass-quote">&ldquo;${h.caption}&rdquo;</p>
              <div class="brass-meta">${h.medium} &middot; ${h.date}</div>
              <div class="brass-curator-voice">
                <strong>Curator's Note:</strong> ${h.curatorNote}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderRoom02Details(room, idx) {
    return `
      <section class="museum-room-section room-details-section" id="${room.id}" data-room-index="${idx}">
        <div class="museum-room-inner">
          <header class="room-editorial-header">
            <div class="room-number-badge">${room.number} &middot; ${room.roman}</div>
            <h2 class="room-title gold-shimmer">${room.title}</h2>
            <div class="room-subtitle">${room.subtitle}</div>
            <div class="museum-gold-divider"><span>✦</span></div>
          </header>

          <p class="room-editorial-intro">${room.intro}</p>

          <div class="details-mosaic-grid">
            ${room.exhibits.map(ex => `
              <article class="detail-study-card interactive-frame"
                       data-img="${ex.image}" 
                       data-fallback="${ex.fallback}"
                       data-title="${ex.title}" 
                       data-room="${room.title}"
                       data-caption="${ex.caption}"
                       data-voice="${ex.curatorNote || ""}"
                       data-medium="${ex.tag}"
                       role="button" tabindex="0" aria-label="Inspect ${ex.title}">
                <div class="study-image-wrapper">
                  <img src="${ex.image}" alt="${ex.title}" loading="lazy" onerror="this.onerror=null; this.src='${ex.fallback}';" />
                  <div class="study-tag-badge">${ex.tag}</div>
                  <span class="frame-expand-pill">⤢</span>
                </div>
                <div class="study-card-content">
                  <h4 class="study-card-title">${ex.title}</h4>
                  <p class="study-card-caption">&ldquo;${ex.caption}&rdquo;</p>
                  <div class="study-curator-note">${ex.curatorNote}</div>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  renderRoom03Moods(room, idx) {
    return `
      <section class="museum-room-section room-moods-section" id="${room.id}" data-room-index="${idx}">
        <div class="museum-room-inner">
          <header class="room-editorial-header">
            <div class="room-number-badge">${room.number} &middot; ${room.roman}</div>
            <h2 class="room-title gold-shimmer">${room.title}</h2>
            <div class="room-subtitle">${room.subtitle}</div>
            <div class="museum-gold-divider"><span>✦</span></div>
          </header>

          <p class="room-editorial-intro">${room.intro}</p>

          <div class="moods-editorial-spreads">
            ${room.moodGroups.map((group, gIdx) => `
              <div class="mood-group-spread ${gIdx % 2 === 1 ? "reversed-spread" : ""}">
                <div class="mood-group-meta">
                  <span class="mood-group-index">SERIES 0${gIdx + 1}</span>
                  <h3 class="mood-group-title">${group.title}</h3>
                  <div class="mood-group-tagline">${group.tagline}</div>
                </div>

                <div class="mood-group-frames-duo">
                  <div class="mood-primary-frame interactive-frame"
                       data-img="${group.primary.image}" 
                       data-fallback="${group.primary.fallback}"
                       data-title="${group.title} (Primary Study)" 
                       data-room="${room.title}"
                       data-caption="${group.primary.caption}"
                       data-voice="${group.primary.curatorNote || ""}"
                       role="button" tabindex="0">
                    <img src="${group.primary.image}" alt="${group.title}" loading="lazy" onerror="this.onerror=null; this.src='${group.primary.fallback}';" />
                    <div class="frame-lighting-glare"></div>
                    <div class="mood-frame-caption">${group.primary.caption}</div>
                  </div>

                  ${group.secondary ? `
                    <div class="mood-secondary-frame interactive-frame"
                         data-img="${group.secondary.image}" 
                         data-fallback="${group.secondary.fallback}"
                         data-title="${group.title} (Companion Moment)" 
                         data-room="${room.title}"
                         data-caption="${group.secondary.caption}"
                         data-voice="${group.secondary.curatorNote || ""}"
                         role="button" tabindex="0">
                      <img src="${group.secondary.image}" alt="${group.title} companion" loading="lazy" onerror="this.onerror=null; this.src='${group.secondary.fallback}';" />
                      <div class="frame-lighting-glare"></div>
                      <div class="mood-frame-caption">${group.secondary.caption}</div>
                    </div>
                  ` : ""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  renderRoom04Monochrome(room, idx) {
    const m = room.mainMonochrome;
    return `
      <section class="museum-room-section room-monochrome-section" id="${room.id}" data-room-index="${idx}">
        <div class="museum-room-inner">
          <header class="room-editorial-header">
            <div class="room-number-badge monochrome-badge">${room.number} &middot; ${room.roman}</div>
            <h2 class="room-title silver-shimmer">${room.title}</h2>
            <div class="room-subtitle">${room.subtitle}</div>
            <div class="museum-silver-divider"><span>✧</span></div>
          </header>

          <p class="room-editorial-intro">${room.intro}</p>

          <div class="monochrome-salon-layout">
            <div class="monochrome-primary-frame interactive-frame"
                 data-img="${m.image}" 
                 data-fallback="${m.fallback}"
                 data-title="${m.title}" 
                 data-room="${room.title}"
                 data-caption="${m.caption}"
                 data-voice="${m.curatorNote || ""}"
                 data-medium="${m.inscription}"
                 role="button" tabindex="0" aria-label="Inspect ${m.title}">
              <div class="monochrome-art-container">
                <img src="${m.image}" alt="${m.title}" loading="lazy" onerror="this.onerror=null; this.src='${m.fallback}';" />
                <div class="monochrome-film-grain"></div>
                <span class="frame-expand-pill">⤢ View Monochrome</span>
              </div>
              <div class="monochrome-plaque">
                <div class="monochrome-inscription">${m.inscription}</div>
                <h3 class="monochrome-title">${m.title}</h3>
                <p class="monochrome-caption">&ldquo;${m.caption}&rdquo;</p>
                <div class="monochrome-curator-note">${m.curatorNote}</div>
              </div>
            </div>

            <div class="monochrome-companions-column">
              ${room.companions.map(c => `
                <div class="monochrome-companion-card interactive-frame"
                     data-img="${c.image}" 
                     data-fallback="${c.fallback}"
                     data-title="${c.title}" 
                     data-room="${room.title}"
                     data-caption="${c.caption}"
                     data-voice="${c.curatorNote || ""}"
                     role="button" tabindex="0">
                  <div class="companion-img-box">
                    <img src="${c.image}" alt="${c.title}" loading="lazy" onerror="this.onerror=null; this.src='${c.fallback}';" />
                    <div class="monochrome-film-grain"></div>
                  </div>
                  <div class="companion-info">
                    <h4>${c.title}</h4>
                    <p>${c.caption}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderRoom05Archive(room, idx) {
    return `
      <section class="museum-room-section room-archive-section" id="${room.id}" data-room-index="${idx}">
        <div class="museum-room-inner">
          <header class="room-editorial-header">
            <div class="room-number-badge">${room.number} &middot; ${room.roman}</div>
            <h2 class="room-title gold-shimmer">${room.title}</h2>
            <div class="room-subtitle">${room.subtitle}</div>
            <div class="museum-gold-divider"><span>✦</span></div>
          </header>

          <p class="room-editorial-intro">${room.intro}</p>

          <!-- Filter Navigation -->
          <div class="archive-filter-bar" id="archive-filter-bar">
            ${room.categories.map((cat, cIdx) => `
              <button class="archive-filter-pill ${cIdx === 0 ? "active" : ""}" data-category="${cat}">
                ${cat}
              </button>
            `).join("")}
          </div>

          <!-- Archive Grid -->
          <div class="archive-cards-grid" id="archive-cards-grid">
            ${room.archive.map((item, aIdx) => `
              <article class="archive-item-card interactive-frame" 
                       data-category="${item.category}"
                       data-img="${item.image}" 
                       data-fallback="${item.fallback}"
                       data-title="${item.title}" 
                       data-room="${room.title}"
                       data-caption="${item.caption}"
                       data-date="${item.date}"
                       data-medium="${item.category}"
                       role="button" tabindex="0" aria-label="Inspect ${item.title}">
                <div class="archive-card-media">
                  <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.src='${item.fallback}';" />
                  <div class="archive-number-badge">#0${aIdx + 1}</div>
                  <span class="frame-expand-pill">⤢</span>
                </div>
                <div class="archive-card-details">
                  <div class="archive-date-tag">${item.date} &middot; ${item.category}</div>
                  <h4 class="archive-item-title">${item.title}</h4>
                  <p class="archive-item-caption">${item.caption}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  renderRoom06Notes(room, idx) {
    const s = room.secretDiscovery;
    return `
      <section class="museum-room-section room-notes-section" id="${room.id}" data-room-index="${idx}">
        <div class="museum-room-inner">
          <header class="room-editorial-header">
            <div class="room-number-badge">${room.number} &middot; ${room.roman}</div>
            <h2 class="room-title gold-shimmer">${room.title}</h2>
            <div class="room-subtitle">${room.subtitle}</div>
            <div class="museum-gold-divider"><span>✦</span></div>
          </header>

          <p class="room-editorial-intro">${room.intro}</p>

          <div class="curator-notes-container">
            ${room.notes.map(note => `
              <div class="curator-paper-note">
                <div class="paper-pin">✦</div>
                <div class="note-card-meta">
                  <span class="note-num">NOTE ${note.number}</span>
                  <span class="note-type">OBSERVATION</span>
                </div>
                <h3 class="note-card-heading">${note.heading}</h3>
                <p class="note-card-body">&ldquo;${note.text}&rdquo;</p>
                <div class="note-card-signature">— ${note.signature}</div>
              </div>
            `).join("")}

            <!-- Secret Inscription Discovery Card -->
            <div class="curator-secret-wax-card" id="secret-wax-seal-trigger" role="button" tabindex="0" aria-label="Open Secret Curator Note">
              <div class="wax-seal-stamp">
                <span class="wax-monogram">B</span>
              </div>
              <div class="wax-seal-info">
                <div class="wax-seal-badge">${s.badge}</div>
                <h4 class="wax-seal-title">${s.title}</h4>
                <p class="wax-seal-teaser">${s.teaser}</p>
              </div>
              <div class="wax-seal-arrow">→</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderRoom07Final(room, idx) {
    const c = room.coupleExhibit;
    return `
      <section class="museum-room-section room-final-section" id="${room.id}" data-room-index="${idx}">
        <div class="museum-room-inner">
          <header class="room-editorial-header">
            <div class="room-number-badge">${room.number} &middot; ${room.roman}</div>
            <h2 class="room-title gold-shimmer">${room.title}</h2>
            <div class="room-subtitle">${room.subtitle}</div>
            <div class="museum-gold-divider"><span>✦</span></div>
          </header>

          <div class="final-monument-wrapper">
            <div class="final-couple-frame interactive-frame"
                 data-img="${c.image}" 
                 data-fallback="${c.fallback}"
                 data-title="${c.title}" 
                 data-room="${room.title}"
                 data-caption="${c.caption}"
                 data-medium="${c.medium}"
                 data-date="${c.date}"
                 role="button" tabindex="0" aria-label="Inspect ${c.title}">
              <div class="couple-art-box">
                <img src="${c.image}" alt="${c.title}" loading="lazy" onerror="this.onerror=null; this.src='${c.fallback}';" />
                <div class="frame-lighting-glare"></div>
                <span class="frame-expand-pill">⤢ View Monument</span>
              </div>
              <div class="couple-monument-plaque">
                <h3 class="monument-title">${c.title}</h3>
                <div class="monument-medium">${c.medium} &middot; ${c.date}</div>
                <p class="monument-caption">${c.caption}</p>
              </div>
            </div>

            <div class="final-curator-vows-card">
              <div class="vows-monogram-ring">B &amp; R</div>
              <div class="vows-body">
                ${room.closingVows.map(v => `<p class="vows-paragraph">${v}</p>`).join("")}
              </div>

              <div class="final-museum-declaration gold-shimmer">
                ${room.closingDeclaration}
              </div>

              <div class="final-navigation-actions">
                ${room.returnOptions.map(opt => `
                  <a href="${opt.url}" class="final-action-btn ${opt.isPrimary ? "primary-gold-btn" : "secondary-ghost-btn"}">
                    ${opt.label}
                  </a>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /* ----------------------------------------------------------------------------
   * FLOOR PLAN / ROOM INDEX DRAWER
   * ---------------------------------------------------------------------------- */
  renderFloorPlan() {
    const list = document.getElementById("floorplan-rooms-list");
    if (!list) return;

    list.innerHTML = this.data.rooms.map((room, idx) => `
      <a href="#${room.id}" class="floorplan-room-item ${idx === 0 ? "active" : ""}" data-room-id="${room.id}">
        <span class="floorplan-room-num">${room.number}</span>
        <div class="floorplan-room-text">
          <div class="floorplan-room-title">${room.title}</div>
          <div class="floorplan-room-sub">${room.subtitle}</div>
        </div>
        <span class="floorplan-room-arrow">&rarr;</span>
      </a>
    `).join("");

    list.querySelectorAll(".floorplan-room-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.dataset.roomId;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          this.closeFloorPlan();
        }
      });
    });
  }

  openFloorPlan() {
    if (this.floorPlanDrawer) {
      this.floorPlanDrawer.classList.add("active");
      this.floorPlanDrawer.setAttribute("aria-hidden", "false");
    }
  }

  closeFloorPlan() {
    if (this.floorPlanDrawer) {
      this.floorPlanDrawer.classList.remove("active");
      this.floorPlanDrawer.setAttribute("aria-hidden", "true");
    }
  }

  /* ----------------------------------------------------------------------------
   * SCROLL OBSERVATION & NAVIGATION
   * ---------------------------------------------------------------------------- */
  bindRoomScrollObserver() {
    const roomSections = document.querySelectorAll(".museum-room-section");
    if (!roomSections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const roomIdx = parseInt(entry.target.dataset.roomIndex, 10);
          this.currentRoomIndex = roomIdx;
          const room = this.data.rooms[roomIdx];

          // Update Bottom Room Indicator
          if (this.bottomRoomLabel && room) {
            this.bottomRoomLabel.textContent = `${room.number} OF 07 · ${room.title.toUpperCase()}`;
          }

          // Update Active Floor Plan item
          document.querySelectorAll(".floorplan-room-item").forEach(item => {
            item.classList.toggle("active", item.dataset.roomId === room.id);
          });

          // Transition 3D camera
          if (this.atmosphere) {
            this.atmosphere.transitionToRoom(roomIdx, this.data.rooms.length);
          }
        }
      });
    }, {
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0.1
    });

    roomSections.forEach(sec => observer.observe(sec));
  }

  bindNavigationControls() {
    if (this.floorPlanToggleBtn) {
      this.floorPlanToggleBtn.addEventListener("click", () => this.openFloorPlan());
    }
    if (this.floorPlanClose) {
      this.floorPlanClose.addEventListener("click", () => this.closeFloorPlan());
    }
    if (this.floorPlanDrawer) {
      this.floorPlanDrawer.addEventListener("click", (e) => {
        if (e.target === this.floorPlanDrawer) this.closeFloorPlan();
      });
    }

    // Bottom Prev / Next Room buttons
    if (this.bottomPrevBtn) {
      this.bottomPrevBtn.addEventListener("click", () => {
        const nextIdx = Math.max(0, this.currentRoomIndex - 1);
        const room = this.data.rooms[nextIdx];
        if (room) {
          document.getElementById(room.id)?.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    if (this.bottomNextBtn) {
      this.bottomNextBtn.addEventListener("click", () => {
        const nextIdx = Math.min(this.data.rooms.length - 1, this.currentRoomIndex + 1);
        const room = this.data.rooms[nextIdx];
        if (room) {
          document.getElementById(room.id)?.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Keyboard Arrow navigation for rooms (PageUp / PageDown)
    window.addEventListener("keydown", (e) => {
      if (this.lightboxModal?.classList.contains("active")) return; // Let lightbox handle keys
      if (e.key === "PageDown") {
        const nextIdx = Math.min(this.data.rooms.length - 1, this.currentRoomIndex + 1);
        document.getElementById(this.data.rooms[nextIdx]?.id)?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "PageUp") {
        const nextIdx = Math.max(0, this.currentRoomIndex - 1);
        document.getElementById(this.data.rooms[nextIdx]?.id)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* ----------------------------------------------------------------------------
   * FULLSCREEN LIGHTBOX & IMAGE INSPECTION
   * ---------------------------------------------------------------------------- */
  collectAllExhibits() {
    this.allExhibitsList = [];
    document.querySelectorAll(".interactive-frame").forEach((frame) => {
      this.allExhibitsList.push({
        image: frame.dataset.img,
        fallback: frame.dataset.fallback || "",
        title: frame.dataset.title || "Exhibition Study",
        room: frame.dataset.room || "The Museum of Her",
        caption: frame.dataset.caption || "",
        voice: frame.dataset.voice || "",
        medium: frame.dataset.medium || "Archival Photographic Print",
        date: frame.dataset.date || "Collection Archive"
      });
    });
  }

  bindLightbox() {
    document.addEventListener("click", (e) => {
      const frame = e.target.closest(".interactive-frame");
      if (frame) {
        const img = frame.dataset.img;
        const index = this.allExhibitsList.findIndex(ex => ex.image === img);
        if (index !== -1) {
          this.openLightbox(index);
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const frame = document.activeElement?.closest(".interactive-frame");
        if (frame) {
          e.preventDefault();
          const img = frame.dataset.img;
          const index = this.allExhibitsList.findIndex(ex => ex.image === img);
          if (index !== -1) {
            this.openLightbox(index);
          }
        }
      }
    });

    if (this.lightboxClose) {
      this.lightboxClose.addEventListener("click", () => this.closeLightbox());
    }
    if (this.lightboxPrev) {
      this.lightboxPrev.addEventListener("click", () => this.navigateLightbox(-1));
    }
    if (this.lightboxNext) {
      this.lightboxNext.addEventListener("click", () => this.navigateLightbox(1));
    }

    if (this.lightboxModal) {
      this.lightboxModal.addEventListener("click", (e) => {
        if (e.target === this.lightboxModal) this.closeLightbox();
      });
    }

    // Keyboard controls in Lightbox
    window.addEventListener("keydown", (e) => {
      if (!this.lightboxModal?.classList.contains("active")) return;
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowLeft") this.navigateLightbox(-1);
      if (e.key === "ArrowRight") this.navigateLightbox(1);
    });

    // Touch Swipe in Lightbox
    let touchStartX = 0;
    this.lightboxModal?.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.lightboxModal?.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 45) {
        if (diffX > 0) {
          this.navigateLightbox(-1); // Swipe Right -> Prev
        } else {
          this.navigateLightbox(1);  // Swipe Left -> Next
        }
      }
    }, { passive: true });
  }

  openLightbox(index) {
    if (!this.lightboxModal || !this.allExhibitsList[index]) return;
    this.currentLightboxIndex = index;
    const item = this.allExhibitsList[index];

    const imgEl = document.getElementById("lightbox-img");
    const roomEl = document.getElementById("lightbox-room-tag");
    const titleEl = document.getElementById("lightbox-title");
    const mediumEl = document.getElementById("lightbox-medium");
    const captionEl = document.getElementById("lightbox-caption");
    const voiceEl = document.getElementById("lightbox-curator-voice");
    const countEl = document.getElementById("lightbox-count-pill");

    if (imgEl) {
      imgEl.src = item.image;
      imgEl.onerror = () => { imgEl.src = item.fallback; };
      imgEl.alt = item.title;
    }
    if (roomEl) roomEl.textContent = item.room.toUpperCase();
    if (titleEl) titleEl.textContent = item.title;
    if (mediumEl) mediumEl.textContent = `${item.medium} ${item.date ? `· ${item.date}` : ""}`;
    if (captionEl) captionEl.innerHTML = item.caption ? `&ldquo;${item.caption}&rdquo;` : "";
    if (voiceEl) {
      if (item.voice) {
        voiceEl.style.display = "block";
        voiceEl.innerHTML = `<strong>Rahul's Note:</strong> ${item.voice}`;
      } else {
        voiceEl.style.display = "none";
      }
    }
    if (countEl) {
      countEl.textContent = `EXHIBIT ${index + 1} OF ${this.allExhibitsList.length}`;
    }

    this.lightboxModal.classList.add("active");
    this.lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    if (!this.lightboxModal) return;
    this.lightboxModal.classList.remove("active");
    this.lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  navigateLightbox(direction) {
    const total = this.allExhibitsList.length;
    if (total === 0) return;
    let nextIndex = (this.currentLightboxIndex + direction + total) % total;
    this.openLightbox(nextIndex);
  }

  /* ----------------------------------------------------------------------------
   * ARCHIVE FILTERING (ROOM 05)
   * ---------------------------------------------------------------------------- */
  bindArchiveFilter() {
    const filterBar = document.getElementById("archive-filter-bar");
    const cardsGrid = document.getElementById("archive-cards-grid");
    if (!filterBar || !cardsGrid) return;

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".archive-filter-pill");
      if (!btn) return;

      filterBar.querySelectorAll(".archive-filter-pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      const cards = cardsGrid.querySelectorAll(".archive-item-card");

      cards.forEach(card => {
        if (category === "All" || card.dataset.category === category) {
          card.style.display = "flex";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  }

  /* ----------------------------------------------------------------------------
   * SECRET CURATOR NOTE DISCOVERY (ROOM 06)
   * ---------------------------------------------------------------------------- */
  bindSecretDiscovery() {
    const trigger = document.getElementById("secret-wax-seal-trigger");
    if (trigger && this.secretModal) {
      trigger.addEventListener("click", () => {
        this.secretModal.classList.add("active");
        this.secretModal.setAttribute("aria-hidden", "false");
      });
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.secretModal.classList.add("active");
          this.secretModal.setAttribute("aria-hidden", "false");
        }
      });
    }

    if (this.secretModalClose && this.secretModal) {
      this.secretModalClose.addEventListener("click", () => {
        this.secretModal.classList.remove("active");
        this.secretModal.setAttribute("aria-hidden", "true");
      });
    }

    if (this.secretModal) {
      this.secretModal.addEventListener("click", (e) => {
        if (e.target === this.secretModal) {
          this.secretModal.classList.remove("active");
        }
      });
    }
  }

  /* ----------------------------------------------------------------------------
   * AMBIENT AUDIO ENGINE (OPT-IN, NO FORCED AUTOPLAY)
   * With Web Audio API Fallback Synthesizer
   * ---------------------------------------------------------------------------- */
  bindAudio() {
    if (!this.audioToggleBtn) return;

    // Check if audio file exists
    const audioSrc = this.data.audio?.src || "assets/audio/ambient-piano.mp3";
    this.audioElement = new Audio(audioSrc);
    this.audioElement.loop = true;
    this.audioElement.volume = this.data.audio?.volume || 0.35;

    this.audioToggleBtn.addEventListener("click", () => {
      this.toggleAudio();
    });
  }

  toggleAudio() {
    if (this.isAudioPlaying) {
      this.stopAudio();
    } else {
      this.playAudio();
    }
  }

  playAudio() {
    if (this.audioElement) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isAudioPlaying = true;
          this.updateAudioButtonState(true);
        }).catch(() => {
          // Fallback to soothing Web Audio API ambient drone
          this.startWebAudioDrone();
        });
      }
    } else {
      this.startWebAudioDrone();
    }
  }

  stopAudio() {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }
    this.stopWebAudioDrone();
    this.isAudioPlaying = false;
    this.updateAudioButtonState(false);
  }

  startWebAudioDrone() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === "suspended") this.audioCtx.resume();

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Pentatonic warm atmospheric chord (A2 + E3 drone, soft sine wave)
      osc.type = "sine";
      osc.frequency.setValueAtTime(110.0, this.audioCtx.currentTime); // A2

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();

      this.synthOsc = osc;
      this.synthGain = gain;
      this.isAudioPlaying = true;
      this.updateAudioButtonState(true);
    } catch (e) {
      console.info("Web Audio Synth could not initialize.", e);
    }
  }

  stopWebAudioDrone() {
    if (this.synthGain && this.audioCtx) {
      this.synthGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1);
      setTimeout(() => {
        try {
          this.synthOsc?.stop();
          this.synthOsc?.disconnect();
        } catch (e) {}
      }, 1000);
    }
  }

  updateAudioButtonState(isPlaying) {
    if (!this.audioToggleBtn) return;
    this.audioToggleBtn.classList.toggle("playing", isPlaying);
    this.audioToggleBtn.setAttribute("aria-label", isPlaying ? "Mute ambient sound" : "Play ambient sound");
    this.audioToggleBtn.title = isPlaying ? "Ambient Sound (Playing)" : "Ambient Sound (Muted)";
  }
}

// Auto-boot on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.museumApp = new MuseumExperience();
});
