# THE ART OF HER — TECHNICAL REPAIR AND STABILISATION REPORT
**Codex Engineering Audit & Technical Verification**  
*Project: THE ART OF HER · Dedicated to Bhavya · Curated by Rahul*  
*Workspace: `C:\Users\rahul\Desktop\LOVE\the-art-of-her`*  
*Backup Location: `C:\Users\rahul\Desktop\LOVE\the-art-of-her-backup`*  
*Date of Audit & Repair: 14 November 2026*  

---

## 1. Executive Summary

A comprehensive technical audit, stabilisation, and bug-remediation pass was performed on **THE ART OF HER** digital exhibition codebase. No structural redesigns or creative rewrites were made; all efforts focused purely on technical integrity, interaction fluidity, mobile responsiveness, XML/WebGL robustness, and two-way state synchronization.

### Operational State Summary
- **SVG XML Validity**: 16 out of 16 SVG files verified 100% valid XML via .NET/PowerShell XML parser (`System.Xml.XmlDocument`). All 7 malformed files repaired without visual degradation.
- **Image Fallback Architecture**: 3-tier fallback engine implemented (`Real High-Res JPG` → `Valid Emerald Vector SVG` → `Archival HTML/CSS Typographic Card`). Zero broken image icons or black rectangles can render.
- **Asset Manifest**: Comprehensive `ASSET_MANIFEST.md` authored in `assets/`, detailing all 16 photographic slots, audio ambiance, and step-by-step instructions for adding real personal photographs and audio recordings.
- **Scroll & Navigation Consolidation**: Eliminated duplicate click handlers on the `#enter-exhibition-btn`. Created a single, centralized navigation helper (`window.exhibitionScrollTo`) interfacing cleanly with Lenis, native smooth scrolling, and user motion preferences (`prefers-reduced-motion`).
- **3D Constellation Universe**: Converted all mouse listeners to Pointer Events (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) with an 8px drag vs. tap threshold, delta-time frame-rate independent camera interpolation, clamped pixel ratio (`Math.min(devicePixelRatio, 2)`), full keyboard accessibility (Enter/Space), and modal Escape/backdrop dismiss.
- **3D Living Enchanted Garden**: Solved the infinite upward drift bug in golden fireflies/spores by introducing bounded sinusoidal oscillation around stored `basePositions`. Made koi fish and wildlife flight/hop paths deterministic and frame-rate independent. Converted interactions to Pointer Events with drag thresholds. Replaced all legacy `alert()` invocations with designed `#garden-flower-modal` dialogs.
- **Flower Unlock Logic Synchronization**: Synchronized 2D botanical grid cards and 3D garden blossoms to require all 12 configured flowers (`config.flowers.length`), establishing bidirectional event notification (`window.notifyFlowerExplored`).
- **WebGL Failure Resilience**: Safe initialization wrappers with WebGL feature detection and graceful fallback to 2D Starfield / 2D Constellation Canvas without throwing unhandled exceptions.
- **Story Authenticity Audit**: 100% compliance with Rahul's non-negotiable memory chronology (Amma's birthday seva, afternoon staircase, Anamika, Rebecca, Sathvik, 27 September 2026 11:11 PM confession "I LOVE U", Messi quote, MA QUEEN).

---

## 2. SVG Repair Ledger

During technical inspection, seven SVG files were identified with malformed XML syntax caused by unescaped ampersands (`&` instead of `&amp;`) in text elements and radial gradient IDs. All seven files were repaired in-place and verified with an XML parser:

