/**
 * ==============================================================================
 * THE ART OF HER — SECTION 3: THE MUSEUM (The Museum of You)
 * Curatorial Navigation, Masterpiece Centerpiece, Art Lightbox & Exhibit CBBG
 * ==============================================================================
 */

class MuseumSanctuary {
  constructor() {
    this.config = window.EXHIBITION_CONFIG?.museum;
    this.tabsContainer = document.getElementById("museum-tabs-bar");
    this.artworkGrid = document.getElementById("museum-artwork-grid");
    this.masterpieceContainer = document.getElementById("masterpiece-hero-container");
    this.cbbgContainer = document.getElementById("cbbg-exhibit-container");
    this.modal = document.getElementById("artwork-lightbox-modal");
    this.modalContent = document.getElementById("lightbox-dynamic-content");
    this.closeBtn = document.getElementById("lightbox-modal-close");

    this.init();
  }

  init() {
    if (!this.config) return;

    this.renderMasterpiece();
    this.renderCbbgExhibit();
    this.renderTabs();
    this.renderArtworks("all");
    this.bindEvents();
  }

  renderMasterpiece() {
    const bw = this.config.galleries.find(g => g.isMasterpiece);
    if (!bw || !this.masterpieceContainer) return;

    const fallbackSvg = bw.image.replace(/\.jpg$/i, ".svg");

    this.masterpieceContainer.innerHTML = `
      <div class="masterpiece-showcase">
        <div class="masterpiece-frame-wrapper">
          <div class="masterpiece-gilded-frame" data-gallery-id="${bw.id}">
            <img 
              src="${bw.image}" 
              alt="${bw.title}" 
              loading="lazy"
              onerror="this.onerror=null; this.src='${fallbackSvg}';"
            />
          </div>
          <div class="museum-plaque">
            <div class="plaque-title">${bw.title}</div>
            <div class="plaque-meta">${bw.acquisition}</div>
          </div>
        </div>

        <div class="masterpiece-curator-column">
          <div class="masterpiece-badge">${bw.roman} · PERMANENT CENTREPIECE</div>
          <h3 class="masterpiece-title">${bw.title}</h3>
          <blockquote class="masterpiece-focal-quote">${bw.quote}</blockquote>
          <p class="masterpiece-description">${bw.description}</p>
          
          <div class="masterpiece-spec-sheet">
            <div class="spec-item">
              <span class="label">Medium</span>
              <span class="value">${bw.medium}</span>
            </div>
            <div class="spec-item">
              <span class="label">Dimensions</span>
              <span class="value">${bw.dimensions}</span>
            </div>
          </div>

          <div style="margin-top: 14px;">
            <button class="btn-ghost-gold inspect-artwork-btn" data-gallery-id="${bw.id}">
              <span>View Archival Notes & Plaque</span>
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.smartImageLoad) {
      const masterImg = this.masterpieceContainer.querySelector(".masterpiece-gilded-frame img");
      if (masterImg) {
        window.smartImageLoad(masterImg, bw.image, bw.realSrc);
      }
    }
  }

  renderCbbgExhibit() {
    if (!this.cbbgContainer || !this.config.cbbgExhibit) return;

    const cbbg = this.config.cbbgExhibit;

    this.cbbgContainer.innerHTML = `
      <div class="cbbg-vault-monument" id="cbbg-vault-monument">
        <div class="cbbg-vault-seal">CBBG</div>
        <div class="badge-gold" style="margin-bottom: 12px;">${cbbg.roman} · ${cbbg.badge}</div>
        <h3 class="cbbg-title">${cbbg.title}</h3>
        <div class="cbbg-subhead">${cbbg.subtitle}</div>
        
        <blockquote class="cbbg-quote">${cbbg.quote}</blockquote>
        <p class="cbbg-narrative">${cbbg.description}</p>

        <div class="cbbg-reveal-container">
          <div class="cbbg-placeholder-notice">
            ${cbbg.editableMemoryPlaceholder}
          </div>
        </div>
      </div>
    `;
  }

  renderTabs() {
    if (!this.tabsContainer) return;

    let html = `<button class="gallery-tab-btn active" data-filter="all">All Chambers</button>`;
    this.config.galleries.forEach(g => {
      html += `<button class="gallery-tab-btn" data-filter="${g.id}">${g.roman}: ${g.title}</button>`;
    });

    if (this.config.cbbgExhibit) {
      html += `<button class="gallery-tab-btn" data-filter="cbbg">Exhibit CBBG</button>`;
    }

    this.tabsContainer.innerHTML = html;
  }

  renderArtworks(filter = "all") {
    if (!this.artworkGrid) return;

    if (filter === "cbbg") {
      this.artworkGrid.style.display = "none";
      if (this.cbbgContainer) {
        if (window.exhibitionScrollTo) {
          window.exhibitionScrollTo(this.cbbgContainer, { offset: -80 });
        } else {
          this.cbbgContainer.scrollIntoView({ behavior: "smooth" });
        }
      }
      return;
    }

    this.artworkGrid.style.display = "grid";

    const filtered = this.config.galleries.filter(g => {
      if (filter === "all") return !g.isMasterpiece;
      return g.id === filter;
    });

    const html = filtered.map(item => {
      const fallbackSvg = item.image.replace(/\.jpg$/i, ".svg");
      return `
        <article class="gallery-card" data-gallery-id="${item.id}">
          <div class="gallery-card-frame">
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              loading="lazy"
              onerror="this.onerror=null; this.src='${fallbackSvg}';"
            />
          </div>
          <div class="gallery-room-tag">${item.roman}</div>
          <h4 class="gallery-card-title">${item.title}</h4>
          <div class="gallery-card-quote">${item.quote}</div>
          <p class="gallery-card-desc">${item.description}</p>
          <div class="gallery-card-footer">
            <span class="badge-gold">${item.dimensions || "Archival"}</span>
            <button class="inspect-btn inspect-artwork-btn" data-gallery-id="${item.id}">
              Inspect Plaque →
            </button>
          </div>
        </article>
      `;
    }).join("");

    this.artworkGrid.innerHTML = html;

    if (window.smartImageLoad) {
      this.artworkGrid.querySelectorAll(".gallery-card").forEach((card) => {
        const gid = card.dataset.galleryId;
        const item = this.config.galleries.find(g => g.id === gid);
        const img = card.querySelector("img");
        if (img && item) {
          window.smartImageLoad(img, item.image, item.realSrc);
        }
      });
    }
  }

  bindEvents() {
    if (this.tabsContainer) {
      this.tabsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".gallery-tab-btn");
        if (!btn) return;

        this.tabsContainer.querySelectorAll(".gallery-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        this.renderArtworks(filter);
      });
    }

    document.addEventListener("click", (e) => {
      const inspectBtn = e.target.closest(".inspect-artwork-btn");
      if (inspectBtn) {
        const galleryId = inspectBtn.dataset.galleryId;
        const item = this.config.galleries.find(g => g.id === galleryId);
        if (item) this.openLightbox(item);
      }
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeLightbox());
    }

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.closeLightbox();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal?.classList.contains("active")) {
        this.closeLightbox();
      }
    });
  }

  openLightbox(item) {
    if (!this.modal || !this.modalContent) return;

    const fallbackSvg = item.image.replace(/\.jpg$/i, ".svg");

    this.modalContent.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center;">
        <div class="gilded-frame">
          <div class="frame-media" style="aspect-ratio: 4/5;">
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              onerror="this.onerror=null; this.src='${fallbackSvg}';"
            />
          </div>
          <div class="frame-corner top-left"></div>
          <div class="frame-corner top-right"></div>
          <div class="frame-corner bottom-left"></div>
          <div class="frame-corner bottom-right"></div>
        </div>

        <div>
          <div class="badge-gold" style="margin-bottom: 12px;">${item.roman} · CURATORIAL ARCHIVE</div>
          <h2 style="font-size: 2.2rem; margin-bottom: 8px;">${item.title}</h2>
          <div style="font-family: var(--font-serif-body); font-size: 1.35rem; color: var(--gold-champagne); font-style: italic; margin-bottom: 18px;">
            ${item.quote}
          </div>
          <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 24px;">
            ${item.description}
          </p>

          <div style="border-top: 1px solid var(--border-gold-subtle); padding-top: 16px;">
            <div style="font-family: var(--font-mono-meta); font-size: 0.75rem; letter-spacing: 0.15em; color: var(--gold-antique); margin-bottom: 4px;">ACQUISITION & MEDIUM</div>
            <div style="font-size: 0.95rem; color: var(--sage-muted);">${item.medium}</div>
            <div style="font-size: 0.85rem; color: var(--gold-muted); margin-top: 4px;">Catalogue: ${item.acquisition}</div>
          </div>
        </div>
      </div>
    `;

    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    if (this.modal) {
      this.modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
}

window.MuseumSanctuary = MuseumSanctuary;
