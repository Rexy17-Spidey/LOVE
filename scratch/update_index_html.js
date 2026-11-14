const fs = require("fs");
const indexPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\index.html";
let html = fs.readFileSync(indexPath, "utf8");

// 1. Add stylesheets
if (!html.includes('href="css/themes.css"')) {
  html = html.replace(
    '<link rel="stylesheet" href="css/letter.css">',
    '<link rel="stylesheet" href="css/themes.css">\n  <link rel="stylesheet" href="css/calls.css">\n  <link rel="stylesheet" href="css/letter.css">'
  );
  console.log("Added css/themes.css and css/calls.css to <head>");
}

// 2. Add Theme Selection Screen Overlay right after <body>
const themeSelectorOverlay = `
  <!-- =========================================================================
       0. PERSONALIZED THEME SELECTION EXPERIENCE (Part 1)
       "FIRST, LET'S CHOOSE YOUR LITTLE WORLD."
       ========================================================================= -->
  <div class="theme-selector-overlay" id="theme-selector-overlay" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="theme-selector-dialog">
      <button class="theme-selector-close-btn" id="theme-selector-close-btn" aria-label="Close theme selector">&times;</button>
      
      <div class="theme-selector-header">
        <div class="theme-selector-eyebrow">AN EXHIBITION CUSTOMIZATION &middot; FOR BHAVYA</div>
        <h2 class="theme-selector-title">FIRST, LET'S CHOOSE YOUR LITTLE WORLD.</h2>
        <p class="theme-selector-subtitle">&ldquo;I made a few colours for you. Choose the one that feels most like you.&rdquo;</p>
      </div>

      <div class="theme-cards-grid">
        <!-- Theme 01: Emerald Royale -->
        <article class="theme-option-card selected" data-theme="emerald-royale" tabindex="0" role="button" aria-label="Theme 01: Emerald Royale">
          <div class="theme-card-check-badge">&#10003;</div>
          <div class="theme-card-roman">THEME 01</div>
          <h3 class="theme-card-name">EMERALD ROYALE</h3>
          <div class="theme-card-preview-box" style="background: radial-gradient(circle, #064E46 0%, #032F2A 70%, #01110e 100%);">
            <span class="theme-card-preview-star" style="background: #FFF9EF; box-shadow: 0 0 10px #C5A46D;"></span>
            <span class="theme-card-preview-botanical">&#127807;</span>
          </div>
          <div class="theme-swatches-row">
            <span class="theme-swatch-circle" style="background: #032F2A;"></span>
            <span class="theme-swatch-circle" style="background: #064E46;"></span>
            <span class="theme-swatch-circle" style="background: #087F78;"></span>
            <span class="theme-swatch-circle" style="background: #C5A46D;"></span>
            <span class="theme-swatch-circle" style="background: #FFF9EF;"></span>
          </div>
          <p class="theme-card-desc">Deep emerald, antique gold, elegant museum lighting &amp; dark botanical backgrounds.</p>
        </article>

        <!-- Theme 02: Ocean Emerald -->
        <article class="theme-option-card" data-theme="ocean-emerald" tabindex="0" role="button" aria-label="Theme 02: Ocean Emerald">
          <div class="theme-card-check-badge">&#10003;</div>
          <div class="theme-card-roman">THEME 02</div>
          <h3 class="theme-card-name">OCEAN EMERALD</h3>
          <div class="theme-card-preview-box" style="background: radial-gradient(circle, #0F8790 0%, #075B66 70%, #062F3A 100%);">
            <span class="theme-card-preview-star" style="background: #E5F4F1; box-shadow: 0 0 10px #78D6C6;"></span>
            <span class="theme-card-preview-botanical">&#127754;</span>
          </div>
          <div class="theme-swatches-row">
            <span class="theme-swatch-circle" style="background: #062F3A;"></span>
            <span class="theme-swatch-circle" style="background: #075B66;"></span>
            <span class="theme-swatch-circle" style="background: #0F8790;"></span>
            <span class="theme-swatch-circle" style="background: #9ED8D0;"></span>
            <span class="theme-swatch-circle" style="background: #E5F4F1;"></span>
          </div>
          <p class="theme-card-desc">Deep ocean blue, emerald reflections, turquoise stars &amp; soft aquatic light.</p>
        </article>

        <!-- Theme 03: Midnight Teal -->
        <article class="theme-option-card" data-theme="midnight-teal" tabindex="0" role="button" aria-label="Theme 03: Midnight Teal">
          <div class="theme-card-check-badge">&#10003;</div>
          <div class="theme-card-roman">THEME 03</div>
          <h3 class="theme-card-name">MIDNIGHT TEAL</h3>
          <div class="theme-card-preview-box" style="background: radial-gradient(circle, #177E89 0%, #0B4F5C 70%, #071F2C 100%);">
            <span class="theme-card-preview-star" style="background: #E8F2F0; box-shadow: 0 0 10px #A7DDE0;"></span>
            <span class="theme-card-preview-botanical">&#10022;</span>
          </div>
          <div class="theme-swatches-row">
            <span class="theme-swatch-circle" style="background: #071F2C;"></span>
            <span class="theme-swatch-circle" style="background: #0B4F5C;"></span>
            <span class="theme-swatch-circle" style="background: #177E89;"></span>
            <span class="theme-swatch-circle" style="background: #A7DDE0;"></span>
            <span class="theme-swatch-circle" style="background: #E8F2F0;"></span>
          </div>
          <p class="theme-card-desc">Moonlit teal, midnight blue, luminous stars &amp; delicate silver-gold details.</p>
        </article>

        <!-- Theme 04: Jade and Sage -->
        <article class="theme-option-card" data-theme="jade-sage" tabindex="0" role="button" aria-label="Theme 04: Jade and Sage">
          <div class="theme-card-check-badge">&#10003;</div>
          <div class="theme-card-roman">THEME 04</div>
          <h3 class="theme-card-name">JADE &amp; SAGE</h3>
          <div class="theme-card-preview-box" style="background: radial-gradient(circle, #528975 0%, #376B5B 70%, #183D35 100%);">
            <span class="theme-card-preview-star" style="background: #DDE9D8; box-shadow: 0 0 10px #D3B98B;"></span>
            <span class="theme-card-preview-botanical">&#127811;</span>
          </div>
          <div class="theme-swatches-row">
            <span class="theme-swatch-circle" style="background: #183D35;"></span>
            <span class="theme-swatch-circle" style="background: #376B5B;"></span>
            <span class="theme-swatch-circle" style="background: #83A995;"></span>
            <span class="theme-swatch-circle" style="background: #DDE9D8;"></span>
            <span class="theme-swatch-circle" style="background: #D3B98B;"></span>
          </div>
          <p class="theme-card-desc">Jade leaves, sage green, soft daylight, delicate floral details &amp; a peaceful garden.</p>
        </article>

        <!-- Theme 05: Sea Glass -->
        <article class="theme-option-card" data-theme="sea-glass" tabindex="0" role="button" aria-label="Theme 05: Sea Glass">
          <div class="theme-card-check-badge">&#10003;</div>
          <div class="theme-card-roman">THEME 05</div>
          <h3 class="theme-card-name">SEA GLASS</h3>
          <div class="theme-card-preview-box" style="background: radial-gradient(circle, #4D9E9B 0%, #2D7B7B 70%, #0E3B42 100%);">
            <span class="theme-card-preview-star" style="background: #F4F8F2; box-shadow: 0 0 10px #83C5BE;"></span>
            <span class="theme-card-preview-botanical">&#128033;</span>
          </div>
          <div class="theme-swatches-row">
            <span class="theme-swatch-circle" style="background: #0E3B42;"></span>
            <span class="theme-swatch-circle" style="background: #2D7B7B;"></span>
            <span class="theme-swatch-circle" style="background: #83C5BE;"></span>
            <span class="theme-swatch-circle" style="background: #CDE9E3;"></span>
            <span class="theme-swatch-circle" style="background: #F4F8F2;"></span>
          </div>
          <p class="theme-card-desc">Sea glass, aquamarine reflections, soft teal, bright natural highlights &amp; dreamy light.</p>
        </article>
      </div>

      <div class="theme-selector-actions">
        <button class="theme-confirm-btn" id="theme-confirm-btn">
          <span>&#10022;</span> THIS ONE FEELS LIKE ME
        </button>
      </div>
    </div>
  </div>
`;

