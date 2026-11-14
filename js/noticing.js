/**
 * ==============================================================================
 * THE ART OF HER — SECTION 4: THINGS YOU PROBABLY DON'T KNOW I NOTICE
 * Affectionate Archival Cards & Interactive Micro-Moments
 * ==============================================================================
 */

class ThingsINotice {
  constructor() {
    this.config = window.EXHIBITION_CONFIG?.thingsINotice;
    this.container = document.getElementById("noticing-cards-grid");

    this.init();
  }

  init() {
    if (!this.config || !this.container) return;

    this.renderCards();
    this.bindEvents();
  }

  renderCards() {
    const items = this.config.items;
    if (!items) return;

    const html = items.map((item, idx) => {
      const isFavourite = item.badge.includes("FAVOURITE");
      const icon = isFavourite ? "✦" : (item.id === "notice-7" ? "🖐" : "❧");

      return `
        <article class="notice-card ${isFavourite ? 'favourite-feature' : ''}" data-index="${idx}">
          <div class="notice-badge">${item.badge}</div>
          <div class="notice-icon-circle">${icon}</div>
          <h4 class="notice-title">${item.title}</h4>
          <p class="notice-text">${item.text}</p>
        </article>
      `;
    }).join("");

    this.container.innerHTML = html;
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener("click", (e) => {
      const card = e.target.closest(".notice-card");
      if (card) {
        card.classList.toggle("active");
      }
    });
  }
}

window.ThingsINotice = ThingsINotice;
