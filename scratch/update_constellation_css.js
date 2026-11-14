const fs = require("fs");
const cssPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\css\\constellation.css";
let css = fs.readFileSync(cssPath, "utf8");

const extraCss = `
/* ==========================================================================
   CONSTELLATION PROGRESS COUNTER & EXPLORATION PILL
   ========================================================================== */
.constellation-counter-pill {
  position: absolute;
  top: 18px;
  left: 20px;
  z-index: 25;
  background: rgba(2, 26, 23, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(197, 164, 109, 0.45);
  border-radius: 24px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(197, 164, 109, 0.15);
}

.counter-star-icon {
  color: var(--gold-bright);
  font-size: 0.9rem;
  animation: counterStarSpin 6s infinite linear;
}

@keyframes counterStarSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.counter-text {
  font-family: var(--font-mono-meta);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--gold-bright);
  text-transform: uppercase;
}

.counter-progress-bar {
  width: 50px;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
}

.counter-progress-fill {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, var(--teal-rich), var(--gold-bright));
  border-radius: 2px;
  transition: width 0.4s ease;
}

.star-quick-nav-pill {
  background: rgba(3, 40, 35, 0.65);
  border: 1px solid var(--border-gold-subtle);
  padding: 6px 14px;
  font-family: var(--font-mono-meta);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  color: var(--mint-soft);
  cursor: pointer;
  border-radius: 20px;
  transition: all var(--duration-fast) ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.star-quick-nav-pill .pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(197, 164, 109, 0.4);
}

.star-quick-nav-pill:hover {
  background: var(--teal-rich);
  border-color: var(--gold-antique);
  color: var(--gold-bright);
  transform: translateY(-2px);
}

.star-quick-nav-pill.active {
  background: linear-gradient(135deg, var(--emerald-deep), var(--teal-rich));
  border-color: var(--gold-bright);
  color: var(--gold-bright);
  box-shadow: 0 0 12px rgba(244, 226, 187, 0.35);
}

.star-quick-nav-pill.explored .pill-dot {
  background: #00d28d;
  box-shadow: 0 0 6px #00d28d;
}

.celebration-title {
  font-family: var(--font-serif-title);
  font-size: 1.25rem;
  color: var(--gold-bright);
  margin-bottom: 6px;
}

@media (max-width: 768px) {
  .constellation-counter-pill {
    top: 10px;
    left: 10px;
    padding: 6px 12px;
  }
  .counter-text {
    font-size: 0.65rem;
  }
  .counter-progress-bar {
    width: 36px;
  }
}
`;

if (!css.includes("constellation-counter-pill")) {
  css += "\n" + extraCss;
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("Appended progress counter styles to constellation.css");
}
