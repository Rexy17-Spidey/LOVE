/**
 * ==============================================================================
 * THE ART OF HER — MAIN APPLICATION ENTRY POINT
 * Lenis Smooth Scrolling, 3D Orchestrator, Reveal Observer & Image Engine
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.EXHIBITION_CONFIG;
  if (!config) {
    console.error("EXHIBITION_CONFIG not found. Ensure config.js is loaded first.");
    return;
  }

  // 0. Initialize Personalized Theme Engine (Part 1)
  if (window.ExhibitionThemeManager) {
    window.themeManager = new window.ExhibitionThemeManager();
  }

  // 1. Initialize Lenis Smooth Scrolling (Requirement 2)
  initLenisSmoothScroll();

  // 2. Hydrate Static Content & Meta from config.js
  hydrateMetadata(config);
  hydrateOpeningContent(config);
  hydrateEditorialCover(config);
  hydrateFinalLetter(config);

  // 3. Initialize Interactive Modules & 3D WebGL Worlds
  const audioModule = new window.ExhibitionAudio();
  const openingModule = new window.UniverseOpening();
  const editorialModule = new window.EditorialMagazine();
  const museumModule = new window.MuseumSanctuary();
  const noticingModule = new window.ThingsINotice();

  const webglOk = isWebGLAvailable();

  // Initialize 3D Constellation (with graceful 2D fallback)
  if (webglOk && typeof THREE !== "undefined" && window.Constellation3DUniverse) {
    try {
      new window.Constellation3DUniverse();
    } catch (err) {
      console.warn("Failed to initialize 3D Constellation, falling back to 2D:", err);
      if (window.ConstellationMap) new window.ConstellationMap();
    }
  } else if (window.ConstellationMap) {
    new window.ConstellationMap();
  }

  // Always initialize Enchanted Garden botanical cards & leaves
  if (window.EnchantedGarden) {
    new window.EnchantedGarden();
  }

  // Initialize 3D Living Enchanted Garden if Three.js and WebGL are available
  if (webglOk && typeof THREE !== "undefined" && window.EnchantedGarden3D) {
    try {
      new window.EnchantedGarden3D();
    } catch (err) {
      console.warn("Failed to initialize 3D Garden:", err);
    }
  }

  const timelineModule = new window.StoryTimeline();

  // Initialize Our Little Calls (Section 7)
  if (window.OurLittleCalls) {
    new window.OurLittleCalls();
  }

  // Promise Beside You Lightbox Trigger
  const promiseTrigger = document.getElementById("promise-portrait-trigger");
  if (promiseTrigger) {
    promiseTrigger.addEventListener("click", () => {
      const modal = document.getElementById("artwork-lightbox-modal");
      if (modal) {
        const modalImg = modal.querySelector(".lightbox-img");
        const modalTitle = modal.querySelector(".lightbox-title");
        const modalCaption = modal.querySelector(".lightbox-caption");
        const modalMedium = modal.querySelector(".lightbox-medium");

        if (modalImg) modalImg.src = "assets/images/optimized/promise_beside_you_couple.jpg";
        if (modalTitle) modalTitle.textContent = "Walking Beside You";
        if (modalCaption) {
          modalCaption.innerHTML = "“I don't want to be ahead of you, deciding where we should go.<br>I don't want you to follow behind me either.<br>I want to walk beside you, discover things with you, and make memories at your pace. Not ahead of you. Not pulling you behind me. Just beside you.”";
        }
        if (modalMedium) modalMedium.textContent = "THE PROMISE · BESIDE YOU";

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  }

  // 4. Navigation, Scroll Reveals & Header Behavior
  initHeaderNavigation();
  initMobileDrawer();
  initActiveSectionTracker();
  initScrollRevealObserver();

  // Viewport Section Isolation (Guarantees perfect rendering & headless screenshot fidelity)
  const hashIsolateMatch = window.location.hash.match(/^#isolate-([a-zA-Z0-9_-]+)/);
  let isolateSectionId = (new URLSearchParams(window.location.search).get("isolate")) || (hashIsolateMatch ? hashIsolateMatch[1] : null);
  if (isolateSectionId === "story") isolateSectionId = "timeline";
  if (isolateSectionId) {
    document.querySelectorAll("section").forEach(sec => {
      if (sec.id !== isolateSectionId) {
        sec.style.display = "none";
      } else {
        sec.style.display = "block";
        sec.style.minHeight = "100vh";
      }
    });
    // Ensure header doesn't block top of isolated section
    const siteHeader = document.getElementById("site-header");
    if (siteHeader) siteHeader.style.position = "relative";
  }


  // Immediate Initial Hash Navigation (Supports direct linking to #constellation, #garden, #calls, etc.)
  const urlFocus = new URLSearchParams(window.location.search).get("focus");
  const targetHash = urlFocus ? "#" + urlFocus : window.location.hash;
  if (targetHash && targetHash !== "#opening") {
    const target = document.querySelector(targetHash);
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo(0, offsetTop);
      document.documentElement.scrollTop = offsetTop;
      document.body.scrollTop = offsetTop;
      if (window.lenis) {
        window.lenis.scrollTo(target, { immediate: true });
      }
    }
  }


  // 5. Connected Universe & Garden Smooth Transitions (Part 5)
  const btnDescend = document.querySelector(".constellation-transition-bar a");
  if (btnDescend) {
    btnDescend.addEventListener("click", (e) => {
      e.preventDefault();
      window.exhibitionScrollTo("#garden", { offset: -70 });
    });
  }

  const btnAscend = document.querySelector(".garden-transition-bar a");
  if (btnAscend) {
    btnAscend.addEventListener("click", (e) => {
      e.preventDefault();
      window.exhibitionScrollTo("#constellation", { offset: -70 });
    });
  }
});

/**
 * WebGL Support Detector
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

/**
 * Consolidated Central Exhibition Smooth Navigation Helper
 * Works seamlessly with Lenis when active, falls back to native smooth scrolling
 * when Lenis is not available, and respects prefers-reduced-motion.
 */