if (!html.includes('id="theme-selector-overlay"')) {
  html = html.replace('<body>', '<body>\n' + themeSelectorOverlay);
  console.log("Added theme-selector-overlay to body");
}

// 3. Update navigation links in header
const oldHeaderNav = `<a href="#timeline" class="nav-link"><span class="roman">06</span>Story of Us</a>
      <a href="#letter" class="nav-link"><span class="roman">07</span>My Promise</a>`;
const newHeaderNav = `<a href="#timeline" class="nav-link"><span class="roman">06</span>Story of Us</a>
      <a href="#calls" class="nav-link"><span class="roman">07</span>Our Calls</a>
      <a href="#letter" class="nav-link"><span class="roman">08</span>My Promise</a>`;

if (html.includes(oldHeaderNav)) {
  html = html.replace(oldHeaderNav, newHeaderNav);
  console.log("Updated header nav links");
}

// 4. Add Palette button to header actions
if (!html.includes('id="theme-picker-btn"')) {
  html = html.replace(
    '<!-- Mobile Hamburger Button -->',
    `<!-- Theme Palette Switcher Button -->
      <button class="theme-picker-btn" id="theme-picker-btn" aria-label="Choose color palette" title="Choose Color Theme (Emerald / Ocean / Teal / Jade / Sea Glass)">
        &#127912;
      </button>\n\n      <!-- Mobile Hamburger Button -->`
  );
  console.log("Added theme-picker-btn to header actions");
}

