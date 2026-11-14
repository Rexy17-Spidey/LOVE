/**
 * ==============================================================================
 * THE ART OF HER — SECTION 1: THE OPENING (A Universe of Her)
 * Starfield Particle Canvas & Sequenced Cinematic Intro
 * ==============================================================================
 */

class UniverseOpening {
  constructor() {
    this.canvas = document.getElementById("celestial-opening-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.stars = [];
    this.constellationPoints = [];
    this.animationFrameId = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.enterBtn = document.getElementById("enter-exhibition-btn");

    this.init();
  }

  init() {
    if (!this.canvas) return;

    this.resize();
    window.addEventListener("resize", () => this.resize());

    this.createStars(220);
    this.createConstellationNodes();
    this.animate();

    this.triggerSequence();
    this.bindEvents();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  createStars(count) {
    this.stars = [];
    const colors = ["#FFF9EF", "#F4E2BB", "#C5A46D", "#DCEEE6", "#087F78"];

    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15
      });
    }
  }

  createConstellationNodes() {
    // Generate gentle constellation coordinates for background aesthetics
    this.constellationPoints = [
      { x: this.width * 0.25, y: this.height * 0.28 },
      { x: this.width * 0.35, y: this.height * 0.22 },
      { x: this.width * 0.45, y: this.height * 0.32 },
      { x: this.width * 0.55, y: this.height * 0.26 },
      { x: this.width * 0.65, y: this.height * 0.35 },
      { x: this.width * 0.75, y: this.height * 0.24 },
      { x: this.width * 0.30, y: this.height * 0.70 },
      { x: this.width * 0.42, y: this.height * 0.78 },
      { x: this.width * 0.58, y: this.height * 0.74 },
      { x: this.width * 0.70, y: this.height * 0.68 }
    ];
  }

  animate() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw delicate constellation lines in opening sky
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i < this.constellationPoints.length - 1; i++) {
      const p1 = this.constellationPoints[i];
      const p2 = this.constellationPoints[i + 1];
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

      if (dist < this.width * 0.3) {
        this.ctx.strokeStyle = "rgba(197, 164, 109, 0.18)";
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
    }

    // 2. Draw twinkling stars
    for (let star of this.stars) {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      star.twinklePhase += star.twinkleSpeed;
      const currentAlpha = Math.max(0.1, Math.min(1, star.alpha + Math.sin(star.twinklePhase) * 0.3));

      this.ctx.save();
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Subtle flare for larger stars
      if (star.radius > 1.2) {
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = star.color;
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  triggerSequence() {
    const badge = document.querySelector(".opening-celestial-badge");
    const name = document.querySelector(".opening-recipient-name");
    const prelude = document.querySelector(".opening-prelude-quote");
    const title = document.querySelector(".opening-title");
    const tagline = document.querySelector(".opening-secondary-tagline");
    const cta = document.querySelector(".opening-cta-group");

    // Sequence timeline
    setTimeout(() => badge?.classList.add("revealed"), 400);
    setTimeout(() => name?.classList.add("revealed"), 1100);
    setTimeout(() => prelude?.classList.add("revealed"), 1900);
    setTimeout(() => title?.classList.add("revealed"), 2800);
    setTimeout(() => tagline?.classList.add("revealed"), 3600);
    setTimeout(() => cta?.classList.add("revealed"), 4400);
  }

  bindEvents() {
    // Navigation is centrally managed in main.js via window.exhibitionScrollTo
    // to prevent duplicate click events, conflicting animations, and scroll jitter.
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

window.UniverseOpening = UniverseOpening;
