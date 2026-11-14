/**
 * ==============================================================================
 * THE ART OF HER — SECTION 2: THE EDITORIAL (The Art of Being Her)
 * Magazine Cover Interaction, Spreads, Special Messi Highlight & Observations
 * ==============================================================================
 */

class EditorialMagazine {
  constructor() {
    this.cover = document.querySelector(".magazine-cover");
    this.coverContainer = document.querySelector(".magazine-cover-container");
    this.spreadsGrid = document.getElementById("editorial-spreads-container");
    this.messiContainer = document.getElementById("messi-highlight-container");
    this.observationsContainer = document.getElementById("editorial-observations-container");
    this.config = window.EXHIBITION_CONFIG?.editorial;

    this.init();
  }

  init() {
    if (!this.config) return;

    this.renderMessiHighlight();
    this.renderObservations();
    this.renderSpreads();
    this.initCover3DTilt();
  }

  renderMessiHighlight() {
    if (!this.messiContainer || !this.config.messiHighlight) return;

    const m = this.config.messiHighlight;
    this.messiContainer.innerHTML = `
      <div class="messi-highlight-card">
        <div class="messi-badge-strip">
          <span class="badge-gold">✦ ${m.tag} ✦</span>
          <span class="badge-gold">${m.badge}</span>
        </div>

        <h3 class="messi-quote-primary gold-text">${m.primaryQuote}</h3>
        <div class="messi-quote-secondary">${m.secondaryQuote}</div>

        <div>
          <div class="messi-annotation-box">
            <span>⚽</span>
            <span>“${m.annotation}”</span>
          </div>
        </div>

        <div class="messi-author-mark">${m.authorMark}</div>
      </div>
    `;
  }

  renderObservations() {
    if (!this.observationsContainer || !this.config.observations) return;

    const html = this.config.observations.map(obs => {
      const isFav = obs.badge.includes("FAVOURITE");
      return `
        <div class="observation-card ${isFav ? 'highlight-card' : ''}">
          <div class="observation-badge">${obs.badge}</div>
          <div class="observation-feature">${obs.feature}</div>
          <div class="observation-headline">${obs.headline}</div>
          <p class="observation-desc">${obs.description}</p>
        </div>
      `;
    }).join("");

    this.observationsContainer.innerHTML = html;
  }

  renderSpreads() {
    if (!this.spreadsGrid || !this.config.spreads) return;

    const html = this.config.spreads.map(spread => {
      const imgSrc = spread.image;
      const fallbackSvg = imgSrc.replace(/\.jpg$/i, ".svg");

      return `
        <article class="spread-card" data-spread-id="${spread.id}">
          <div class="spread-image-wrapper">
            <img 
              src="${imgSrc}" 
              alt="${spread.headline}" 
              loading="lazy"
              onerror="this.onerror=null; this.src='${fallbackSvg}';"
            />
          </div>
          <div class="spread-meta-tag">${spread.meta || "ARCHIVAL FEATURE"}</div>
          <h3 class="spread-headline">${spread.headline}</h3>
          <blockquote class="spread-quote">${spread.pullQuote}</blockquote>
          <p class="spread-text">${spread.text}</p>
          <div class="spread-caption">${spread.caption}</div>
        </article>
      `;
    }).join("");

    this.spreadsGrid.innerHTML = html;

    if (window.smartImageLoad) {
      this.spreadsGrid.querySelectorAll(".spread-card").forEach((card, idx) => {
        const spread = this.config.spreads[idx];
        const img = card.querySelector("img");
        if (img && spread) {
          window.smartImageLoad(img, spread.image, spread.realSrc);
        }
      });
    }
  }

  initCover3DTilt() {
    if (!this.cover || !this.coverContainer) return;

    this.coverContainer.addEventListener("mousemove", (e) => {
      const rect = this.coverContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      this.cover.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    this.coverContainer.addEventListener("mouseleave", () => {
      this.cover.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  }
}

window.EditorialMagazine = EditorialMagazine;
