/**
 * ==============================================================================
 * THE ART OF HER — SECTION 7: OUR LITTLE CALLS
 * Horizontal Filmstrip Reel, Screen Memories & Fullscreen Lightbox
 * ==============================================================================
 */

class OurLittleCalls {
  constructor() {
    this.config = window.EXHIBITION_CONFIG?.ourLittleCalls;
    this.section = document.getElementById("calls");
    this.track = document.getElementById("calls-filmstrip-track");
    this.prevBtn = document.getElementById("calls-nav-prev");
    this.nextBtn = document.getElementById("calls-nav-next");

    if (!this.config || !this.track) {
      console.warn("OurLittleCalls: config or track missing.");
      return;
    }

    this.init();
  }

  init() {
    this.renderCalls();
    this.bindControls();
    this.bindLightboxTriggers();
  }

  renderCalls() {
    if (!this.config.calls || !Array.isArray(this.config.calls)) return;

    this.track.innerHTML = this.config.calls.map(call => `
      <article class="call-memory-card" data-call-id="${call.id}">
        <div class="call-screen-frame" 
             data-img="${call.image}" 
             data-title="${call.title}" 
             data-tag="${call.tag}" 
             data-caption="${call.caption}"
             data-voice="${call.rahulVoice}"
             role="button" 
             tabindex="0" 
             aria-label="View screenshot: ${call.title}">
          <img src="${call.image}" 
               alt="${call.title} - Video call screenshot of Bhavya" 
               class="call-screen-img" 
               loading="lazy" />
          <div class="call-screen-overlay"></div>
          
          <div class="call-status-badge">
            <span class="call-pulse-dot"></span>
            <span>${call.tag}</span>
          </div>

          <button class="call-expand-btn" aria-label="Expand image in high resolution">
            ⤢
          </button>
        </div>

        <div class="call-card-info">
          <div class="call-card-meta">
            <span class="call-card-num">${call.number}</span>
            <span class="call-card-time">${call.timestamp}</span>
          </div>
          <h3 class="call-card-title">${call.title}</h3>
          <p class="call-card-caption">${call.caption}</p>
          <div class="call-card-voice">${call.rahulVoice}</div>
        </div>
      </article>
    `).join("");
  }

  bindControls() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        const cardWidth = this.track.firstElementChild?.offsetWidth || 340;
        this.track.scrollBy({ left: -(cardWidth + 32), behavior: "smooth" });
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        const cardWidth = this.track.firstElementChild?.offsetWidth || 340;
        this.track.scrollBy({ left: cardWidth + 32, behavior: "smooth" });
      });
    }

    // Keyboard Arrow navigation when track is focused
    this.track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.track.scrollBy({ left: -340, behavior: "smooth" });
      } else if (e.key === "ArrowRight") {
        this.track.scrollBy({ left: 340, behavior: "smooth" });
      }
    });
  }

  bindLightboxTriggers() {
    this.track.addEventListener("click", (e) => {
      const frame = e.target.closest(".call-screen-frame");
      if (frame) {
        const imgSrc = frame.dataset.img;
        const title = frame.dataset.title;
        const tag = frame.dataset.tag;
        const caption = frame.dataset.caption;
        const voice = frame.dataset.voice;
        this.openLightbox(imgSrc, title, `${tag} · ${caption}`, voice);
      }
    });

    this.track.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const frame = e.target.closest(".call-screen-frame");
        if (frame) {
          e.preventDefault();
          const imgSrc = frame.dataset.img;
          const title = frame.dataset.title;
          const tag = frame.dataset.tag;
          const caption = frame.dataset.caption;
          const voice = frame.dataset.voice;
          this.openLightbox(imgSrc, title, `${tag} · ${caption}`, voice);
        }
      }
    });
  }

  openLightbox(src, title, caption, voice) {
    const modal = document.getElementById("artwork-lightbox-modal");
    if (!modal) return;

    const modalImg = modal.querySelector(".lightbox-img");
    const modalTitle = modal.querySelector(".lightbox-title");
    const modalCaption = modal.querySelector(".lightbox-caption");
    const modalMedium = modal.querySelector(".lightbox-medium");

    if (modalImg) modalImg.src = src;
    if (modalTitle) modalTitle.textContent = title;
    if (modalCaption) {
      modalCaption.innerHTML = `${caption} <br><br><em style="color:var(--gold-champagne);">&ldquo;${voice}&rdquo;</em>`;
    }
    if (modalMedium) modalMedium.textContent = "PRIVATE VIDEO CALL ARCHIVE · UNFILTERED MEMORY";

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

window.OurLittleCalls = OurLittleCalls;