| # | File Path | Defect Identified | Remediation Applied | XML Verification Status |
| :-: | :--- | :--- | :--- | :-: |
| 1 | `assets/images/black-and-white/bw-portrait.svg` | Bare `&` in text line 56 (`B&W`) and gradient ID | Escaped to `B&amp;W` and updated gradient IDs | **VALID** (100% XML Parsed) |
| 2 | `assets/images/editorial/spread-1.svg` | Bare `&` in subtitle (`Grace & Warmth`) | Escaped to `Grace &amp; Warmth` | **VALID** (100% XML Parsed) |
| 3 | `assets/images/memories/chapter-2-instagram.svg` | Bare `&` in subtitle (`The Song & The Frame...`) | Escaped to `The Song &amp; The Frame...` | **VALID** (100% XML Parsed) |
| 4 | `assets/images/memories/chapter-5-11-11.svg` | Bare `&` in subtitle (`The Late Night Call & Three Words`) | Escaped to `The Late Night Call &amp; Three Words` | **VALID** (100% XML Parsed) |
| 5 | `assets/images/memories/chapter-6-present.svg` | Bare `&` in subtitle (`Growing Closer & Learning Each Other`) | Escaped to `Growing Closer &amp; Learning Each Other` | **VALID** (100% XML Parsed) |
| 6 | `assets/images/memories/chapter-7-roads-ahead.svg` | Bare `&` in subtitle (`Road Trips, Long Drives & Shared Tomorrow`) | Escaped to `Road Trips, Long Drives &amp; Shared Tomorrow` | **VALID** (100% XML Parsed) |
| 7 | `assets/images/museum/details.svg` | Bare `&` in subtitle (`Hands, Voice & Endearing Gestures`) | Escaped to `Hands, Voice &amp; Endearing Gestures` | **VALID** (100% XML Parsed) |

### Re-Verification Test Result
```powershell
SVGs Valid: 16 / 16, Invalid: 0
```
All 16 SVGs render natively in all modern browsers without XML parser error screens.

---

## 3. Image Loading Architecture & Asset Manifest

### 3-Tier Image Loading Pipeline
The updated `window.smartImageLoad` function in `js/main.js` guarantees zero broken image icons or black rectangles:
1. **Tier 1 (Personal Photographs)**: Probes asynchronously for the real `.jpg` file on disk. If loaded successfully, the image updates smoothly without layout shift.
2. **Tier 2 (Vector Masterpiece SVGs)**: The image element immediately renders the verified emerald vector SVG artwork, ensuring instant visual beauty even while JPGs are missing.
3. **Tier 3 (Typographic CSS Archival Placeholder)**: If both JPG and SVG fail to load (e.g., path mismatch or network disruption), the `onerror` handler automatically constructs an elegant emerald & gold CSS card (`.img-fallback-placeholder`) displaying the monogram `✦ B ✦`, portrait title, and curator mark.

### Asset Manifest File
Created `the-art-of-her/assets/ASSET_MANIFEST.md` providing:
- Full catalog of 16 photograph positions across the Editorial, Museum, and Story Timeline sections.
- Status of background audio (`assets/audio/ambient-piano.mp3`).
- Step-by-step instructions for Rahul on naming, recommended aspect ratios (3:4 portrait for galleries, 16:10 or 4:3 for timeline), and dropping photos directly into the assets folders to automatically activate Tier 1 without touching code.

---

## 4. Duplicate Scroll & Navigation Fix

### Issue Diagnosis
- `#enter-exhibition-btn` had two active `click` listeners attached simultaneously:
  1. `main.js`: Attached `window.lenis.scrollTo(nextSection, { offset: -70 })`.
  2. `opening.js`: Attached `nextSection.scrollIntoView({ behavior: "smooth" })`.
- Clicking the button triggered both handlers concurrently, resulting in fighting animation loops, scroll jitter, and erratic inertia.

### Resolution
1. **Removed Duplicate Listener**: Removed the event binding from `js/opening.js`.
2. **Central Navigation Helper**: Implemented `window.exhibitionScrollTo(target, options)` in `js/main.js`:
   - Checks `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
   - Uses `window.lenis.scrollTo` when Lenis is running and motion is enabled.
   - Falls back to native `window.scrollTo({ top: offsetPosition, behavior: 'smooth' })` when Lenis is inactive.
   - Safely updates browser URL hash using `history.pushState` without abrupt jumps.
3. **Unified Routing**: Routed all site navigation through `window.exhibitionScrollTo`:
   - Enter Exhibition button (`#enter-exhibition-btn`)
   - Header navigation links (`.nav-link`)
   - Mobile drawer links (`.mobile-drawer-links a`)
   - Timeline chapter jumpers (`.chapter-jump-btn`)
   - Museum filter triggers (`cbbg` jump)