// 5. Update mobile drawer nav links and header
const oldDrawerLinks = `<a href="#timeline"><span class="num">06</span>The Story of Us</a>
      <a href="#letter"><span class="num">07</span>My Promise</a>`;
const newDrawerLinks = `<a href="#timeline"><span class="num">06</span>The Story of Us</a>
      <a href="#calls"><span class="num">07</span>Our Little Calls</a>
      <a href="#letter"><span class="num">08</span>My Promise</a>`;

if (html.includes(oldDrawerLinks)) {
  html = html.replace(oldDrawerLinks, newDrawerLinks);
  console.log("Updated mobile drawer links");
}

if (!html.includes('id="mobile-theme-picker-btn"')) {
  html = html.replace(
    '<button class="mobile-drawer-close" aria-label="Close menu">âœ•</button>',
    `<button class="theme-picker-btn" id="mobile-theme-picker-btn" aria-label="Change color theme" title="Change Color Theme" style="margin-right:8px;">&#127912;</button>
      <button class="mobile-drawer-close" aria-label="Close menu">&times;</button>`
  );
  console.log("Added mobile-theme-picker-btn to mobile drawer");
}

// 6. Add Transition button inside #constellation (Part 5)
const constellationTransitionHtml = `
      <!-- Connected Celestial Transition to Garden (Part 5) -->
      <div class="constellation-transition-bar" style="text-align:center; margin-top:2rem; position:relative; z-index:10;">
        <a href="#garden" class="theme-confirm-btn" style="text-decoration:none; display:inline-flex; font-size:0.8rem; padding:12px 28px;">
          <span>&#127807;</span> DESCEND INTO HER GARDEN &darr;
        </a>
      </div>
`;
if (!html.includes("DESCEND INTO HER GARDEN") && html.includes('id="constellation"')) {
  html = html.replace(
    '</div>\n  </section>\n\n  <!-- =========================================================================\n       7. SECTION 6: THE GARDEN',
    constellationTransitionHtml + '\n    </div>\n  </section>\n\n  <!-- =========================================================================\n       7. SECTION 6: THE GARDEN'
  );
  console.log("Added descend-to-garden transition button");
}

// 7. Add Transition button inside #garden (Part 5)
const gardenTransitionHtml = `
      <!-- Connected Botanical Transition to Constellation (Part 5) -->
      <div class="garden-transition-bar" style="text-align:center; margin-top:2.5rem; position:relative; z-index:10;">
        <a href="#constellation" class="theme-confirm-btn" style="text-decoration:none; display:inline-flex; font-size:0.8rem; padding:12px 28px;">
          <span>&#10022;</span> ASCEND INTO HER UNIVERSE &uarr;
        </a>
      </div>
`;
if (!html.includes("ASCEND INTO HER UNIVERSE") && html.includes('id="garden"')) {
  html = html.replace(
    '</div>\n  </section>\n\n  <!-- =========================================================================\n       8. SECTION 7: THE STORY OF US',
    gardenTransitionHtml + '\n    </div>\n  </section>\n\n  <!-- =========================================================================\n       8. SECTION 7: THE STORY OF US'
  );
  console.log("Added ascend-to-universe transition button");
}

