# THE ART OF HER
### *An exhibition of someone impossible to describe.*
**Curated with love for Bhavya by Rahul**

---

## Welcome to the Master Storytelling Edition

**THE ART OF HER** is a bespoke, cinematic romantic digital experience that brings Rahul and Bhavya's real relationship story to life with deep personal authenticity, natural humor, and editorial elegance.

This edition integrates:
1. **The Opening (A Universe of Her)**: Fullscreen celestial starfield revealing Bhavya's constellation and name.
2. **The Editorial (The Art of Being Her)**: High-fashion magazine publication (*The Bhavya Edition*), featuring **The Special Messi Highlight** and Rahul's personal observations (her nose as his favourite feature, her voice, eyes, forehead, hair, and her freedom to bloom).
3. **The Museum (The Museum of You)**: Curatorial chambers including the **Gallery IV Black & White Masterpiece Centerpiece** and the secret **EXHIBIT CBBG Archival Vault**.
4. **Things You Probably Don't Know I Notice**: 8 interactive discovery cards (her soft voice, shy expressions, her nose, radiant smile, nervous fidgeting hands behind Engineering, and her playful pinching & beating).
5. **The Constellation (The Constellation of Her)**: Real **Three.js WebGL 3D Universe** with depth layers (1,500 twinkling stars and nebula dust), 12 glowing 3D star spheres with halos and orbiting rings, dynamic 3D constellation lines, smooth camera fly-to focus, quick star selector, reset sky view button, and transition bridge.
6. **The Garden (The Garden of Bhavya)**: Living **Three.js WebGL 3D Enchanted Arboretum** featuring rolling green terrain, river stone pathway, lotus pond with swimming golden koi, arched wooden bridge, forest trees, central Tree of Little Things, 12 distinct 3D flowers that bloom when clicked, 12 animated 3D butterflies with realistic wing flapping, and living wildlife (hopping rabbits, distant deer, gliding birds, and pulsing fireflies). Includes 4 camera viewpoints: Grand Vista, Lotus Pond & Bridge, Flower Meadow, and Tree of Little Things.
7. **The Story of Us (The Complete Unabridged Relationship Story)**:
   - Long-form editorial memoir with a **Reading Progress Indicator** and quick chapter jumper.
   - Chapter One: The Afternoon We First Spoke (ASBT 3rd floor, coding questions, soft-spoken shy presence).
   - An Unforgettable Highlight: The Instagram follow request, exploring highlights, the song vibe revisited alternate days.
   - Chapter Two: The Evening at Amma's Birthday (ditching seva for food, Sathvik wishing for a girl, spotting Bhavya near the burger spot, ridiculous enthusiastic waves, Instagram DM, waiting 5 minutes, WhatsApp text, *"Yaa, we are coming down."*).
   - The Night Behind Engineering: Four People, One Beautiful Night (Rebecca & Sathvik teasing, Rudra conversation, sitting near the small canteen behind Engineering Block, fidgeting hands, talking more than ever before, one of the best nights of life).
   - Chapter Three: 27 September, 11:11 PM (Late-night call, falling asleep, waking up, calling back around 11:11 PM, confessing first: **"I LOVE U."** with animated celestial clock).
   - Chapter Four: And Then, There Was Us (Learning each other, comfort on ordinary days, sleepy calls, silly arguments).
   - Chapter Five: The Roads We Have Not Travelled Yet (Road trips, long drives, parents, growing through love and patience, **MA QUEEN. ♡**).
   - Epilogue Grand Finale: `27.09.2026 · TO MY BHAVYA, MAY WE NEVER RUN OUT OF TOMORROWS. And if life gives us a thousand chapters, I hope every single one has you in it. ∞ ♡`.
8. **My Promise (The Kind of Love I Want to Give You)**: Rahul's dedicated personal letter on ivory parchment with a wax seal, promising care, comfort, listening, respecting boundaries, and walking beside her at her own pace without pressure or debt.
9. **Global Motion & Image Engine**: Lenis smooth scrolling with natural momentum, scroll-triggered reveals without layout jump or section trapping, and guaranteed zero broken image icons with immediate SVG gold filigree plaque fallbacks and smart JPG loading.

---

## 1. Project Directory Structure

