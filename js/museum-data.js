/**
 * ==============================================================================
 * THE MUSEUM OF HER — EXHIBITION DATA & CURATION CONFIGURATION
 * A Cinematic, Interactive, Personal Digital Museum for Bhavya
 * Curated with love, by Rahul.
 * ==============================================================================
 */

(function(root) {
  const MUSEUM_DATA = {
  meta: {
    title: "THE MUSEUM OF HER",
    subtitle: "An exhibition of someone impossible to describe.",
    introQuote: "Some people are too beautiful to fit inside a photograph. This is my attempt to preserve the little things I notice.",
    curator: "Curated with love, by Rahul",
    subject: "Dedicated to Bhavya",
    dateEstablished: "27.09.2026 · Permanent Exhibition",
    returnUrl: "index.html",
    returnLabel: "Return to Our Little World"
  },

  // ----------------------------------------------------------------------------
  // THE 7 COLOR THEMES
  // ----------------------------------------------------------------------------
  themes: [
    {
      id: "emerald-royale",
      name: "Emerald Royale",
      tagline: "Deep emerald, forest green, antique gold & warm ivory",
      bgBase: "#011412",
      accent: "#C5A46D",
      accentGlow: "rgba(197, 164, 109, 0.4)",
      badgeBg: "rgba(6, 78, 70, 0.45)",
      vars: {
        "--museum-bg": "#011412",
        "--museum-bg-alt": "#032F2A",
        "--museum-bg-surface": "rgba(4, 38, 33, 0.8)",
        "--museum-bg-card": "rgba(6, 78, 70, 0.35)",
        "--museum-border": "rgba(197, 164, 109, 0.28)",
        "--museum-border-accent": "rgba(197, 164, 109, 0.7)",
        "--museum-gold": "#C5A46D",
        "--museum-gold-bright": "#F4E2BB",
        "--museum-text-title": "#FFF9EF",
        "--museum-text-body": "#DCEEE6",
        "--museum-text-muted": "#95B0A6",
        "--museum-accent-glow": "rgba(197, 164, 109, 0.25)",
        "--museum-spotlight": "rgba(8, 127, 120, 0.18)"
      }
    },
    {
      id: "ocean-emerald",
      name: "Ocean Emerald",
      tagline: "Emerald blue, deep teal, aquamarine & soft champagne",
      bgBase: "#011518",
      accent: "#2DE0C6",
      accentGlow: "rgba(45, 224, 198, 0.4)",
      badgeBg: "rgba(5, 76, 84, 0.45)",
      vars: {
        "--museum-bg": "#011518",
        "--museum-bg-alt": "#04333A",
        "--museum-bg-surface": "rgba(4, 42, 48, 0.8)",
        "--museum-bg-card": "rgba(5, 76, 84, 0.35)",
        "--museum-border": "rgba(45, 224, 198, 0.25)",
        "--museum-border-accent": "rgba(244, 226, 187, 0.7)",
        "--museum-gold": "#F4E2BB",
        "--museum-gold-bright": "#FFFFFF",
        "--museum-text-title": "#E8FAFC",
        "--museum-text-body": "#C7EBEF",
        "--museum-text-muted": "#82B2B8",
        "--museum-accent-glow": "rgba(45, 224, 198, 0.25)",
        "--museum-spotlight": "rgba(22, 125, 137, 0.22)"
      }
    },
    {
      id: "midnight-jade",
      name: "Midnight Jade",
      tagline: "Almost-black green, jade, muted silver & pale mint",
      bgBase: "#000B08",
      accent: "#00E5A3",
      accentGlow: "rgba(0, 229, 163, 0.4)",
      badgeBg: "rgba(10, 63, 51, 0.45)",
      vars: {
        "--museum-bg": "#000B08",
        "--museum-bg-alt": "#011712",
        "--museum-bg-surface": "rgba(6, 32, 25, 0.85)",
        "--museum-bg-card": "rgba(10, 63, 51, 0.3)",
        "--museum-border": "rgba(0, 229, 163, 0.2)",
        "--museum-border-accent": "rgba(192, 203, 208, 0.7)",
        "--museum-gold": "#D2F5E3",
        "--museum-gold-bright": "#FFFFFF",
        "--museum-text-title": "#F0FAF5",
        "--museum-text-body": "#C3DFD3",
        "--museum-text-muted": "#7B9E8F",
        "--museum-accent-glow": "rgba(0, 229, 163, 0.2)",
        "--museum-spotlight": "rgba(10, 63, 51, 0.25)"
      }
    },
    {
      id: "botanical",
      name: "Botanical",
      tagline: "Sage green, olive, moss & warm cream",
      bgBase: "#0A120C",
      accent: "#D4AF37",
      accentGlow: "rgba(212, 175, 55, 0.35)",
      badgeBg: "rgba(59, 82, 62, 0.45)",
      vars: {
        "--museum-bg": "#0A120C",
        "--museum-bg-alt": "#162419",
        "--museum-bg-surface": "rgba(20, 36, 23, 0.8)",
        "--museum-bg-card": "rgba(59, 82, 62, 0.35)",
        "--museum-border": "rgba(212, 175, 55, 0.25)",
        "--museum-border-accent": "rgba(212, 175, 55, 0.65)",
        "--museum-gold": "#D4AF37",
        "--museum-gold-bright": "#FFF2B2",
        "--museum-text-title": "#FFFDF5",
        "--museum-text-body": "#DCE6DC",
        "--museum-text-muted": "#96A697",
        "--museum-accent-glow": "rgba(122, 154, 126, 0.25)",
        "--museum-spotlight": "rgba(59, 82, 62, 0.25)"
      }
    },
    {
      id: "arctic-lagoon",
      name: "Arctic Lagoon",
      tagline: "Deep ocean blue, blue-green, sea glass & soft pearl",
      bgBase: "#031018",
      accent: "#7FE5D9",
      accentGlow: "rgba(127, 229, 217, 0.4)",
      badgeBg: "rgba(21, 71, 86, 0.45)",
      vars: {
        "--museum-bg": "#031018",
        "--museum-bg-alt": "#0A2433",
        "--museum-bg-surface": "rgba(9, 33, 46, 0.8)",
        "--museum-bg-card": "rgba(21, 71, 86, 0.35)",
        "--museum-border": "rgba(127, 229, 217, 0.25)",
        "--museum-border-accent": "rgba(167, 236, 238, 0.7)",
        "--museum-gold": "#A7ECEE",
        "--museum-gold-bright": "#F0F8FF",
        "--museum-text-title": "#F0F8FF",
        "--museum-text-body": "#CEE2EB",
        "--museum-text-muted": "#7A9EAF",
        "--museum-accent-glow": "rgba(127, 229, 217, 0.25)",
        "--museum-spotlight": "rgba(24, 78, 89, 0.25)"
      }
    },
    {
      id: "celestial-blue",
      name: "Celestial Blue",
      tagline: "Midnight blue, dusty blue, icy turquoise & silver",
      bgBase: "#040912",
      accent: "#4DD0E1",
      accentGlow: "rgba(77, 208, 225, 0.4)",
      badgeBg: "rgba(30, 62, 98, 0.45)",
      vars: {
        "--museum-bg": "#040912",
        "--museum-bg-alt": "#0B192C",
        "--museum-bg-surface": "rgba(11, 25, 44, 0.8)",
        "--museum-bg-card": "rgba(30, 62, 98, 0.35)",
        "--museum-border": "rgba(77, 208, 225, 0.25)",
        "--museum-border-accent": "rgba(224, 229, 236, 0.7)",
        "--museum-gold": "#E0E5EC",
        "--museum-gold-bright": "#FFFFFF",
        "--museum-text-title": "#F1F6F9",
        "--museum-text-body": "#CBDCEB",
        "--museum-text-muted": "#7590AB",
        "--museum-accent-glow": "rgba(77, 208, 225, 0.25)",
        "--museum-spotlight": "rgba(30, 62, 98, 0.25)"
      }
    },
    {
      id: "soft-sea-glass",
      name: "Soft Sea Glass",
      tagline: "Pale aqua, muted turquoise, misty green & warm ivory",
      bgBase: "#071517",
      accent: "#B8E0D2",
      accentGlow: "rgba(184, 224, 210, 0.4)",
      badgeBg: "rgba(36, 88, 93, 0.45)",
      vars: {
        "--museum-bg": "#071517",
        "--museum-bg-alt": "#112E31",
        "--museum-bg-surface": "rgba(16, 43, 46, 0.8)",
        "--museum-bg-card": "rgba(36, 88, 93, 0.35)",
        "--museum-border": "rgba(184, 224, 210, 0.25)",
        "--museum-border-accent": "rgba(255, 251, 240, 0.7)",
        "--museum-gold": "#B8E0D2",
        "--museum-gold-bright": "#FFFBF0",
        "--museum-text-title": "#FFFBF0",
        "--museum-text-body": "#D4E8E3",
        "--museum-text-muted": "#8AA6A0",
        "--museum-accent-glow": "rgba(94, 156, 160, 0.25)",
        "--museum-spotlight": "rgba(36, 88, 93, 0.22)"
      }
    }
  ],

  // ----------------------------------------------------------------------------
  // THE 8 EXHIBITION ROOMS
  // ----------------------------------------------------------------------------
  rooms: [
    {
      id: "room-00",
      number: "ROOM 00",
      roman: "PROLOGUE",
      title: "Before the Exhibition Begins",
      subtitle: "EXHIBITION PROLOGUE · AN OPEN LETTER",
      paragraphs: [
        "I could have filled this place with a thousand photographs, but none of them would explain everything I notice about you.",
        "So instead, I made a little museum.",
        "Not to define you.",
        "Just to preserve the things that make you, you."
      ],
      heroExhibit: {
        image: "assets/images/optimized/editorial_cover_floral.jpg",
        fallback: "assets/images/editorial/cover.svg",
        title: "The Serene Poise",
        date: "First Semester Collection",
        medium: "Natural Sunlight · Floral Dress Portrait",
        caption: "The quiet elegance that started this entire exhibition.",
        curatorNote: "The first photograph that reminded me how effortless real beauty is."
      }
    },

    {
      id: "room-01",
      number: "ROOM 01",
      roman: "WING I",
      title: "The Face I Could Never Get Tired Of",
      subtitle: "CENTRAL SALON · HERO PORTRAIT EXHIBIT",
      intro: "Every great museum possesses a single centerpiece—the artwork visitors stop in front of and simply gaze at in silence.",
      heroExhibit: {
        image: "assets/images/optimized/museum_masterpiece_playful_bw.jpg",
        fallback: "assets/images/museum/masterpiece.svg",
        title: "The Masterpiece",
        date: "Private Archive · Permanent Collection",
        medium: "Monochrome Silver Gelatin · Candid Expression",
        caption: "If someone asked me to describe beauty, I would probably stop trying to find the right words and show them this.",
        curatorNote: "I could look at this photograph for hours and still notice something new. The warmth in your eyes, the spontaneous smile, the natural light—everything about it is effortless.",
        inscription: "EXHIBIT NO. 01 · PERMANENT MASTERPIECE MONUMENT"
      }
    },

    {
      id: "room-02",
      number: "ROOM 02",
      roman: "WING II",
      title: "A Thousand Little Details",
      subtitle: "MICRO-OBSERVATIONS · THE LITTLE THINGS",
      intro: "A museum shouldn't only look at the big picture. Sometimes the most unforgettable things live in the quietest, smallest corners.",
      exhibits: [
        {
          id: "detail-eyes",
          title: "Her Eyes",
          image: "assets/images/optimized/museum_eyes_intimate.jpg",
          fallback: "assets/images/museum/eyes.svg",
          tag: "FOCUS & DEPTH",
          caption: "Somewhere between a glance and a smile, you became my favourite view.",
          curatorNote: "There is a gentle depth in your eyes that always calms me down, no matter what kind of day I've had."
        },
        {
          id: "detail-smile",
          title: "Her Smile",
          image: "assets/images/optimized/museum_smile_warmth.jpg",
          fallback: "assets/images/museum/smile.svg",
          tag: "WARMTH & LIGHT",
          caption: "The kind of smile that quietly disarms everything around it.",
          curatorNote: "You have a smile that lights up the whole room before you even realize you're smiling."
        },
        {
          id: "detail-profile",
          title: "Her Gentle Profile",
          image: "assets/images/optimized/museum_profile_grace.jpg",
          fallback: "assets/images/museum/details.svg",
          tag: "SERENITY",
          caption: "Even the little expressions you probably never notice have their own place here.",
          curatorNote: "Caught in thought, looking away, completely unposed and completely captivating."
        },
        {
          id: "detail-playful",
          title: "Her Playful Spirit",
          image: "assets/images/optimized/museum_monochrome_hearts.jpg",
          fallback: "assets/images/black-and-white/bw-portrait.svg",
          tag: "MISCHIEF & CHARM",
          caption: "The spontaneous, teasing spark that turns any regular moment into an adventure.",
          curatorNote: "Your teasing remarks and that tiny smirk when you know you've caught me off guard."
        },
        {
          id: "detail-radiance",
          title: "The Unscripted Radiance",
          image: "assets/images/optimized/editorial_spread_green_jersey.jpg",
          fallback: "assets/images/editorial/spread-2.svg",
          tag: "NATURAL POISE",
          caption: "Completely natural, completely you. No poses, no rehearsals.",
          curatorNote: "One of my absolute favourite casual portraits. Just pure, unfiltered Bhavya."
        },
        {
          id: "detail-laugh",
          title: "The Candid Laugh",
          image: "assets/images/optimized/timeline_interlude_candid_blush.jpg",
          fallback: "assets/images/memories/chapter-2-instagram.svg",
          tag: "UNFILTERED JOY",
          caption: "Mid-laugh with your eyes squeezed shut and head tilted back.",
          curatorNote: "Hearing you laugh like this completely shifts my mood, every single time."
        }
      ]
    },

    {
      id: "room-03",
      number: "ROOM 03",
      roman: "WING III",
      title: "Every Version of You",
      subtitle: "EDITORIAL GALLERY · CURATED EXPRESSIONS",
      intro: "You are never just one thing. You are a dozen different people in a single afternoon—and I find every single version of you impossible to stop admiring.",
      moodGroups: [
        {
          title: "The Soft Smile",
          tagline: "Golden festive lights & quiet evening glow",
          primary: {
            image: "assets/images/optimized/editorial_spread_evening_lights.jpg",
            fallback: "assets/images/editorial/spread-1.svg",
            caption: "Golden festive lights near the burger spot — waving across the crowd.",
            curatorNote: "That ridiculous wave across the crowd that made me smile for the rest of the night."
          },
          secondary: {
            image: "assets/images/optimized/call_memory_06_soft_smile.jpg",
            fallback: "assets/images/memories/chapter-6-present.svg",
            caption: "Late evening video call lamp glow.",
            curatorNote: "A quiet moment in the middle of a long week where everything felt calm."
          }
        },
        {
          title: "The Playful One",
          tagline: "Teasing remarks & unrestrained laughter",
          primary: {
            image: "assets/images/optimized/call_memory_02_playful_smirk.jpg",
            fallback: "assets/images/memories/chapter-3-burger-spot.svg",
            caption: "Resting chin on hand with that little knowing smirk right after teasing me.",
            curatorNote: "You love throwing a playful remark and then watching my reaction with this exact expression."
          },
          secondary: {
            image: "assets/images/optimized/call_memory_01_laughter.jpg",
            fallback: "assets/images/memories/chapter-4-engineering-night.svg",
            caption: "Unrestrained late-night laughter.",
            curatorNote: "I remember looking at you laughing like this and thinking, 'I hope I get to hear this every single day.'"
          }
        },
        {
          title: "The Quiet Moments",
          tagline: "Pensive elegance & comfortable silences",
          primary: {
            image: "assets/images/optimized/editorial_spread_white_coat.jpg",
            fallback: "assets/images/editorial/spread-3.svg",
            caption: "Sophisticated winter overcoat editorial portrait.",
            curatorNote: "Like a spread straight out of Vogue, but warmer and infinitely more genuine."
          },
          secondary: {
            image: "assets/images/optimized/call_memory_03_chin_in_palm.jpg",
            fallback: "assets/images/memories/chapter-1-staircase.svg",
            caption: "Chin in palm with the penguin plushie.",
            curatorNote: "These were the calls where we didn't even need to speak constantly. Just having you on my screen was enough."
          }
        },
        {
          title: "The Candid Beauty",
          tagline: "Unposed reflection & effortless poise",
          primary: {
            image: "assets/images/optimized/editorial_spread_mirror_selfie.jpg",
            fallback: "assets/images/editorial/spread-2.svg",
            caption: "Poised, effortless and radiant, caught in a casual mirror reflection.",
            curatorNote: "Even a mirror selfie looks like high editorial fashion when it's you."
          }
        },
        {
          title: "The Unforgettable Expressions",
          tagline: "Attentive listening & dramatic storytelling",
          primary: {
            image: "assets/images/optimized/call_memory_04_intimate_gaze.jpg",
            fallback: "assets/images/memories/chapter-5-11-11.svg",
            caption: "Looking directly into the camera with gentle, attentive eyes while listening.",
            curatorNote: "Nobody has ever listened to me the way you do. You make me feel completely heard."
          },
          secondary: {
            image: "assets/images/optimized/call_memory_05_animated_story.jpg",
            fallback: "assets/images/memories/chapter-6-present.svg",
            caption: "Wide eyes, animated gestures recounting an absurd story.",
            curatorNote: "You are the most entertaining storyteller. I could listen to you narrate mundane trips for hours."
          }
        }
      ]
    },

    {
      id: "room-04",
      number: "ROOM 04",
      roman: "WING IV",
      title: "Beauty Without Colour",
      subtitle: "SPECIAL SALON · BLACK & WHITE ARCHIVE",
      intro: "When you remove all the colour from a photograph, all that remains is light, shadows, and the purest truth of someone's expression.",
      mainMonochrome: {
        image: "assets/images/black-and-white/bw-portrait.jpg",
        fallback: "assets/images/black-and-white/bw-portrait.svg",
        title: "Beauty Without Colour",
        caption: "Of all the photographs I have of you, this one has a place I cannot quite explain. Perhaps some things become more beautiful when the world goes quiet.",
        inscription: "35MM SILVER GELATIN PRINT · ARCHIVAL EXHIBIT",
        curatorNote: "There is no distraction here. No background colours, no bright clothes. Just your face, the soft lighting, and an expression that feels completely timeless."
      },
      companions: [
        {
          image: "assets/images/optimized/museum_monochrome_closeup.jpg",
          fallback: "assets/images/black-and-white/bw-portrait.svg",
          title: "The Quiet Gaze",
          caption: "A close-up study in quiet confidence and soft shadows.",
          curatorNote: "Intimate and calm. A photograph that speaks without saying a word."
        },
        {
          image: "assets/images/optimized/museum_monochrome_hearts.jpg",
          fallback: "assets/images/black-and-white/bw-portrait.svg",
          title: "The Whimsical Note",
          caption: "Even in black and white, your playful spirit cannot be hidden.",
          curatorNote: "That signature tilt of your head and the playful energy that always makes me smile."
        }
      ]
    },

    {
      id: "room-05",
      number: "ROOM 05",
      roman: "WING V",
      title: "Moments Worth Keeping",
      subtitle: "PRIVATE VAULT · CHRONOLOGICAL CASSETTES",
      intro: "These are the snapshots, the quiet keepsakes, and the moments that slipped by almost unnoticed—now given their own permanent exhibition space.",
      categories: ["All", "Portraits", "Candids", "Video Calls"],
      archive: [
        {
          id: "arch-1",
          category: "Portraits",
          title: "The First Semester Portrait",
          date: "Autumn 2026",
          image: "assets/images/optimized/timeline_interlude_phone_call.jpg",
          fallback: "assets/images/memories/chapter-1-staircase.svg",
          caption: "A quiet portrait from our first semester — the gentle presence that caught my attention."
        },
        {
          id: "arch-2",
          category: "Candids",
          title: "The Evening Glow",
          date: "Amma's Birthday",
          image: "assets/images/optimized/editorial_spread_evening_lights.jpg",
          fallback: "assets/images/editorial/spread-1.svg",
          caption: "Waving enthusiastically across the crowd near the burger spot."
        },
        {
          id: "arch-3",
          category: "Portraits",
          title: "The Mirror Silhouette",
          date: "October 2026",
          image: "assets/images/optimized/editorial_spread_mirror_selfie.jpg",
          fallback: "assets/images/editorial/spread-2.svg",
          caption: "Poised and radiant, captured in a private reflection."
        },
        {
          id: "arch-4",
          category: "Portraits",
          title: "Winter Overcoat Editorial",
          date: "November 2026",
          image: "assets/images/optimized/editorial_spread_white_coat.jpg",
          fallback: "assets/images/editorial/spread-3.svg",
          caption: "Sophisticated luxury editorial composition in soft light."
        },
        {
          id: "arch-5",
          category: "Video Calls",
          title: "The 1:40 AM Goodnight",
          date: "Late Night Screen",
          image: "assets/images/optimized/call_memory_07_before_goodnight.jpg",
          fallback: "assets/images/memories/chapter-7-roads-ahead.svg",
          caption: "Sleepy tender expression right before finally giving in and hitting the red button."
        },
        {
          id: "arch-6",
          category: "Candids",
          title: "Staircase Sunlight",
          date: "First Interaction",
          image: "assets/images/optimized/timeline_interlude_soft_profile.jpg",
          fallback: "assets/images/memories/chapter-1-staircase.svg",
          caption: "Gentle profile under the afternoon sun from Engineering to ASBT."
        },
        {
          id: "arch-7",
          category: "Video Calls",
          title: "Mid-Call Hysteria",
          date: "Unfiltered Joy",
          image: "assets/images/optimized/call_memory_01_laughter.jpg",
          fallback: "assets/images/memories/chapter-2-instagram.svg",
          caption: "Mid-laugh with eyes squeezed shut and head tilted back."
        },
        {
          id: "arch-8",
          category: "Portraits",
          title: "The Green Foliage Dress",
          date: "Cover Collection",
          image: "assets/images/optimized/editorial_cover_floral.jpg",
          fallback: "assets/images/editorial/cover.svg",
          caption: "Serene pose surrounded by natural green foliage."
        }
      ]
    },

    {
      id: "room-06",
      number: "ROOM 06",
      roman: "WING VI",
      title: "Things I Notice About You",
      subtitle: "HANDWRITTEN MEMOIRS · RAHUL'S ARCHIVE NOTES",
      intro: "A museum curator doesn't just hang pictures on a wall. They write down why each piece matters. These are five handwritten observations I wrote down late at night.",
      notes: [
        {
          number: "01",
          heading: "The Ordinary Conversations",
          text: "The way an ordinary conversation with you about everyday college life, homework, or mundane grocery shopping somehow becomes the absolute best part of my entire day.",
          signature: "Observation No. 01 · 01:20 AM"
        },
        {
          number: "02",
          heading: "The Unconscious Expressions",
          text: "The little expressions you make without realising—the way you bite your lip when concentrating, or fold your fingers nervously when we sat behind the Engineering block.",
          signature: "Observation No. 02 · Campus Archive"
        },
        {
          number: "03",
          heading: "The Disarming Smile",
          text: "The smile that makes me lose my train of thought mid-sentence and completely forget whatever point I was trying to make.",
          signature: "Observation No. 03 · Permanent Effect"
        },
        {
          number: "04",
          heading: "The Comfortable Silence",
          text: "How even a quiet moment sitting together on a video call without saying a single word feels warmer and safer than any loud party in the world.",
          signature: "Observation No. 04 · Midnight Call Note"
        },
        {
          number: "05",
          heading: "The Secretly Saved Keepsakes",
          text: "The photographs I save secretly in a private folder because I know on a difficult or exhausting day, opening them and seeing your smile will quietly fix everything.",
          signature: "Observation No. 05 · Personal Vault"
        }
      ],
      secretDiscovery: {
        badge: "✦ A SECRET CURATOR'S NOTE",
        teaser: "Tap to break the wax seal (For Bhavya's eyes only)",
        title: "To Bhavya, from Rahul",
        message: "If you're reading this, you found the hidden note. I just wanted to tell you: no matter how many museums or websites I build, the real masterpiece is simply having you in my life. You make every ordinary day feel like art. I love you, my babee. ♡"
      }
    },

    {
      id: "room-07",
      number: "ROOM 07",
      roman: "EPILOGUE",
      title: "The Person Behind Every Exhibition",
      subtitle: "THE UNFINISHED MONUMENT · PERMANENT DEDICATION",
      intro: "This is the final room of the museum, but not the final chapter of our story.",
      coupleExhibit: {
        image: "assets/images/optimized/promise_beside_you_couple.jpg",
        fallback: "assets/images/memories/chapter-7-roads-ahead.svg",
        title: "Beside You, Always",
        caption: "Rahul & Bhavya · Side by Side · Ready for every road ahead.",
        date: "27 September 2026 onwards · Forever",
        medium: "Permanent Monument · Archival Couple Portrait"
      },
      closingVows: [
        "I started this museum because I wanted to show you how I see you.",
        "But somewhere along the way, I realised that no exhibition could ever be complete.",
        "There will always be another expression, another photograph, another little moment I wish I could preserve.",
        "So this museum will always remain unfinished.",
        "Because I am still discovering you."
      ],
      closingDeclaration: "END OF EXHIBITION. NEVER THE END OF ADMIRING YOU.",
      returnOptions: [
        {
          label: "✦ RETURN TO OUR LITTLE WORLD ✦",
          url: "index.html",
          isPrimary: true
        },
        {
          label: "↺ Walk Through The Museum Again",
          url: "#room-00",
          isPrimary: false
        },
        {
          label: "💌 Read Rahul's Letter",
          url: "index.html#letter",
          isPrimary: false
        }
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // AUDIO CONFIGURATION
  // ----------------------------------------------------------------------------
  audio: {
    enabled: true,
    autoplay: false,
    src: "assets/audio/ambient-piano.mp3",
    label: "Museum Ambient Sound",
    volume: 0.35,
    fallbackSynth: true // Uses Web Audio API if local mp3 is not present!
  }
};

  if (typeof module !== "undefined" && module.exports) {
    module.exports = MUSEUM_DATA;
  }
  if (typeof root !== "undefined") {
    root.MUSEUM_DATA = MUSEUM_DATA;
  }
})(typeof window !== "undefined" ? window : globalThis);

