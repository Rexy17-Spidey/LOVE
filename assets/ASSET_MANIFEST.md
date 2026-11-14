# THE ART OF HER — ASSET MANIFEST & CURATOR GUIDE
**Exhibition Dedicated to Bhavya · Curated by Rahul**

This document tracks all visual and auditory assets integrated into **THE ART OF HER** digital exhibition, verifying their existence, fallback behavior, and providing straightforward instructions for adding real personal photographs and audio recordings.

---

## 1. Executive Summary

| Category | Total Assets | Present on Disk | Missing / Falling Back | Status |
| :--- | :---: | :---: | :---: | :--- |
| **Vector SVGs (Tier 2 Fallback)** | 16 | 16 | 0 | **100% Valid XML Verified** |
| **High-Res Photographs (Tier 1 JPG)** | 16 | 0 | 16 | **Gracefully Falling Back to SVGs** |
| **Audio Ambiance (MP3)** | 1 | 0 | 1 | **Silent Safe Fallback (No Errors)** |

The website implements a robust **3-Tier Image Loading Architecture**:
1. **Tier 1 (Real Photo)**: If the `.jpg` file is placed in the designated folder, the application automatically loads and displays it seamlessly.
2. **Tier 2 (Vector Masterpiece SVG)**: If the `.jpg` is not found, the website displays the handcrafted celestial emerald vector SVG with zero broken icon indicators.
3. **Tier 3 (CSS Fallback Card)**: If any network or path anomaly occurs, the application renders a styled emerald & antique gold typographic plaque.

---

## 2. Photographic Asset Registry

### Section 2: The Editorial Magazine
| Asset Key | Target JPG File | Fallback SVG File | On Disk? | Exhibition Section |
| :--- | :--- | :--- | :---: | :--- |
| `editorial.coverImage` | `assets/images/editorial/cover.jpg` | `assets/images/editorial/cover.svg` | Fallback Active | Editorial Magazine Cover |
| `editorial.spreads[0]` | `assets/images/editorial/spread-1.jpg` | `assets/images/editorial/spread-1.svg` | Fallback Active | Editorial Feature 1: The Face That Makes Ordinary Days Feel Different |
| `editorial.spreads[1]` | `assets/images/editorial/spread-2.jpg` | `assets/images/editorial/spread-2.svg` | Fallback Active | Editorial Feature 2: Beauty, Without Trying |
| `editorial.spreads[2]` | `assets/images/editorial/spread-3.jpg` | `assets/images/editorial/spread-3.svg` | Fallback Active | Editorial Feature 3: The Architecture of a Smile |

### Section 3: The Museum Sanctuary
| Asset Key | Target JPG File | Fallback SVG File | On Disk? | Exhibition Section |
| :--- | :--- | :--- | :---: | :--- |
| `museum.galleries[0]` | `assets/images/museum/eyes.jpg` | `assets/images/museum/eyes.svg` | Fallback Active | Gallery I: The Eyes |
| `museum.galleries[1]` | `assets/images/museum/smile.jpg` | `assets/images/museum/smile.svg` | Fallback Active | Gallery II: The Smile |
| `museum.galleries[2]` | `assets/images/museum/details.jpg` | `assets/images/museum/details.svg` | Fallback Active | Gallery III: The Little Details |
| `museum.galleries[3]` | `assets/images/black-and-white/bw-portrait.jpg` | `assets/images/black-and-white/bw-portrait.svg` | Fallback Active | Gallery IV: The Black & White Portrait |
| `museum.galleries[4]` | `assets/images/museum/masterpiece.jpg` | `assets/images/museum/masterpiece.svg` | Fallback Active | Gallery V: The Masterpiece (The Complete Portrait) |

