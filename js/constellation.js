/**
 * ==============================================================================
 * THE ART OF HER — SECTION 4: THE CONSTELLATION (The Constellation of Her)
 * Interactive Celestial Starchart, Star Connections & Floating Dedication Cards
 * ==============================================================================
 */

class ConstellationMap {
  constructor() {
    this.config = window.EXHIBITION_CONFIG?.constellation;
    this.viewport = document.querySelector(".constellation-viewport");
    this.canvas = document.getElementById("constellation-lines-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.cardModal = document.getElementById("constellation-card-modal");
    this.quickNav = document.getElementById("constellation-quick-nav");
    this.activeStarIndex = -1;
    this.discoveredStars = new Set();

    this.init();
  }

  init() {
    if (!this.config || !this.viewport) return;

    this.resizeCanvas();
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.drawConstellationLines();
    });

    this.renderStars();
    this.renderQuickNav();
    this.drawConstellationLines();
    this.bindEvents();
  }

  resizeCanvas() {
    if (!this.canvas || !this.viewport) return;
    this.canvas.width = this.viewport.clientWidth;
    this.canvas.height = this.viewport.clientHeight;
  }

  renderStars() {
    if (!this.viewport || !this.config.stars) return;

    // Clear old star nodes if any
    this.viewport.querySelectorAll(".star-node").forEach(n => n.remove());

    this.config.stars.forEach((star, index) => {
      const node = document.createElement("div");
      node.className = "star-node";
      node.dataset.index = index;
      node.style.left = `${star.x}%`;
      node.style.top = `${star.y}%`;

      node.innerHTML = `
        <div class="star-halo"></div>
        <div class="star-point">${star.symbol || "✦"}</div>
        <div class="star-label">${star.category}</div>
      `;

      this.viewport.appendChild(node);
    });
  }

  renderQuickNav() {
    if (!this.quickNav || !this.config.stars) return;

    const html = this.config.stars.map((star, idx) => `
      <button class="quick-star-pill" data-index="${idx}">
        ${star.category}
      </button>
    `).join("");

    this.quickNav.innerHTML = html;
  }

  drawConstellationLines() {
    if (!this.ctx || !this.canvas) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    if (!this.config.stars) return;

    // Connect stars in a sequential constellation chain
    const stars = this.config.stars;

    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 6]);

    for (let i = 0; i < stars.length - 1; i++) {
      const s1 = stars[i];
      const s2 = stars[i + 1];

      const x1 = (s1.x / 100) * w;
      const y1 = (s1.y / 100) * h;
      const x2 = (s2.x / 100) * w;
      const y2 = (s2.y / 100) * h;

      // Glow if both stars were discovered
      const isLit = this.discoveredStars.has(i) && this.discoveredStars.has(i + 1);

      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);

      if (isLit) {
        this.ctx.strokeStyle = "rgba(244, 226, 187, 0.75)";
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = "#F4E2BB";
      } else {
        this.ctx.strokeStyle = "rgba(197, 164, 109, 0.22)";
        this.ctx.shadowBlur = 0;
      }

      this.ctx.stroke();
    }
    this.ctx.setLineDash([]);
  }

  selectStar(index) {
    const star = this.config.stars[index];
    if (!star) return;

    this.activeStarIndex = index;
    this.discoveredStars.add(index);

    // Update node visual active states
    this.viewport.querySelectorAll(".star-node").forEach(node => {
      node.classList.toggle("active", parseInt(node.dataset.index) === index);
    });

    // Update quick nav pill active states
    if (this.quickNav) {
      this.quickNav.querySelectorAll(".quick-star-pill").forEach(pill => {
        pill.classList.toggle("active", parseInt(pill.dataset.index) === index);
      });
    }

    // Redraw constellation lines with new glow
    this.drawConstellationLines();

    // Populate and show dedication card
    this.showDedicationCard(star, index);
  }

  showDedicationCard(star, index) {
    if (!this.cardModal) return;

    this.cardModal.innerHTML = `
      <div class="constellation-card-header">
        <div class="star-category-title">
          <span>✦</span>
          <span>${star.category}</span>
        </div>
        <button class="star-card-close" id="constellation-card-close-btn" aria-label="Close card">✕</button>
      </div>

      <div class="star-latin-name">${star.name}</div>
      <div class="star-meta-specs">${star.magnitude} · Coordinate: RA ${star.x}° / DEC ${star.y}°</div>
      
      <div class="star-tribute-text">
        “${star.tribute}”
      </div>

      <div class="constellation-progress-bar">
        <span>Star ${index + 1} of ${this.config.stars.length}</span>
        <span>${this.discoveredStars.size} / ${this.config.stars.length} Explored</span>
      </div>
    `;

    this.cardModal.classList.add("revealed");

    // Close button event
    const closeBtn = document.getElementById("constellation-card-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.cardModal.classList.remove("revealed");
      });
    }
  }

  bindEvents() {
    // Click on star node
    this.viewport.addEventListener("click", (e) => {
      const node = e.target.closest(".star-node");
      if (node) {
        const idx = parseInt(node.dataset.index);
        this.selectStar(idx);
      }
    });

    // Click on quick nav pill
    if (this.quickNav) {
      this.quickNav.addEventListener("click", (e) => {
        const pill = e.target.closest(".quick-star-pill");
        if (pill) {
          const idx = parseInt(pill.dataset.index);
          this.selectStar(idx);
        }
      });
    }
  }
}

window.ConstellationMap = ConstellationMap;
