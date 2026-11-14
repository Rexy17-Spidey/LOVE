const fs = require("fs");
const cssPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\css\\letter.css";
let content = fs.readFileSync(cssPath, "utf8");

const monumentCss = `
/* ==========================================================================
   THE PROMISE MONUMENT: BESIDE YOU (CENTRAL REAL COUPLE PORTRAIT)
   ========================================================================== */
.promise-portrait-monument {
  max-width: 920px;
  margin: 0 auto 4.5rem auto;
  background: linear-gradient(180deg, rgba(3, 47, 42, 0.45) 0%, rgba(1, 14, 12, 0.9) 100%);
  border: 1px solid rgba(197, 164, 109, 0.35);
  border-radius: 8px;
  padding: clamp(1.8rem, 4vw, 3rem);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55), inset 0 0 30px rgba(197, 164, 109, 0.05);
  position: relative;
  overflow: hidden;
}

.promise-portrait-monument::before {
  content: "";
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(197, 164, 109, 0.15);
  border-radius: 4px;
  pointer-events: none;
}

.promise-portrait-frame-outer {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 0 auto 2.2rem auto;
  padding: 10px;
  background: linear-gradient(135deg, rgba(197, 164, 109, 0.4) 0%, rgba(6, 78, 70, 0.3) 50%, rgba(197, 164, 109, 0.4) 100%);
  border-radius: 6px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
}

.promise-portrait-frame-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 4px;
  overflow: hidden;
  background: #02120f;
  cursor: pointer;
}

.promise-portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.promise-portrait-frame-inner:hover .promise-portrait-img {
  transform: scale(1.025);
}

.promise-portrait-glow {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 40px rgba(1, 14, 12, 0.6);
  pointer-events: none;
}

.promise-portrait-content {
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
}

.promise-portrait-eyebrow {
  font-family: var(--font-mono-meta);
  font-size: 0.74rem;
  letter-spacing: 0.28em;
  color: var(--gold-antique);
  text-transform: uppercase;
  margin-bottom: 0.8rem;
}

.promise-portrait-title {
  font-family: var(--font-serif-title);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  color: var(--ivory-warm);
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}

.promise-portrait-caption {
  font-family: var(--font-serif-body);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  font-style: italic;
  color: var(--gold-champagne);
  line-height: 1.85;
  margin-bottom: 1.8rem;
}

.promise-portrait-caption p {
  color: var(--gold-champagne);
  margin-bottom: 0.6rem;
}

.promise-portrait-vow {
  color: var(--ivory-warm) !important;
  font-weight: 500;
  padding-top: 0.4rem;
}

.promise-portrait-stamp {
  font-family: var(--font-mono-meta);
  font-size: 0.68rem;
  letter-spacing: 0.25em;
  color: var(--gold-muted);
  text-transform: uppercase;
  border-top: 1px solid rgba(197, 164, 109, 0.2);
  display: inline-block;
  padding-top: 0.8rem;
}
`;

if (!content.includes("promise-portrait-monument")) {
  content += "\n" + monumentCss;
  fs.writeFileSync(cssPath, content, "utf8");
  console.log("Appended promise portrait monument CSS to letter.css");
} else {
  console.log("Already has promise-portrait-monument in letter.css");
}