### Section 7: The Story of Us (Timeline Chapters)
| Asset Key | Target JPG File | Fallback SVG File | On Disk? | Exhibition Chapter |
| :--- | :--- | :--- | :---: | :--- |
| `storyOfUs.chapters[0]` | `assets/images/memories/chapter-1-staircase.jpg` | `assets/images/memories/chapter-1-staircase.svg` | Fallback Active | Chapter 01: The Staircase & The Unlikely Hello (3rd Floor ASBT) |
| `storyOfUs.chapters[1]` | `assets/images/memories/chapter-2-instagram.jpg` | `assets/images/memories/chapter-2-instagram.svg` | Fallback Active | Interlude: A Little Instagram Highlight (The Alternate Days Song) |
| `storyOfUs.chapters[2]` | `assets/images/memories/chapter-3-burger-spot.jpg` | `assets/images/memories/chapter-3-burger-spot.svg` | Fallback Active | Chapter 02: Amma's Birthday Seva & The Burger-Spot Encounter |
| `storyOfUs.chapters[3]` | `assets/images/memories/chapter-4-engineering-night.jpg` | `assets/images/memories/chapter-4-engineering-night.svg` | Fallback Active | The Night Behind Engineering (With Sathvik & Rebecca) |
| `storyOfUs.chapters[4]` | `assets/images/memories/chapter-5-11-11.jpg` | `assets/images/memories/chapter-5-11-11.svg` | Fallback Active | Chapter 03: 27 September 2026, 11:11 PM ("I LOVE U") |
| `storyOfUs.chapters[5]` | `assets/images/memories/chapter-6-present.jpg` | `assets/images/memories/chapter-6-present.svg` | Fallback Active | Chapter 04: And Then, There Was Us (Everyday Comfort & Inside Jokes) |
| `storyOfUs.chapters[6]` | `assets/images/memories/chapter-7-roads-ahead.jpg` | `assets/images/memories/chapter-7-roads-ahead.svg` | Fallback Active | Chapter 05: The Roads Ahead (Long Drives, Spontaneous Plans, MA QUEEN) |

---

## 3. Audio Asset Registry

| Asset Key | Target File | Formats Supported | On Disk? | Fallback Behavior |
| :--- | :--- | :--- | :---: | :--- |
| `audio.src` | `assets/audio/ambient-piano.mp3` | MP3, M4A, WAV | Missing | Audio player icon stays in muted/ready mode; gracefully handles absence without browser errors |

---

## 4. Instructions for Adding Real Photos & Audio

Whenever you are ready to personalize the exhibition with real photos of Bhavya or of your memories together:

1. **Format and Dimensions**:
   - Editorial & Museum Portraits: Vertical orientation (portrait), recommended ratio 3:4 or 4:5 (e.g., 1200x1600 or 1500x2000).
   - Story Timeline Memory Photos: Horizontal or vertical (e.g., 1200x800 or 1200x1200px).
   - File format: Standard `.jpg` or `.jpeg` files.
2. **File Naming & Placement**:
   - Simply save your photos under the exact filenames listed above:
     - `assets/images/editorial/cover.jpg`
     - `assets/images/editorial/spread-1.jpg`
     - `assets/images/editorial/spread-2.jpg`
     - `assets/images/editorial/spread-3.jpg`
     - `assets/images/museum/eyes.jpg`
     - `assets/images/museum/smile.jpg`
     - `assets/images/museum/details.jpg`
     - `assets/images/black-and-white/bw-portrait.jpg`
     - `assets/images/museum/masterpiece.jpg`
     - `assets/images/memories/chapter-1-staircase.jpg`
     - `assets/images/memories/chapter-2-instagram.jpg`
     - `assets/images/memories/chapter-3-burger-spot.jpg`
     - `assets/images/memories/chapter-4-engineering-night.jpg`
     - `assets/images/memories/chapter-5-11-11.jpg`
     - `assets/images/memories/chapter-6-present.jpg`
     - `assets/images/memories/chapter-7-roads-ahead.jpg`
3. **Audio File**:
   - Place your chosen background piano or ambient song at:
     `assets/audio/ambient-piano.mp3`
4. **Instant Update**:
   - You do **not** need to edit `config.js` or `index.html`. The smart loader automatically detects the JPGs on disk and prioritizes them over the SVGs!
