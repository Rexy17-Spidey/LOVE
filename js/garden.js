/**
 * ==============================================================================
 * THE ART OF HER — SECTION 5: THE GARDEN (The Garden of Bhavya)
 * Golden Fireflies Canvas, Tree of Little Things & 12 Interactive Flowers
 * ==============================================================================
 */

class EnchantedGarden {
  constructor() {
    this.config = window.EXHIBITION_CONFIG?.garden;
    this.canvas = document.getElementById("garden-fireflies-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.fireflies = [];
    this.animationId = null;
    this.flowersGrid = document.getElementById("garden-flowers-grid");
    this.treeGrid = document.getElementById("tree-leaves-grid");
    this.finalBloomShrine = document.getElementById("final-flower-shrine");
    this.bloomedFlowers = new Set();

    window.enchantedGardenInstance = this;
    this.init();
  }

  init() {
    if (!this.config) return;

    this.initFireflies();
    this.renderTreeLeaves();
    this.renderFlowers();
    this.bindEvents();
  }

  /* ----------------------------------------------------------------------------
   * 1. Golden Fireflies Canvas Simulation
   * ---------------------------------------------------------------------------- */
  initFireflies() {
    if (!this.canvas) return;

    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    window.addEventListener("load", () => this.resizeCanvas());

    this.fireflies = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      this.fireflies.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3
      });
    }

    this.animateFireflies();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const section = document.getElementById("garden");
    this.canvas.width = section ? section.clientWidth : window.innerWidth;
    this.canvas.height = section ? section.clientHeight : window.innerHeight;
  }

  animateFireflies() {
    if (!this.ctx || !this.canvas || !this.canvas.isConnected) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let f of this.fireflies) {
      f.x += f.vx;
      f.y += f.vy;
      f.phase += f.pulseSpeed;

      if (f.x < 0) f.x = this.canvas.width;
      if (f.x > this.canvas.width) f.x = 0;
      if (f.y < 0) f.y = this.canvas.height;
      if (f.y > this.canvas.height) f.y = 0;

      const currentAlpha = Math.max(0.1, Math.min(0.9, f.alpha + Math.sin(f.phase) * 0.4));

      this.ctx.save();
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.fillStyle = "#E8D7B5";
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = "#C5A46D";
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationId = requestAnimationFrame(() => this.animateFireflies());
  }

  /* ----------------------------------------------------------------------------
   * 2. The Tree of Little Things (Interactive Leaves)
   * ---------------------------------------------------------------------------- */
  renderTreeLeaves() {
    if (!this.treeGrid || !this.config.treeOfLittleThings?.leaves) return;

    const leaves = this.config.treeOfLittleThings.leaves;
    const html = leaves.map((leaf, idx) => `
      <div class="tree-leaf-item" data-leaf-index="${idx}">
        <span class="leaf-icon">❧</span>
        <div class="leaf-title">${leaf.title}</div>
        <p class="leaf-text">${leaf.text}</p>
      </div>
    `).join("");

    this.treeGrid.innerHTML = html;
  }

  /* ----------------------------------------------------------------------------
   * 3. 12 Interactive Flowers
   * ---------------------------------------------------------------------------- */
  renderFlowers() {
    if (!this.flowersGrid || !this.config.flowers) return;

    const html = this.config.flowers.map((fl, idx) => `
      <div class="flower-card" data-flower-id="${fl.id}" data-index="${idx}" tabindex="0" role="button" aria-label="Explore flower ${fl.name}">
        <div class="flower-bloom-visual">
          <svg viewBox="0 0 100 100">
            <!-- Delicate Botanical Petals -->
            <circle cx="50" cy="50" r="12" fill="${fl.glowColor || '#F4E2BB'}" opacity="0.3"/>
            <path d="M50 15 C45 30 45 40 50 50 C55 40 55 30 50 15 Z" />
            <path d="M50 85 C45 70 45 60 50 50 C55 60 55 70 50 85 Z" />
            <path d="M15 50 C30 45 40 45 50 50 C40 55 30 55 15 50 Z" />
            <path d="M85 50 C70 45 60 45 50 50 C60 55 70 55 85 50 Z" />
            <path d="M25 25 C35 38 42 42 50 50 C42 42 38 35 25 25 Z" />
            <path d="M75 75 C65 62 58 58 50 50 C58 58 62 65 75 75 Z" />
            <path d="M75 25 C62 35 58 42 50 50 C58 42 65 38 75 25 Z" />
            <path d="M25 75 C38 65 42 58 50 50 C42 58 35 62 25 75 Z" />
            <circle cx="50" cy="50" r="4" fill="#F4E2BB"/>
          </svg>
        </div>
        <div class="flower-name">${fl.name}</div>
        <div class="flower-botanical-type">${fl.type || fl.variety || "Botanical Bloom"}</div>
        <div class="flower-message-box">“${fl.message || fl.compliment || ""}”</div>
      </div>
    `).join("");

    this.flowersGrid.innerHTML = html;
  }

  bindEvents() {
    if (this.flowersGrid) {
      const toggleFlower = (card) => {
        if (!card) return;
        const id = card.dataset.flowerId;
        const idx = parseInt(card.dataset.index, 10);
        card.classList.add("bloomed");
        this.bloomedFlowers.add(id);
        this.bloomedFlowers.add(idx);

        if (window.notifyFlowerExplored) {
          window.notifyFlowerExplored(idx, id);
        }

        this.checkFinalBloom();
      };

      this.flowersGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".flower-card");
        toggleFlower(card);
      });

      this.flowersGrid.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const card = e.target.closest(".flower-card");
          if (card) {
            e.preventDefault();
            toggleFlower(card);
          }
        }
      });
    }

    if (this.treeGrid) {
      const toggleLeaf = (leaf) => {
        if (leaf) leaf.classList.toggle("active");
      };

      this.treeGrid.addEventListener("click", (e) => {
        const leaf = e.target.closest(".tree-leaf-item");
        toggleLeaf(leaf);
      });

      this.treeGrid.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const leaf = e.target.closest(".tree-leaf-item");
          if (leaf) {
            e.preventDefault();
            toggleLeaf(leaf);
          }
        }
      });
    }
  }

  checkFinalBloom() {
    const total = this.config.flowers ? this.config.flowers.length : 12;
    let bloomedCount = 0;
    if (this.config.flowers) {
      this.config.flowers.forEach((fl, idx) => {
        if (this.bloomedFlowers.has(fl.id) || this.bloomedFlowers.has(idx)) {
          bloomedCount++;
        }
      });
    } else {
      bloomedCount = this.bloomedFlowers.size;
    }

    // Require all configured flowers to unlock full bloom
    if (this.finalBloomShrine && bloomedCount >= total) {
      this.finalBloomShrine.style.borderColor = "var(--gold-bright)";
      this.finalBloomShrine.style.boxShadow = "0 30px 90px rgba(0,0,0,0.9), 0 0 70px rgba(197, 164, 109, 0.4)";
      const statusEl = this.finalBloomShrine.querySelector(".shrine-status-text");
      if (statusEl) {
        statusEl.textContent = `✦ ALL ${total} BOTANICAL PETALS IN PERMANENT RADIANCE ✦`;
      }
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

window.EnchantedGarden = EnchantedGarden;