window.exhibitionScrollTo = function(target, options = {}) {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targetEl = typeof target === "string" ? document.querySelector(target) : target;
  if (!targetEl) return;

  const offset = typeof options.offset === "number" ? options.offset : -70;

  if (window.lenis && !isReducedMotion) {
    window.lenis.scrollTo(targetEl, { offset: offset });
  } else {
    const behavior = isReducedMotion ? "auto" : "smooth";
    const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior
    });
  }

  if (options.hash) {
    if (window.history && window.history.pushState) {
      window.history.pushState(null, "", options.hash);
    } else {
      window.location.hash = options.hash;
    }
  }
};

/**
 * Lenis Smooth Scroll Engine (Requirement 2)
 */
function initLenisSmoothScroll() {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof Lenis !== "undefined" && !isReducedMotion) {
    window.lenis = new Lenis({
      duration: 0.85, // Snappy, responsive, editorial feel (not sluggish 1.25s)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // Essential for native mobile swipe inertia
      touchMultiplier: 1.0,
      infinite: false
    });

    function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth scroll for all internal anchor links via central helper
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            // Close mobile drawer if open
            const drawer = document.querySelector(".mobile-drawer");
            const backdrop = document.querySelector(".mobile-drawer-backdrop");
            if (drawer) drawer.classList.remove("open");
            if (backdrop) backdrop.classList.remove("active");
            document.body.style.overflow = "";

            window.exhibitionScrollTo(targetEl, { offset: -70, hash: targetId });
          }
        }
      });
    });
  }
}

/**
 * Universal Smart Image Loader (Guarantees ZERO Broken Image Icons)
 * 3-Tier Fallback: Real JPG -> Valid SVG -> Typographic CSS Fallback Card
 */
window.smartImageLoad = function(imgElement, svgPath, realJpgPath, altText = "") {
  if (!imgElement) return;

  if (altText && !imgElement.getAttribute("alt")) {
    imgElement.setAttribute("alt", altText);
  }

  imgElement.onerror = function() {
    if (svgPath && imgElement.src.indexOf(svgPath) === -1) {
      imgElement.src = svgPath;
    } else {
      const parent = imgElement.parentElement;
      if (parent && !parent.querySelector(".img-fallback-placeholder")) {
        imgElement.style.display = "none";
        const placeholder = document.createElement("div");
        placeholder.className = "img-fallback-placeholder";
        placeholder.innerHTML = `
          <div class="placeholder-monogram">✦ B ✦</div>
          <div class="placeholder-title">${altText || "The Art of Her"}</div>
          <div class="placeholder-caption">Archival Portrait · Dedicated to Bhavya</div>
        `;
        parent.appendChild(placeholder);
      }
    }
  };

  // Immediate Tier 2 SVG display
  if (svgPath) {
    imgElement.src = svgPath;
  }

  // Probe Tier 1 Real JPG asynchronously if provided
  if (realJpgPath && realJpgPath !== svgPath) {
    const probe = new Image();
    probe.onload = () => {
      imgElement.src = realJpgPath;
    };
    probe.src = realJpgPath;
  }
};

/**
 * Synchronizes flower exploration across 2D botanical grid and 3D garden view
 */
window.notifyFlowerExplored = function(index, flowerId) {
  // Update 2D cards if present
  const card = document.querySelector(`.flower-card[data-index="${index}"], .flower-card[data-flower-id="${flowerId}"]`);
  if (card) {
    card.classList.add("bloomed");
  }

  // Update 2D Garden instance
  if (window.enchantedGardenInstance) {
    window.enchantedGardenInstance.bloomedFlowers.add(index);
    if (flowerId) window.enchantedGardenInstance.bloomedFlowers.add(flowerId);
    window.enchantedGardenInstance.checkFinalBloom();
  }

  // Update 3D Garden instance
  if (window.enchantedGarden3DInstance) {
    window.enchantedGarden3DInstance.onFlowerExplored(index);
  }
};