```
the-art-of-her/
├── index.html                   # Main exhibition single-page application
├── config.js                    # Central data configuration (Story, compliments, photos, dates)
├── README.md                    # Project documentation & instructions
├── css/
│   ├── variables.css            # Emerald & gold design tokens, fonts, transitions
│   ├── base.css                 # Editorial typography, gilded scrollbar, gold gradients & resets
│   ├── components.css           # Sticky glass header, monogram, audio control, mobile drawer, lightbox
│   ├── opening.css              # Fullscreen celestial starfield & sequenced title reveal
│   ├── editorial.css            # Fashion magazine cover, feature spreads, Messi highlight & observations
│   ├── museum.css               # Velvet walls, warm gold spotlights, master frame & Exhibit CBBG vault
│   ├── noticing.css             # "Things You Probably Don't Know I Notice" interactive cards
│   ├── constellation.css        # Interactive starchart, glowing nodes & dedication cards
│   ├── garden.css               # Golden fireflies canvas, Tree of Little Things & 12 blooms
│   ├── timeline.css             # Long-form editorial memoir, reading progress bar & 11:11 clock
│   └── letter.css               # Ivory parchment letter, 3D wax seal & signature
├── js/
│   ├── lenis.min.js             # Lenis v1.0.42 smooth scrolling engine
│   ├── three.min.js             # Three.js r128 WebGL 3D graphics library
│   ├── audio.js                 # Optional ambient audio controller (strictly NO autoplay)
│   ├── opening.js               # Canvas star particles & opening animation sequence
│   ├── editorial.js             # Magazine 3D tilt interaction, spreads, Messi highlight & observations
│   ├── museum.js                # Gallery tabs filter, artwork modal & Exhibit CBBG vault
│   ├── noticing.js              # "Things You Probably Don't Know I Notice" card interactions
│   ├── constellation-3d.js      # Three.js 3D Constellation Universe (12 stars, flying camera)
│   ├── constellation.js         # 2D Starchart fallback engine
│   ├── garden-3d.js             # Three.js 3D Living Enchanted Garden (pond, koi, bridge, butterflies, flowers)
│   ├── garden.js                # Tree of Little Things leaves & 12 interactive flower cards
│   ├── timeline.js              # Long-form relationship story renderer & reading progress tracker
│   └── main.js                  # App orchestrator, Lenis init, navigation & smart image engine
└── assets/
    ├── audio/                   # Drop your ambient track here (e.g. ambient-piano.mp3)
    ├── fonts/                   # Local fonts (Google Fonts are also linked in index.html)
    └── images/
        ├── editorial/           # Magazine cover & feature spreads
        ├── museum/              # Gallery I, II, III, V artwork portraits
        ├── black-and-white/     # Gallery IV: The Black & White Masterpiece
        ├── memories/            # Chapters 1 to 7 relationship photographs
        └── README.md            # Detailed photograph specifications guide
```

---

## 2. How to Preview the Website Locally

1. Open your Windows File Explorer and navigate to:
   `c:\Users\rahul\Desktop\LOVE\the-art-of-her\`
2. **Double-click `index.html`**. It will open directly in Google Chrome, Microsoft Edge, Firefox, or Safari!
3. Alternatively, open PowerShell in `the-art-of-her` and run:
   ```powershell
   Start-Process index.html
   ```

---

## 3. How to Replace Photographs

The website includes **16 custom-designed, gilded emerald SVG placeholders** with gold star monograms, aspect ratios, and frame labels. There are **zero broken image icons**.

When you are ready to drop in your real photographs of Bhavya:
1. Save your photos into the appropriate folders under `assets/images/`:
   - `assets/images/editorial/cover.jpg` (Magazine front cover)
   - `assets/images/editorial/spread-1.jpg`, `spread-2.jpg`, `spread-3.jpg` (Editorial spreads)
   - `assets/images/museum/eyes.jpg` (Gallery I: Her Eyes)
   - `assets/images/museum/smile.jpg` (Gallery II: That Smile)
   - `assets/images/museum/details.jpg` (Gallery III: The Little Details)
   - `assets/images/black-and-white/bw-portrait.jpg` (**The B&W Masterpiece Centerpiece**)
   - `assets/images/museum/masterpiece.jpg` (Gallery V: The Masterpiece)
   - `assets/images/memories/chapter-1-staircase.jpg` (Chapter 1: The Staircase)
   - `assets/images/memories/chapter-2-instagram.jpg` (Chapter 2: The Instagram Follow)
   - `assets/images/memories/chapter-3-burger-spot.jpg` (Chapter 3: The Burger Spot)
   - `assets/images/memories/chapter-4-engineering-night.jpg` (Chapter 4: The Night Behind Engineering)
   - `assets/images/memories/chapter-5-11-11.jpg` (Chapter 5: 27 September, 11:11 PM Confession)
   - `assets/images/memories/chapter-6-present.jpg` (Chapter 6: And Then, There Was Us)
   - `assets/images/memories/chapter-7-roads-ahead.jpg` (Chapter 7: The Roads Ahead)
2. Refresh `index.html` in your browser. The site immediately displays your real photographs!
3. If an image is missing, the site automatically falls back to the gilded SVG placeholder.

---

## 4. How to Edit Personal Content (`config.js`)

All personal words, dates, compliments, and captions are central in **`config.js`**. You never need to touch HTML or CSS to change text.

Key areas you can customize:
- `meta`: Project titles, names, dates (`27 September 2026`, `11:11 PM`).
- `editorial.messiHighlight`: The special Messi quote and humorous annotation.
- `editorial.observations`: Notes on her nose, voice, eyes, forehead, and freedom to bloom.
- `museum.cbbgExhibit`: The secret memory vault for **Exhibit CBBG**—fill in the true meaning whenever you are ready!
- `thingsINotice`: The 8 playful cards including her pinching and playfully beating you.
- `constellation.stars`: The 12 star coordinates and tributes.
- `garden`: The Tree of Little Things leaves and 12 glowing flower compliments.
- `storyOfUs.chapters`: The complete long-form relationship narrative, paragraphs, and Rahul's memory notes.
- `kindOfLove`: The dedicated personal promise letter.
- `audio`: Ambient track path and volume (strictly opt-in, no autoplay).
