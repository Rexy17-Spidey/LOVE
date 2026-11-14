/**
 * ==============================================================================
 * THE ART OF HER — SECTION 6: THE STORY OF US
 * Long-Form Editorial Memoir & Reading Progress Tracker
 * ==============================================================================
 */

class StoryTimeline {
  constructor() {
    this.config = window.EXHIBITION_CONFIG?.storyOfUs;
    this.container = document.getElementById("timeline-chapters-container");
    this.progressBar = document.getElementById("story-progress-fill");
    this.progressLabel = document.getElementById("story-progress-label");
    this.jumperContainer = document.getElementById("story-chapter-jumper");

    this.init();
  }

  init() {
    if (!this.config || !this.container) return;

    this.renderJumper();
    this.renderLongFormChapters();
    this.initScrollProgressTracker();
  }

  renderJumper() {
    if (!this.jumperContainer || !this.config.chapters) return;

    const html = this.config.chapters.map((ch, idx) => `
      <button class="chapter-jump-btn" data-target="${ch.id}">
        ${ch.number}
      </button>
    `).join("");

    this.jumperContainer.innerHTML = html;

    this.jumperContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".chapter-jump-btn");
      if (!btn) return;
      const targetId = btn.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (window.exhibitionScrollTo) {
          window.exhibitionScrollTo(targetEl, { offset: -80 });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  renderLongFormChapters() {
    const chapters = this.config.chapters;
    if (!chapters) return;

    const chaptersHtml = chapters.map((ch, idx) => {
      const fallbackSvg = ch.image ? ch.image.replace(/\.jpg$/i, ".svg") : "";

      // Format paragraphs into clean HTML
      const paragraphsHtml = ch.paragraphs.map(p => {
        // Special formatting for the confession line
        if (p === "I LOVE U.") {
          return `<div class="confession-three-words gold-shimmer">“I LOVE U.”</div>`;
        }
        if (p === "MA QUEEN. ♡") {
          return `
            <div class="queen-declaration-banner">
              <div class="queen-declaration-text">MA QUEEN. ♡</div>
              <div class="queen-declaration-sub">Because in my little world, you are the queen. And me? I’m just your devoted follower.</div>
            </div>
          `;
        }
        return `<p class="story-paragraph">${p}</p>`;
      }).join("");

      // Special Milestone Hero for 11:11 PM Confession
      const milestoneHeroHtml = ch.isConfessionChapter ? `
        <div class="confession-milestone-hero">
          <div class="badge-gold" style="margin-bottom: 16px;">THE CONFESSION MILESTONE</div>
          <div class="confession-clock-display">
            <div class="confession-digital-clock">${ch.clockTime || "11:11"}</div>
            <div class="confession-date-stamp">${ch.clockDate || "27.09.2026"}</div>
          </div>
          <p style="font-family: var(--font-serif-body); font-style: italic; color: var(--gold-champagne); font-size: 1.25rem; margin: 0;">
            Around 11:11 PM, after waking up and calling you back, I confessed first.
          </p>
        </div>
      ` : "";

      // Photographic Frame Moment
      const photoMomentHtml = ch.image ? `
        <div class="chapter-photo-moment">
          <div class="photo-moment-frame">
            <img 
              src="${ch.image}" 
              alt="${ch.title}" 
              loading="lazy"
              onerror="this.onerror=null; this.src='${fallbackSvg}';"
            />
          </div>
          <div class="photo-moment-caption">${ch.caption}</div>
        </div>
      ` : "";

      // High-impact pull quote
      const pullQuoteHtml = ch.highlightQuote ? `
        <blockquote class="story-pullquote">${ch.highlightQuote}</blockquote>
      ` : "";

      // Rahul's Conversational Note
      const rahulNoteHtml = ch.rahulNote ? `
        <aside class="rahul-note-card">
          <span class="rahul-note-icon">✦</span>
          <div class="rahul-note-content">
            <div class="rahul-note-heading">Rahul's Memory Note</div>
            <p class="rahul-note-text">${ch.rahulNote}</p>
          </div>
        </aside>
      ` : "";

      return `
        <article class="story-chapter-block" id="${ch.id}">
          <header class="chapter-hero-header">
            <div class="chapter-badge-roman">${ch.number}</div>
            <h3 class="chapter-main-title gold-text">${ch.title}</h3>
            <div class="chapter-meta-ribbon">
              <span>Time: <strong class="highlight">${ch.timePeriod}</strong></span>
              <span>&bull;</span>
              <span>Location: <strong>${ch.location}</strong></span>
            </div>
          </header>

          ${milestoneHeroHtml}
          ${photoMomentHtml}

          <div class="chapter-reading-body">
            ${paragraphsHtml}
          </div>

          ${pullQuoteHtml}
          ${rahulNoteHtml}
        </article>
      `;
    }).join("");

    // Grand Finale Epilogue
    const finale = this.config.grandFinale || {};
    const grandFinaleHtml = `
      <div class="story-grand-finale-shrine">
        <div class="finale-date-monument">${finale.dateStamp || "27.09.2026"}</div>
        <div class="finale-anniversary-line">${finale.anniversaryLine || "The day two people stopped being almost strangers and became an us."}</div>
        <div class="finale-dedication">${finale.dedication || "TO MY BHAVYA,"}</div>
        <h2 class="finale-promise gold-text">${finale.promise || "MAY WE NEVER RUN OUT OF TOMORROWS."}</h2>
        <p class="finale-closing-sentiment">${finale.closingSentiment || "And if life gives us a thousand chapters, I hope every single one has you in it."}</p>
        <div class="finale-infinity-mark">${finale.infiniteSymbol || "∞ ♡"}</div>
      </div>
    `;

    this.container.innerHTML = chaptersHtml + grandFinaleHtml;

    if (window.smartImageLoad) {
      this.container.querySelectorAll(".chapter-photo-moment").forEach((moment, idx) => {
        const chaptersWithPhotos = chapters.filter(c => c.image);
        const ch = chaptersWithPhotos[idx];
        const img = moment.querySelector("img");
        if (img && ch) {
          window.smartImageLoad(img, ch.image, ch.realSrc);
        }
      });
    }
  }

  initScrollProgressTracker() {
    const timelineSec = document.getElementById("timeline");
    if (!timelineSec || !this.progressBar) return;

    window.addEventListener("scroll", () => {
      const rect = timelineSec.getBoundingClientRect();
      const totalHeight = timelineSec.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      let pct = 0;
      if (scrolled > 0 && totalHeight > 0) {
        pct = Math.min(100, Math.max(0, Math.round((scrolled / totalHeight) * 100)));
      }

      this.progressBar.style.width = `${pct}%`;
      if (this.progressLabel) {
        this.progressLabel.textContent = `READING STORY: ${pct}%`;
      }
    }, { passive: true });
  }
}

window.StoryTimeline = StoryTimeline;