/**
 * Hydrates global metadata across the DOM
 */
function hydrateMetadata(config) {
  const meta = config.meta || {};
  document.title = `${meta.projectTitle} · ${meta.recipientName}`;

  document.querySelectorAll(".brand-monogram, .wax-seal-monogram span").forEach(el => {
    el.textContent = meta.recipientMonogram || "B";
  });

  const brandSub = document.querySelector(".brand-sub");
  if (brandSub && meta.subtitle) brandSub.textContent = meta.subtitle;
}

/**
 * Hydrates Opening Hero Scene
 */
function hydrateOpeningContent(config) {
  const op = config.opening || {};
  const meta = config.meta || {};

  const nameEl = document.querySelector(".opening-recipient-name");
  if (nameEl) nameEl.textContent = op.constellationLetters || meta.recipientName || "BHAVYA";

  const preludeEl = document.querySelector(".opening-prelude-quote");
  if (preludeEl && op.preludeQuote) preludeEl.textContent = `“${op.preludeQuote}”`;

  const titleEl = document.querySelector(".opening-title");
  if (titleEl && op.title) titleEl.textContent = op.title;

  const tagEl = document.querySelector(".opening-secondary-tagline");
  if (tagEl && op.secondaryTagline) tagEl.textContent = op.secondaryTagline;

  const btnEl = document.getElementById("enter-exhibition-btn");
  if (btnEl && op.enterButtonText) {
    btnEl.innerHTML = `<span>${op.enterButtonText}</span> <span>✦</span>`;
    btnEl.addEventListener("click", () => {
      window.exhibitionScrollTo("#editorial", { offset: -70, hash: "#editorial" });
    });
  }
}

/**
 * Hydrates Editorial Magazine Cover and Headlines
 */
function hydrateEditorialCover(config) {
  const ed = config.editorial || {};
  const coverImg = document.getElementById("magazine-cover-img");
  
  if (coverImg && ed.coverImage) {
    window.smartImageLoad(coverImg, ed.coverImage.src, ed.coverImage.realSrc);
  }
}

/**
 * Hydrates Section 8: Final Letter (The Kind of Love I Want to Give You)
 */
function hydrateFinalLetter(config) {
  const note = config.kindOfLove || config.artistNote;
  if (!note) return;

  const letterHeading = document.getElementById("letter-main-heading");
  if (letterHeading && note.heading) letterHeading.textContent = note.heading;

  const letterSub = document.getElementById("letter-subheading");
  if (letterSub && note.subheading) letterSub.textContent = note.subheading;

  const salutation = document.querySelector(".letter-salutation");
  if (salutation && note.salutation) salutation.textContent = note.salutation;

  const bodyContainer = document.querySelector(".letter-body");
  if (bodyContainer && note.paragraphs) {
    bodyContainer.innerHTML = note.paragraphs.map(p => {
      if (p.includes("I could fill galleries") || p.includes("walk beside you at whatever pace")) {
        return `<p class="letter-paragraph letter-handwritten-highlight">“${p}”</p>`;
      }
      return `<p class="letter-paragraph">${p}</p>`;
    }).join("");
  }

  const closing = document.querySelector(".letter-closing-phrase");
  if (closing && note.closing) closing.textContent = note.closing;

  const signature = document.querySelector(".letter-signature");
  if (signature && note.author) signature.textContent = note.author;

  const ps = document.querySelector(".letter-postscript");
  if (ps && note.postscript) ps.textContent = note.postscript;
}

/**
 * Sticky Header Scroll State
 */
function initHeaderNavigation() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

/**
 * Mobile Hamburger Menu Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const closeBtn = document.querySelector(".mobile-drawer-close");
  const backdrop = document.querySelector(".mobile-drawer-backdrop");
  const links = document.querySelectorAll(".mobile-drawer-links a");

  function openDrawer() {
    drawer?.classList.add("open");
    backdrop?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer?.classList.remove("open");
    backdrop?.classList.remove("active");
    document.body.style.overflow = "";
  }

  toggleBtn?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      closeDrawer();
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          window.exhibitionScrollTo(targetEl, { offset: -70, hash: targetId });
        }
      }
    });
  });
}

/**
 * Active Navigation Indicator (Accurately highlights the current section)
 */
function initActiveSectionTracker() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-drawer-links a");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${currentId}`);
      });
    }
  }, { passive: true });
}

/**
 * Scroll-Triggered Reveal Animations Observer
 */
function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll, .section-header, .spread-card, .gallery-card, .notice-card, .story-chapter-block");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px 40px 0px",
    threshold: 0.05
  });

  revealElements.forEach(el => {
    el.classList.add("reveal-on-scroll");
    observer.observe(el);
  });
}