// 8. Add Our Little Calls Section (#calls) between #timeline and #letter
const callsSectionHtml = `
  <!-- =========================================================================
       8. SECTION 7: OUR LITTLE CALLS (Those Calls I Didn't Want to End)
       ========================================================================= -->
  <section class="section calls-section" id="calls">
    <div class="container">
      <header class="section-header">
        <div class="section-number">Private Archive &middot; Screen Memories</div>
        <h2 class="section-title gold-text">OUR LITTLE CALLS</h2>
        <p class="section-tagline">Those Calls I Didn't Want to End</p>
        <div class="gold-divider"><span>&#10022;</span></div>
      </header>

      <!-- Opening Quote Banner -->
      <div class="calls-quote-banner">
        <p class="calls-quote-text">&ldquo;Some of my favourite moments aren't photographs we posed for. They're just little calls, random expressions, your face on my screen, and me wishing the conversation wouldn't end.&rdquo;</p>
        <div class="calls-quote-note">Preserved exactly as they happened &middot; In the middle of late nights, busy days, and quiet hours</div>
      </div>

      <!-- Filmstrip Reel Carousel -->
      <div class="calls-carousel-wrapper">
        <div class="calls-carousel-nav">
          <button class="calls-nav-btn" id="calls-nav-prev" aria-label="Scroll calls left">&larr;</button>
          <button class="calls-nav-btn" id="calls-nav-next" aria-label="Scroll calls right">&rarr;</button>
        </div>
        <div class="calls-filmstrip-track" id="calls-filmstrip-track" tabindex="0" aria-label="Filmstrip reel of video call memories">
          <!-- Injected dynamically by js/calls.js -->
        </div>
      </div>
    </div>
  </section>
`;

if (!html.includes('id="calls"')) {
  html = html.replace(
    '<!-- =========================================================================\n       9. SECTION 8: THE FINAL EXHIBITION',
    callsSectionHtml + '\n  <!-- =========================================================================\n       9. SECTION 8: THE FINAL EXHIBITION'
  );
  console.log("Added calls-section to index.html");
}

// 9. Add Beside You Couple Monument in #letter
const promiseMonumentHtml = `
      <!-- The Promise Monument: Beside You (Central Couple Portrait) -->
      <div class="promise-portrait-monument" id="promise-portrait-monument">
        <div class="promise-portrait-frame-outer">
          <div class="promise-portrait-frame-inner" id="promise-portrait-trigger" role="button" tabindex="0" aria-label="View Beside You couple portrait in high resolution">
            <img src="assets/images/optimized/promise_beside_you_couple.jpg" 
                 alt="Rahul and Bhavya together, side by side" 
                 class="promise-portrait-img" 
                 id="promise-portrait-img"
                 loading="lazy">
            <div class="promise-portrait-glow"></div>
          </div>
        </div>
        <div class="promise-portrait-content">
          <div class="promise-portrait-eyebrow">THE PROMISE &middot; BESIDE YOU</div>
          <h3 class="promise-portrait-title">Walking Beside You</h3>
          <div class="promise-portrait-caption">
            <p>&ldquo;I don't want to be ahead of you, deciding where we should go.&rdquo;</p>
            <p>&ldquo;I don't want you to follow behind me either.&rdquo;</p>
            <p class="promise-portrait-vow">&ldquo;I want to walk beside you, discover things with you, and make memories at your pace. Not ahead of you. Not pulling you behind me. Just beside you.&rdquo;</p>
          </div>
          <div class="promise-portrait-stamp">RAHUL &amp; BHAVYA &middot; ALWAYS BESIDE YOU</div>
        </div>
      </div>
`;

if (!html.includes('id="promise-portrait-monument"') && html.includes('<div class="letter-sanctuary-desk">')) {
  html = html.replace(
    '<div class="letter-sanctuary-desk">',
    promiseMonumentHtml + '\n      <div class="letter-sanctuary-desk">'
  );
  console.log("Added promise-portrait-monument to #letter");
}

// 10. Add js/themes.js and js/calls.js to scripts
if (!html.includes('src="js/themes.js"')) {
  html = html.replace(
    '<script src="js/timeline.js"></script>',
    '<script src="js/timeline.js"></script>\n  <script src="js/calls.js"></script>\n  <script src="js/themes.js"></script>'
  );
  console.log("Added js/calls.js and js/themes.js to script tags");
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("index.html successfully updated!");