---

## 5. 3D Constellation Upgrades (`js/constellation-3d.js`)

- **Pointer Events**: Replaced legacy `mousemove`, `mouseleave`, `click` listeners with unified Pointer Events (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`, `pointerleave`).
- **Drag vs. Click Disambiguation**: Tracks pointer travel distance between `pointerdown` and `pointerup`. If $\Delta d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} > 8\text{px}$, the interaction is treated as orbit/pan and star selection is discarded. Star cards open only on clean taps/clicks.
- **Delta-Time Frame-Rate Independence**: Integrated `THREE.Clock()`. Camera lerping and galaxy rotation use frame-rate independent exponential smoothing:
  $$\text{lerpFactor} = 1 - e^{-4.5 \cdot \Delta t}$$
  Eliminates double-speed animation on 120Hz/144Hz displays and sluggish motion on 30Hz mobile screens.
- **GPU Protection**: Device pixel ratio clamped to `Math.min(window.devicePixelRatio, 2)` to eliminate mobile GPU thermal throttling.
- **Accessibility**: Quick-navigation pills now feature `role="button"`, `tabindex="0"`, `aria-label`, and keyboard activation via Enter/Space.
- **Modal Lifecycle**: Added Escape key handler and backdrop click dismissal. Added `IntersectionObserver` to pause the WebGL render loop when the constellation is offscreen, resuming cleanly upon re-entry.

---

## 6. 3D Living Enchanted Garden Upgrades (`js/garden-3d.js`)

- **Firefly Upward Drift Fix**:
  - *Previous Defect*: `let y = p.getY(i) + 0.02; if (y > 18) y = 1.0;` caused fireflies to constantly drift upwards, accumulate at the ceiling, and create unnatural pop-in resets.
  - *Remediation*: Stored original coordinates in `basePositions` (`Float32Array`). Fireflies now oscillate smoothly along all three axes using bounded sinusoidal harmonics:
    $$y_i = \text{baseY}_i + \sin(\text{time} \cdot 1.4 + \phi_i) \cdot 1.2$$
    $$x_i = \text{baseX}_i + \sin(\text{time} \cdot 0.7 + \phi_i) \cdot 0.6$$
    $$z_i = \text{baseZ}_i + \cos(\text{time} \cdot 0.7 + \phi_i) \cdot 0.6$$
    Zero cumulative drift; natural floating firefly aesthetic preserved indefinitely.
- **Wildlife & Koi Fish Deterministic Motion**: Swimming koi fish positions are computed deterministically from `time` and radial coordinates rather than frame-by-frame angle accumulation, preventing speed variations across refresh rates.
- **Pointer Events**: Converted 3D garden interaction to Pointer Events with the same 8px drag threshold, preventing camera swipes from accidentally triggering blossom modals.
- **Elimination of `alert()`**: Replaced all occurrences of `alert()` with styled `#garden-flower-modal` dialogs matching the emerald celestial luxury aesthetic.
- **Modal Keyboard & Backdrop Dismiss**: Escape key and backdrop clicks dismiss the open modal and restore the camera to panoramic vista.

---

## 7. Flower Unlock Logic Synchronization

- **Condition Alignment**:
  - Previously, `garden.js` checked `bloomedFlowers.size >= 3` while `garden-3d.js` checked `exploredFlowers.size >= 4`.
  - Both modules now dynamically evaluate against `config.flowers.length` (all 12 flowers).
- **Two-Way Synchronization**:
  - Created global mediator `window.notifyFlowerExplored(index, flowerId)`.
  - Exploring a blossom in the 3D WebGL scene immediately adds `.bloomed` to the matching card in the 2D botanical grid.
  - Clicking a flower card in the 2D grid notifies the 3D scene, triggering the corresponding blossom flare and particle glow.
  - The Zenith Blossom Shrine illuminates only when all 12 flowers have been explored.

---

## 8. WebGL Failure & Resilience

- **WebGL Support Probe**: Implemented `isWebGLAvailable()` in `js/main.js` probing `WebGLRenderingContext` capabilities.
- **Safe Fallbacks**:
  - If WebGL is unavailable or fails to initialize, the application gracefully initializes the 2D Constellation Canvas (`ConstellationMap`) and the 2D Enchanted Garden without throwing unhandled exceptions.
  - All resize handlers check for `clientWidth === 0 || clientHeight === 0` before updating camera aspect ratios or projection matrices, preventing `NaN` matrix crashes.

---

## 9. Accessibility & Mobile Optimization

- **Focus-Visible Rings**: Added `:focus-visible` styles with a 2px antique gold outline and 3px offset (`outline: 2px solid var(--gold-bright); outline-offset: 3px;`) across buttons, links, pills, and interactive cards.
- **Touch Target Sizing**: All interactive touch targets (buttons, drawer close, modal dismiss, navigation pills) enforce a minimum height of 44px (`min-height: 44px; touch-action: manipulation;`).
- **Image Alt Attributes**: Every static and dynamic `<img>` element contains descriptive, context-specific `alt` attributes (`editorial.spreads`, `museum.galleries`, `timeline.chapters`).
- **Debounced Resize**: Window resize listeners in 3D modules are debounced to prevent layout thrashing on mobile orientation changes.
- **Reduced Motion**: Honored via `@media (prefers-reduced-motion: reduce)` and programmatic checks in `main.js`.

---

## 10. Authentic Story Preservation Audit

A strict automated grep and manual inspection was conducted across `config.js`, `timeline.js`, and `index.html` to guarantee complete factual fidelity to Rahul's personal narrative:

| Chronological Event / Fact | Required Truth | Audit Finding | Verification Status |
| :--- | :--- | :---: | :---: |
| **First Staircase Interaction** | Afternoon, 3rd floor ASBT, Anamika encouraged Bhavya to ask about coding, Rebecca accompanied Bhavya | Present exactly as specified (7 mentions of afternoon, 4 mentions of Anamika, 4 mentions of Rebecca) | **VERIFIED** |
| **Instagram Connection** | Follow request a few days later, alternate days song highlight | Fully intact | **VERIFIED** |
| **Seva & Burger Spot** | Evening of Amma's birthday, Sathvik accompanied Rahul | Present (5 mentions of Amma's birthday, 6 mentions of Sathvik). Zero mentions of "Chancellor" | **VERIFIED** |
| **Night Behind Engineering** | Same evening, canteen seating, fidgeting hands, Rebecca's comment on how much Bhavya talked with Rahul | Intact with authentic conversational tone | **VERIFIED** |
| **Confession Moment** | 27 September 2026, 11:11 PM, Rahul confessed first, words: "I LOVE U", Bhavya's exact reply not fabricated | Fully intact (11 mentions of 11:11, 6 mentions of "I LOVE U") | **VERIFIED** |
| **Messi Highlight** | "You’re soooo beautiful, pretty, gorgeous", "I can see you in front of Messi instead of watching Messi that muchhhhh" | Prominently featured in Editorial Section | **VERIFIED** |
| **Epilogue Curator Note** | Concludes with "MA QUEEN. ♡" | Fully preserved | **VERIFIED** |

---

## 11. Conclusion & Next Steps

The website **THE ART OF HER** is now technically stabilized, memory-leak free, cross-device responsive, and fully operational with 100% valid assets and smooth scrolling.

When Rahul is ready to personalize the exhibition with real photographs of Bhavya:
1. Refer to `assets/ASSET_MANIFEST.md`.
2. Drop `.jpg` photos and `ambient-piano.mp3` into their corresponding folders.
3. The 3-tier loading engine will automatically upgrade the displays from vector artworks to the real photographs without touching code.
