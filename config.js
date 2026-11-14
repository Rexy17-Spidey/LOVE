/**
 * ==============================================================================
 * THE ART OF HER — EXHIBITION CONFIGURATION
 * ==============================================================================
 * Dedicated to Bhavya. Written and curated by Rahul.
 * 
 * Contains the complete, authentic relationship story, genuine observations,
 * 3D constellation tributes, living garden memories, and photo paths.
 * ==============================================================================
 */

window.EXHIBITION_CONFIG = {
  // ----------------------------------------------------------------------------
  // CORE METADATA
  // ----------------------------------------------------------------------------
  meta: {
    recipientName: "Bhavya",
    recipientMonogram: "B",
    authorName: "Rahul",
    curatorTitle: "A Curated Exhibition for Bhavya",
    projectTitle: "THE ART OF HER",
    tagline: "Some things are too beautiful to be described. They can only be experienced.",
    subtitle: "An exhibition of someone impossible to describe.",
    confessionDate: "27 September 2026",
    confessionTime: "11:11 PM",
    anniversaryStamp: "27.09.2026",
    location: "A Private Celestial Sanctuary"
  },

  // ----------------------------------------------------------------------------
  // NAVIGATION BAR
  // ----------------------------------------------------------------------------
  navigation: [
    { id: "opening", roman: "00", label: "Prologue", href: "#opening" },
    { id: "editorial", roman: "01", label: "The Editorial", href: "#editorial" },
    { id: "museum", roman: "02", label: "The Museum", href: "#museum" },
    { id: "noticing", roman: "03", label: "Little Things", href: "#noticing" },
    { id: "constellation", roman: "04", label: "3D Universe", href: "#constellation" },
    { id: "garden", roman: "05", label: "3D Garden", href: "#garden" },
    { id: "timeline", roman: "06", label: "Story of Us", href: "#timeline" },
    { id: "calls", roman: "07", label: "Our Calls", href: "#calls" },
    { id: "letter", roman: "08", label: "My Promise", href: "#letter" }
  ],

  // ----------------------------------------------------------------------------
  // SECTION 1: THE OPENING (A Universe of Her)
  // ----------------------------------------------------------------------------
  opening: {
    preludeQuote: "Somewhere among all the stars, there is one person who makes the entire universe feel a little less extraordinary.",
    title: "THE ART OF HER",
    secondaryTagline: "A collection of things I find beautiful about you.",
    enterButtonText: "ENTER THE EXHIBITION",
    scrollHint: "Narrated with love by Rahul · Scroll to experience",
    constellationLetters: "BHAVYA"
  },

  // ----------------------------------------------------------------------------
  // SECTION 2: THE EDITORIAL (The Art of Being Her)
  // ----------------------------------------------------------------------------
  editorial: {
    magazineName: "THE BHAVYA EDITION",
    issueTag: "EXCLUSIVE COMMEMORATIVE EDITION · VOL. I",
    season: "AUTUMN ARCHIVE",
    coverTagline: "An entire universe in one smile.",
    coverLines: [
      {
        tag: "COVER STORY",
        headline: "THE FACE THAT MAKES ORDINARY DAYS FEEL DIFFERENT",
        sub: "A study in effortless grace and quiet radiance."
      },
      {
        tag: "EDITORIAL ESSAY",
        headline: "BEAUTY, WITHOUT TRYING",
        sub: "On the rare elegance of someone who never needs to perform."
      },
      {
        tag: "SPECIAL FEATURE",
        headline: "THE ARCHITECTURE OF A SMILE",
        sub: "Why one shy gesture stays in mind forever."
      }
    ],
    coverImage: {
      src: "assets/images/optimized/editorial_cover_floral.jpg",
      realSrc: "assets/images/optimized/editorial_cover_floral.jpg",
      caption: "Cover Study · Light, shadow, and the effortless floral elegance of Bhavya."
    },

    // The Prominent Special Messi Highlight (Part 4)
    messiHighlight: {
      tag: "THE HIGHEST PRAISE",
      badge: "EXCLUSIVE COMMENTARY",
      primaryQuote: "“You’re soooo beautiful, pretty, gorgeous.”",
      secondaryQuote: "“I can see you in front of Messi instead of watching Messi that muchhhhh.”",
      annotation: "Apparently, even football has competition.",
      authorMark: "— Rahul, with complete sincerity"
    },

    // Rahul's actual observations about Bhavya
    observations: [
      {
        feature: "Her Nose",
        badge: "RAHUL'S FAVOURITE",
        headline: "My Absolute Favourite Feature",
        description: "Of every detail on your face, your nose is hands down my favourite. It has this adorable, delicate charm that makes every expression—especially when you are thinking or reacting—so sweet to watch."
      },
      {
        feature: "Her Voice",
        badge: "CALMING TONE",
        headline: "The Voice That Sets Me At Ease",
        description: "Soft-spoken, gentle, and soothing. From that very first afternoon on the third floor of the ASBT building, your voice had this quiet warmth that immediately made me want to listen."
      },
      {
        feature: "Her Eyes & Forehead",
        badge: "QUIET HONESTY",
        headline: "Expressive & Unfiltered",
        description: "Your eyes hold an honesty that needs no explanation. Along with the sweet elegance of your forehead and hair, they frame a face that makes ordinary days feel completely different."
      },
      {
        feature: "Her Hands & Gestures",
        badge: "ENDURING HABITS",
        headline: "The Fidgeting Hands I Love",
        description: "The way your hands fold and fidget when you get a little shy or nervous, just like that unforgettable night sitting near the canteen behind Engineering."
      },
      {
        feature: "Her Soft-Spoken & Shy Nature",
        badge: "GENUINE INNOCENCE",
        headline: "Endearing Without Effort",
        description: "In a world that is constantly loud, your softness is what stands out. Your shyness isn't hesitation; it's a rare innocence and authenticity that I cherish deeply."
      },
      {
        feature: "Her Freedom To Bloom",
        badge: "MY PROMISE",
        headline: "Free To Be Whoever You Wish To Be",
        description: "I love who you are, and I want you to always feel free to grow, change, explore your passions, and become whoever you wish to be. I am here to walk beside you, always."
      }
    ],

    contents: [
      { page: "04", title: "The Essence", desc: "The way you speak so gently, without ever needing to be loud." },
      { page: "12", title: "The Expressions", desc: "Unrehearsed candids and the sweet geometry of laughter." },
      { page: "18", title: "Things I Notice", desc: "The little mannerisms only someone paying close attention notices." },
      { page: "26", title: "The Story of Us", desc: "From a staircase conversation to a lifetime of shared roads." }
    ],
    spreads: [
      {
        id: "spread-1",
        label: "FEATURE SPREAD I",
        headline: "Under Warm Evening Lights",
        subhead: "Photographic study on evening calm and quiet radiance",
        pullQuote: "“Beauty that doesn't need the spotlight to shine.”",
        text: "There is an effortless peace in this photograph. Captured under the soft golden glow of evening lights, leaning on your hand with an unguarded, gentle smile. You don't have to try to look stunning; you just are.",
        image: "assets/images/optimized/editorial_spread_evening_lights.jpg",
        realSrc: "assets/images/optimized/editorial_spread_evening_lights.jpg",
        caption: "Figure 1.0 · Evening lights and effortless warmth.",
        meta: "ARCHIVAL FOLIO · EVENING LIGHTS"
      },
      {
        id: "spread-2",
        label: "FEATURE SPREAD II",
        headline: "Reflections of Quiet Poise",
        subhead: "The mirror study in natural elegance",
        pullQuote: "“The effortless elegance of someone who never needs to perform.”",
        text: "One of my absolute favourite casual portraits of you. Framed by the soft blue arch of a mirror, with your glasses, curly hair, and that unmistakable confident, playful expression. It feels completely natural, modern, and uniquely you.",
        image: "assets/images/optimized/editorial_spread_mirror_selfie.jpg",
        realSrc: "assets/images/optimized/editorial_spread_mirror_selfie.jpg",
        caption: "Figure 2.0 · Reflections in soft daylight.",
        meta: "MIRROR ARCHIVE · NATURAL POISE"
      },
      {
        id: "spread-3",
        label: "FEATURE SPREAD III",
        headline: "Radiance In The Ordinary",
        subhead: "The quiet power of genuine authenticity",
        pullQuote: "“That gentle, soft-spoken presence that immediately sets me at ease.”",
        text: "Up close, with that warm, quiet smile that feels like a familiar sanctuary. You never try to pretend to be someone you aren't. In a world full of noise, your gentle authenticity is what stands out most.",
        image: "assets/images/optimized/editorial_spread_white_coat.jpg",
        realSrc: "assets/images/optimized/editorial_spread_white_coat.jpg",
        caption: "Figure 3.0 · The warmth of a familiar smile.",
        meta: "EDITORIAL ARCHIVE · CURATED LIGHT"
      },
      {
        id: "spread-4",
        label: "FEATURE SPREAD IV",
        headline: "Casual Grace & Unguarded Joy",
        subhead: "The relaxed geometry of laughter",
        pullQuote: "“An entire universe in one relaxed smile.”",
        text: "Wearing your green jersey, completely relaxed, without a care in the world. When you let your guard down and smile freely, the whole mood changes. Those unposed, candid moments are the ones I cherish most.",
        image: "assets/images/optimized/editorial_spread_green_jersey.jpg",
        realSrc: "assets/images/optimized/editorial_spread_green_jersey.jpg",
        caption: "Figure 4.0 · Unguarded joy and casual grace.",
        meta: "EXPRESSIONS FOLIO · CASUAL ARCHIVE"
      },
      {
        id: "spread-5",
        label: "FEATURE SPREAD V",
        headline: "Beauty, Without Trying",
        subhead: "The direct gaze that stops time",
        pullQuote: "“You’re soooo beautiful, pretty, gorgeous.”",
        text: "There is an unspoken language in the way you look directly at the camera here—gentle, observant, and quietly captivating. No filters, no performance, just you.",
        image: "assets/images/optimized/museum_eyes_intimate.jpg",
        realSrc: "assets/images/optimized/museum_eyes_intimate.jpg",
        caption: "Figure 5.0 · Direct warmth and intimate calm.",
        meta: "INTIMATE STUDY · THROUGH MY EYES"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 3: THE MUSEUM (The Museum of You) & EXHIBIT CBBG
  // ----------------------------------------------------------------------------
  museum: {
    title: "THE MUSEUM OF YOU",
    subtitle: "A virtual sanctuary illuminated by gold light and emerald velvet.",
    curatorialIntro: "Welcome to the private galleries of someone impossible to describe. Each chamber holds an aspect of your grace preserved like fine archival art.",
    
    // Exhibit CBBG (Secret Archive with editable placeholder)
    cbbgExhibit: {
      id: "gallery-cbbg",
      codeName: "EXHIBIT CBBG",
      roman: "ARCHIVAL VAULT",
      title: "EXHIBIT CBBG",
      subtitle: "A Special Memory Guarded in Gold",
      badge: "CLASSIFIED MEMORY",
      quote: "“A name chosen with love, holding a meaning that belongs quietly to us.”",
      description: "I have given you the name CBBG as an important personal memory. The meaning remains quietly guarded between us for now, preserved here in this velvet archive until the right moment comes to tell you.",
      editableMemoryPlaceholder: "The true memory and meaning of CBBG can be edited and revealed here whenever Rahul chooses to share it.",
      isSecret: true,
      medium: "Locked Archival Folio · Velvet & Antique Gilt Seal"
    },

    galleries: [
      {
        id: "gallery-eyes",
        roman: "GALLERY I",
        title: "HER EYES",
        subtitle: "Through My Eyes · Direct & Honest",
        quote: "“Looking into her eyes is like watching the stars settle over calm water.”",
        description: "Expressive, deep, and carrying an honesty that needs no explanation. Along with your ring and gentle gaze, this close candid captures the exact way you look when we talk—observant, sweet, and unforgettable.",
        image: "assets/images/optimized/museum_eyes_intimate.jpg",
        realSrc: "assets/images/optimized/museum_eyes_intimate.jpg",
        medium: "Intimate Daylight Portraiture",
        dimensions: "120 × 90 cm",
        acquisition: "Acquisition No. 01 · Permanent Collection"
      },
      {
        id: "gallery-smile",
        roman: "GALLERY II",
        title: "THAT SMILE",
        subtitle: "Holding The Phone · A Familiar Voice",
        quote: "“The face that makes ordinary days feel completely different.”",
        description: "Phone in hand, soft smile on your face, listening warmly. Whether on a regular call or sharing laughs late at night, that sweet expression always makes me feel lucky to know you.",
        image: "assets/images/optimized/museum_smile_warmth.jpg",
        realSrc: "assets/images/optimized/museum_smile_warmth.jpg",
        medium: "Natural Light & Candid Warmth",
        dimensions: "100 × 80 cm",
        acquisition: "Acquisition No. 02 · Light Studies"
      },
      {
        id: "gallery-details",
        roman: "GALLERY III",
        title: "THE LITTLE DETAILS",
        subtitle: "Soft Profile & Quiet Grace",
        quote: "“The folded hands, the soft voice, the quiet moments between words.”",
        description: "The little things that someone who truly watches you could never miss: looking down with quiet modesty, your delicate earrings, the soft curls of your hair, and the graceful calm you bring into any room.",
        image: "assets/images/optimized/museum_profile_grace.jpg",
        realSrc: "assets/images/optimized/museum_profile_grace.jpg",
        medium: "Soft Profile Study",
        dimensions: "90 × 90 cm",
        acquisition: "Acquisition No. 03 · Intimate Observations"
      },
      {
        id: "gallery-bw",
        roman: "GALLERY IV",
        title: "THE MASTERPIECE: UNFILTERED BHAVYA",
        subtitle: "Permanent Museum Centrepiece · Playful & Real",
        isMasterpiece: true,
        quote: "“Of all the portraits in the world, this is the one that captures your true, joyous soul.”",
        description: "The playful wink, the spontaneous tongue-out smile, the braces, and the completely uninhibited joy. This is not a posed studio portrait trying to look serious; this is you being wonderfully, authentically, playfully Bhavya. The absolute centerpiece of this exhibition.",
        image: "assets/images/optimized/museum_masterpiece_playful_bw.jpg",
        realSrc: "assets/images/optimized/museum_masterpiece_playful_bw.jpg",
        medium: "Original Silver Gelatin Monochrome Print in Antique Hand-Carved Gilt Frame",
        dimensions: "160 × 120 cm · Central Rotunda",
        acquisition: "Permanent Centrepiece · The Heart of the Museum"
      },
      {
        id: "gallery-monochrome-study",
        roman: "GALLERY V",
        title: "MONOCHROME REVERIE",
        subtitle: "Softness & Playful Hearts",
        quote: "“Gentle eyes and a quiet smile that needs no colour to feel vibrant.”",
        description: "Monochrome close-ups that emphasize the quiet charm of your expressions. Framed with playful heart doodles, capturing that sweet balance between shy elegance and fun-loving spirit.",
        image: "assets/images/optimized/museum_monochrome_hearts.jpg",
        realSrc: "assets/images/optimized/museum_monochrome_hearts.jpg",
        medium: "Monochrome Film Study",
        dimensions: "100 × 100 cm",
        acquisition: "Acquisition No. 05 · The Archival Studies"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 4: THINGS YOU PROBABLY DON'T KNOW I NOTICE
  // ----------------------------------------------------------------------------
  thingsINotice: {
    title: "THINGS YOU PROBABLY DON'T KNOW I NOTICE",
    subtitle: "A playful, affectionate archive of the little habits and moments that make my heart melt.",
    tagline: "You think nobody is paying attention. But I am always watching.",
    items: [
      {
        id: "notice-1",
        title: "Your Soft Voice",
        badge: "CALMING TONE",
        text: "The way you speak so gently and softly. Even when surrounded by loud campus chatter, your voice cuts through like a quiet sanctuary."
      },
      {
        id: "notice-2",
        title: "Your Shy Expressions",
        badge: "MICRO-MOMENT",
        text: "That unguarded, adorable look when a compliment catches you by surprise. You try not to smile, you look down for a second, and then you blush."
      },
      {
        id: "notice-3",
        title: "Your Nose",
        badge: "MY ABSOLUTE FAVOURITE",
        text: "My number one favourite physical feature on you. It's so cute, delicate, and gives your whole face the sweetest, most lovable charm."
      },
      {
        id: "notice-4",
        title: "That Radiant Smile",
        badge: "GENUINE SUNSHINE",
        text: "The genuine, unrestrained smile that breaks out when you forget to be shy. It makes ordinary days feel completely different."
      },
      {
        id: "notice-5",
        title: "The Fidgeting Hands When Nervous",
        badge: "BEHIND ENGINEERING",
        text: "The way you fold, fidget, and clasp your hands when you are a little nervous or feeling shy. I noticed it that night behind Engineering, and I still love it."
      },
      {
        id: "notice-6",
        title: "Your Hair & Forehead",
        badge: "EFFORTLESS ELEGANCE",
        text: "The graceful way your hair falls around your face, and the subtle, gentle elegance of your forehead that needs no styling to be beautiful."
      },
      {
        id: "notice-7",
        title: "Playfully Pinching & Beating Me",
        badge: "AFFECTIONATE TEASING",
        text: "When you get all animated and playfully pinch or beat me! It's your own sweet, feisty way of showing affection, and honestly, it makes me laugh every single time."
      },
      {
        id: "notice-8",
        title: "The Little Moments That Make Me Smile",
        badge: "EVERYDAY MEMORIES",
        text: "The aesthetic songs you pick for your stories, the casual 'Yaa, we are coming down' confidence, the way you listen attentively, and how comfortable we feel together."
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 5: 3D CONSTELLATION UNIVERSE (12 Interactive Celestial Stars)
  // ----------------------------------------------------------------------------
  constellation: {
    title: "THE CONSTELLATION OF HER",
    subtitle: "A real 3D celestial map where every star is dedicated to something real I love about you.",
    hint: "Click any star to focus the 3D camera and reveal its personal tribute.",
    finalMessage: "I could keep finding new things to love about you, and still never finish describing you.",
    stars: [
      {
        id: "star-1",
        category: "Her Smile",
        title: "The Smile That Resets My Day",
        color: 0xF4E2BB,
        position: [-45, 25, -60],
        tribute: "Your warm, genuine smile that breaks out when you forget to be shy. The instant cure to any stressful day."
      },
      {
        id: "star-2",
        category: "Her Eyes",
        title: "Thoughtful & Honest",
        color: 0xE8D7B5,
        position: [-20, 48, -40],
        tribute: "Expressive and deep. The way you look at me when we're talking with that quiet understanding that needs no pretense."
      },
      {
        id: "star-3",
        category: "Her Nose",
        title: "My Absolute Favourite Feature",
        color: 0xC5A46D,
        isZenith: true,
        position: [15, 30, -50],
        tribute: "Hands down my absolute favourite physical feature on you. Delicate, cute, and the sweetest centerpiece of all your expressions."
      },
      {
        id: "star-4",
        category: "Her Voice",
        title: "The Calming Melody",
        color: 0xDCEEE6,
        position: [-35, -20, -70],
        tribute: "Soft-spoken, calming, and gentle. The voice that turned a simple staircase walk into an anchor for my thoughts."
      },
      {
        id: "star-5",
        category: "Her Hair",
        title: "Effortless Grace",
        color: 0xF4E2BB,
        position: [40, 45, -80],
        tribute: "The graceful way your hair falls, framing a face that has never needed any filter or styling to take my breath away."
      },
      {
        id: "star-6",
        category: "Her Expressions",
        title: "Unguarded Micro-Moments",
        color: 0xE8D7B5,
        position: [60, 10, -55],
        tribute: "The little reactions—looking down, smiling softly, and trying not to blush when a compliment catches you by surprise."
      },
      {
        id: "star-7",
        category: "Her Soft-Spoken Nature",
        title: "Gentle In A Loud World",
        color: 0x087F78,
        position: [50, -35, -65],
        tribute: "In a world that is always loud, your softness is what stands out. Modest, polite, and completely sincere."
      },
      {
        id: "star-8",
        category: "Her Personality",
        title: "Warm, Fun & Easy To Be With",
        color: 0xF4E2BB,
        position: [10, -45, -45],
        tribute: "A wonderful balance of gentle poise, playful teasing, and the effortless comfort we feel when talking about anything."
      },
      {
        id: "star-9",
        category: "Her Little Habits",
        title: "Fidgeting Hands & Playful Pinches",
        color: 0xC5A46D,
        position: [-15, -40, -50],
        tribute: "The nervous folding of your hands when sitting near the canteen, and how you playfully pinch or beat me when teasing!"
      },
      {
        id: "star-10",
        category: "Her Individuality",
        title: "Distinctly Herself",
        color: 0xDCEEE6,
        position: [-55, -5, -45],
        tribute: "You never try to copy anyone or follow the crowd. You stay completely true to who you are, and I admire that so much."
      },
      {
        id: "star-11",
        category: "The Instagram Highlight",
        title: "The Frame I Kept Returning To",
        color: 0xE8D7B5,
        position: [-30, 10, -90],
        tribute: "That one photograph and song I revisited almost every alternate day, quietly realizing how special you were becoming to me."
      },
      {
        id: "star-12",
        category: "The Little Memories",
        title: "From The Staircase to 11:11 PM",
        color: 0xF4E2BB,
        position: [20, -10, -75],
        tribute: "Every wave near the burger spot, that evening behind Engineering, and calling you back on 27 September to say I LOVE U."
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 6: 3D LIVING ENCHANTED GARDEN (Real Botanical World & Ecosystem)
  // ----------------------------------------------------------------------------
  garden: {
    title: "THE GARDEN OF BHAVYA",
    subtitle: "A living 3D botanical world with sunlight, butterflies, gentle animals, and glowing flora.",
    clearingQuote: "“If I could plant every beautiful thing I notice about you, this garden would never stop growing.”",
    viewpoints: [
      { id: "vista", label: "🌿 Panorama", pos: [0, 18, 48], target: [0, 4, 0] },
      { id: "pond", label: "💧 Lotus Pond & Bridge", pos: [-18, 8, 16], target: [-14, 1, 0] },
      { id: "meadow", label: "🌸 Flower Meadow", pos: [22, 7, 20], target: [16, 2, 0] },
      { id: "tree", label: "🌳 Tree of Little Things", pos: [0, 9, 24], target: [0, 8, 0] }
    ],
    treeOfLittleThings: {
      name: "THE TREE OF LITTLE THINGS",
      description: "A magnificent central 3D tree whose illuminated leaves hold the small moments I cherish.",
      leaves: [
        { title: "The Staircase Hello", text: "The soft-spoken tone you used when Anamika encouraged you to talk about coding on the 3rd floor of ASBT." },
        { title: "The Fidgeting Hands", text: "How you nervously folded and fiddled with your hands sitting near the canteen behind Engineering." },
        { title: "The Enthusiastic Wave", text: "The ridiculous, happy wave across the crowd near the burger spot during Amma's birthday seva." },
        { title: "The Wake-Up Call", text: "Calling me late at night when I fell asleep, bringing me back to 11:11 PM on 27 September." },
        { title: "The Story Song Aesthetic", text: "The specific songs you choose for your Instagram highlights that carry an unforgettable vibe." },
        { title: "The Playful Pinches", text: "When you playfully pinch or beat me when getting teasingly exasperated!" },
        { title: "The Reserved Modesty", text: "How you look when you receive a compliment—a quiet blush followed by genuine humility." },
        { title: "The Shared Laughter", text: "The way you laugh freely when you forget to be shy, illuminating the whole space." }
      ]
    },
    flowers: [
      { id: "fl-1", name: "Night Jasmine", variety: "Jasmine Bloom", pos: [10, 0, 12], color: 0xFFF9EF, compliment: "For that first staircase conversation on the third floor of ASBT." },
      { id: "fl-2", name: "Golden Rose", variety: "English Rose", pos: [14, 0, 6], color: 0xF4E2BB, compliment: "For your smile that completely resets an ordinary day." },
      { id: "fl-3", name: "Emerald Lotus", variety: "Water Lotus", pos: [-12, -0.4, 4], color: 0x087F78, compliment: "For your gentle, soft-spoken nature that never needs to be loud." },
      { id: "fl-4", name: "Moonlit Camellia", variety: "Camellia", pos: [-8, 0, 16], color: 0xE8D7B5, compliment: "For your patience, quiet warmth, and the comfort we share." },
      { id: "fl-5", name: "Sunlit Daisy", variety: "Wild Daisy", pos: [18, 0, 14], color: 0xFFFFFF, compliment: "For the adorable way you blush when a compliment catches you by surprise." },
      { id: "fl-6", name: "Starlight Lily", variety: "Grace Lily", pos: [5, 0, 8], color: 0xC5A46D, compliment: "For your honesty and the way you stay completely true to who you are." },
      { id: "fl-7", name: "Velvet Gardenia", variety: "Gardenia", pos: [-6, 0, 10], color: 0xDCEEE6, compliment: "For how peaceful and comfortable it feels just sitting next to you." },
      { id: "fl-8", name: "Blue Iris", variety: "Meadow Iris", pos: [-16, 0, 12], color: 0x087F78, compliment: "For the thoughtful conversations we share late into the night." },
      { id: "fl-9", name: "Golden Dahlia", variety: "Dahlia Bloom", pos: [8, 0, 18], color: 0xF4E2BB, compliment: "For your cute little nose—my absolute favourite feature on you." },
      { id: "fl-10", name: "Dewdrop Violet", variety: "Woodland Violet", pos: [-4, 0, 14], color: 0xC5A46D, compliment: "For the nervous hand movements near the little canteen behind Engineering." },
      { id: "fl-11", name: "Sweet Magnolia", variety: "Magnolia", pos: [16, 0, 2], color: 0xFFF9EF, compliment: "For the spontaneous plans, long drives, and all the roads ahead of us." },
      { id: "fl-12", name: "Midnight Moonflower", variety: "Moonflower", pos: [0, 0, 16], color: 0xE8D7B5, compliment: "For 27 September 2026, 11:11 PM, when I said those three words: I LOVE U." }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 7: THE STORY OF US (The Complete Unabridged Relationship Story)
  // ----------------------------------------------------------------------------
  storyOfUs: {
    title: "THE STORY OF US",
    subtitle: "Narrated by Rahul, for Bhavya. Every memory, every laugh, and every little thing.",
    epilogueTag: "27.09.2026 · PERMANENT TRIBUTE",
    chapters: [
      {
        id: "chapter-1",
        number: "CHAPTER ONE",
        title: "The Afternoon We First Spoke",
        timePeriod: "AFTERNOON · THE BEGINNING",
        location: "Engineering Block to ASBT Building · 3rd Floor",
        paragraphs: [
          "Some love stories begin with a confession. Ours began with a staircase, a little nervousness, and two people who didn't know that their lives were about to become something beautiful.",
          "It all started when I was working on an application for my MAOM college project.",
          "One afternoon, while walking back from the Engineering Block to our ASBT building on the third floor, something rather unexpected happened. Your friend, Anamika, practically insisted that you talk to me. You started asking me casual questions about coding, what I was building, and how I managed to do all of it.",
          "Neither of us was particularly confident that day. You were nervous, and honestly, so was I.",
          "But I noticed you.",
          "There was something about the way you spoke. You were soft-spoken, a little shy, and had this gentle presence that immediately caught my attention. You were exactly the kind of girl I had always imagined myself falling for.",
          "I didn't know much about you then, but something about that little interaction stayed with me."
        ],
        highlightQuote: "“You were soft-spoken, a little shy, and had this gentle presence that immediately caught my attention. You were exactly the kind of girl I had always imagined myself falling for.”",
        rahulNote: "I was secretly nervous that whole walk, trying to sound cool while answering coding questions."
      },
      {
        id: "interlude-instagram",
        number: "AN UNFORGETTABLE HIGHLIGHT",
        title: "A Little Instagram Highlight",
        timePeriod: "A FEW DAYS LATER",
        location: "Digital Sanctuary · A Single Story",
        paragraphs: [
          "A few days later, you sent me a follow request on Instagram.",
          "I accepted it, naturally, and began exploring your profile. I went through your highlights, and I still remember one particular picture of yours that I absolutely loved.",
          "I kept going back to it.",
          "Almost every alternate day, I would find myself opening that highlight again. I even loved the song you had used. It had such a beautiful vibe that somehow made the picture even more special.",
          "Little did you know that someone was quietly becoming fond of you, one Instagram highlight at a time."
        ],
        highlightQuote: "“Almost every alternate day, I would find myself opening that highlight again. I even loved the song you had used.”",
        rahulNote: "I still remember the exact vibe of that song. You had no idea."
      },
      {
        id: "chapter-2",
        number: "CHAPTER TWO",
        title: "The Evening at Amma's Birthday",
        timePeriod: "EVENING, CONTINUING INTO NIGHT",
        location: "Campus Seva · Near The Burger Spot",
        paragraphs: [
          "Now this part is something I don't want to forget.",
          "Our college was celebrating Amma's birthday, and as first-year students, we had to participate in seva and fulfil our assigned duties.",
          "It was the second day. I had completed my morning shift early, but Sathvik had an evening duty. Thinking he might be alone, I decided to accompany him.",
          "Well, our dedication to seva didn't last very long.",
          "We checked in and then decided to leave for food instead of actually completing our shift. Priorities, apparently.",
          "While we were walking around, Sathvik kept noticing all the couples around us. He was wishing he had a girl to roam around with, spend time with, and talk to.",
          "And then, as we were heading towards the food stalls, I saw you. Bhavya.",
          "You were near the burger spot, surrounded by some of your friends. And as usual, we waved at each other.",
          "It was funny, really. We weren't friends. We hadn't even exchanged proper conversations since that staircase incident. Yet, whenever we crossed paths, we greeted each other with these ridiculously enthusiastic waves.",
          "There was something oddly familiar about it. Almost as if we were already close, even though we barely knew each other.",
          "That evening, I waved at you again. You were talking to one of your friends, and for a moment, I thought you might be calling me or trying to say something. But the crowd was too much, and Sathvik and I had to move.",
          "As we walked away, I kept thinking about you. *Should I text her?*",
          "I wasn't sure. We had never really spoken. What if it seemed random? What if you found it weird?",
          "But then I thought about how we always waved at each other. There was already a little connection, even if neither of us had acknowledged it.",
          "So, after eating and gathering whatever courage I could find, I finally sent you a message on Instagram.",
          "Five minutes passed. No reply.",
          "And because apparently patience wasn't one of my strongest qualities, I texted you on WhatsApp too.",
          "And then came your reply: “Yaa, we are coming down.”",
          "The way you replied was so casual, almost as if we had been talking every day for months. There was no awkward introduction, no formal conversation. Just a simple response that made it feel like we were already familiar with each other.",
          "And honestly, I loved that."
        ],
        highlightQuote: "“And then came your reply: ‘Yaa, we are coming down.’ Just a simple response that made it feel like we were already familiar with each other.”",
        rahulNote: "Waiting those five minutes for your Instagram reply felt like five hours."
      },
      {
        id: "chapter-3-night",
        number: "THE NIGHT BEHIND ENGINEERING",
        title: "Four People, One Beautiful Night",
        timePeriod: "THAT SAME EVENING · NIGHTFALL",
        location: "Behind Engineering Block · Near The Small Canteen",
        paragraphs: [
          "You came down with Rebecca, and I introduced you both to Sathvik.",
          "Somehow, our little group of four came together. And naturally, I kept teasing Sathvik and Rebecca. I remember joking about them and calling Sathvik her husband.",
          "Some of our other friends were around too, but they eventually went towards Annapoorneshwari Hall, leaving the four of us to explore.",
          "We decided to roam around.",
          "At one point, we went towards a stall. You mentioned that you would like something there, and I found another opportunity to start a conversation.",
          "I brought up Rudra, and you became nervous. Rebecca immediately became curious and started asking what was going on. You initially didn't tell her, but eventually revealed it.",
          "I found the whole situation amusing, especially watching you get so nervous.",
          "After that, we headed towards the back of the Engineering Block. We eventually found ourselves sitting in front of a small canteen.",
          "And that was when the evening became something I would never forget.",
          "You were sitting there, visibly nervous. You kept folding your hands, fidgeting, and struggling to be completely comfortable.",
          "Rebecca even remarked that she had never seen me talk this much before.",
          "Apparently, I had discovered a completely different version of myself that night.",
          "I don't know exactly what happened to the time that evening. Conversations just kept flowing. We talked, laughed, teased each other, and slowly became more comfortable.",
          "There was no grand romantic setting. No expensive dinner. No perfectly planned date.",
          "Just four people, a little canteen, endless conversations, and a girl whose presence made an ordinary evening feel extraordinary.",
          "That night remains one of the best nights of my life.",
          "And no matter how many beautiful nights come after it, a part of me will always return to that one.",
          "Because that was the night a stranger started becoming someone special."
        ],
        highlightQuote: "“Just four people, a little canteen, endless conversations, and a girl whose presence made an ordinary evening feel extraordinary. That night remains one of the best nights of my life.”",
        rahulNote: "Watching you fidget and fold your hands was the sweetest thing I had ever seen."
      },
      {
        id: "chapter-3",
        number: "CHAPTER THREE",
        title: "27 September, 11:11 PM",
        timePeriod: "27 SEPTEMBER 2026 · AROUND 11:11 PM",
        location: "A Midnight Phone Call · The Milestone",
        isConfessionChapter: true,
        clockTime: "11:11",
        clockDate: "27.09.2026",
        confessionText: "I LOVE U.",
        paragraphs: [
          "Somewhere along the way, our conversations became more meaningful.",
          "The casual messages turned into something we looked forward to. The little interactions became memories. And the girl I once admired from a distance was slowly becoming someone I couldn't imagine going a day without talking to.",
          "Then came the night of 27 September.",
          "We were talking late into the night. I was so comfortable that I actually fell asleep while we were talking.",
          "You called me.",
          "I was asleep, completely unaware that something important was waiting for me on the other side of that call.",
          "After about ten minutes, I woke up and called you back.",
          "And that night, at around 11:11 PM, I confessed first.",
          "Two simple words:",
          "I LOVE U.",
          "I don't think I could ever properly describe what that moment meant to me.",
          "The girl whose photograph I used to revisit on Instagram, the girl I nervously waved at near the burger spot, the girl I finally gathered the courage to text, and the girl I spent that unforgettable evening talking to...",
          "She was now someone who had chosen to be with me.",
          "And just like that, our story entered a new chapter."
        ],
        highlightQuote: "“And that night, at around 11:11 PM, I confessed first: I LOVE U.”",
        rahulNote: "Falling asleep and waking up to call you back was the luckiest accident of my life."
      },
      {
        id: "chapter-4",
        number: "CHAPTER FOUR",
        title: "And Then, There Was Us",
        timePeriod: "THE PRESENT CHAPTER · GROWING CLOSER",
        location: "Every Shared Conversation & Ordinary Day",
        paragraphs: [
          "Since that night, all I have wanted is to make you feel loved, valued, safe, and cared for.",
          "I try my best in every little way I can. Sometimes through words, sometimes through surprises, sometimes through silly teasing, and sometimes simply by being there.",
          "I want to learn everything about you. Your little habits, your favourite things, the things that make you smile, the things that make you uncomfortable, and even the smallest details you might think nobody notices.",
          "I want to be someone you can always feel comfortable with.",
          "Someone you can laugh with, talk to, dream with, and be yourself around.",
          "I don't want our relationship to be just about the beautiful moments. I want to be there through the ordinary days too. The sleepy calls, random conversations, silly arguments, little misunderstandings, spontaneous plans, and all the tiny things that slowly build a lifetime together.",
          "We are happy, comfortable and growing closer. There is still so much for us to learn about each other, and I want us to enjoy that journey.",
          "I want to grow through love, trust, patience and understanding."
        ],
        highlightQuote: "“I don't want our relationship to be just about the beautiful moments. I want to be there through the ordinary days too.”",
        rahulNote: "Even on the quietest, most normal days, talking to you is always the best part of my day."
      },
      {
        id: "chapter-5",
        number: "CHAPTER FIVE",
        title: "The Roads We Have Not Travelled Yet",
        timePeriod: "THE HORIZON · OUR DREAMS",
        location: "Long Drives, Open Roads & Shared Tomorrow",
        image: "assets/images/optimized/promise_beside_you_couple.jpg",
        realSrc: "assets/images/optimized/promise_beside_you_couple.jpg",
        caption: "Supporting memory keepsake: The two of us, side by side — ready for every road and every tomorrow ahead.",
        queenDeclaration: "MY BABEE. ♡",
        paragraphs: [
          "I dream of a future where it's the two of us, our parents, road trips, cars, new places, long drives, and countless shared memories.",
          "I imagine us looking back one day and laughing about how everything started with a staircase conversation and two people who were too nervous to talk properly.",
          "And perhaps that is my favourite part of our story.",
          "We didn't need to know where it would lead. We just kept taking little steps towards each other.",
          "I confessed first. I said I LOVE U. And now, here we are, writing something that I hope never reaches its final page.",
          "I want this to last until eternity, if you wish for it too.",
          "I don't want to decide everything for you. I want to understand you, respect your choices, and walk beside you at whatever pace makes you happy.",
          "Because, in my little world, you are my babee.",
          "And me? I'm just your devoted follower.",
          "MY BABEE. ♡"
        ],
        highlightQuote: "“I want to understand you, respect your choices, and walk beside you at whatever pace makes you happy. Because, in my little world, you are my babee.”",
        rahulNote: "Whatever pace feels comfortable to you, that's the pace we will walk."
      }
    ],

    grandFinale: {
      dateStamp: "27.09.2026",
      anniversaryLine: "The day two people stopped being almost strangers and became an us.",
      dedication: "TO MY BHAVYA,",
      promise: "MAY WE NEVER RUN OUT OF TOMORROWS.",
      closingSentiment: "And if life gives us a thousand chapters, I hope every single one has you in it.",
      infiniteSymbol: "∞ ♡"
    }
  },


  // ----------------------------------------------------------------------------
  // SECTION 7: OUR LITTLE CALLS (THOSE CALLS I DIDN'T WANT TO END)
  // ----------------------------------------------------------------------------
  ourLittleCalls: {
    sectionId: "calls",
    romanNumeral: "07",
    eyebrow: "PRIVATE ARCHIVE · SCREEN MEMORIES",
    heading: "OUR LITTLE CALLS",
    subheading: "Those little moments when we were miles apart, but still found a way to sit together.",
    openingQuote: "Some of my favourite moments weren't planned photographs. They were just ordinary calls, your expressions, my silly faces, random conversations and moments when I wished the call would last a little longer.",
    dedicationNote: "Preserved exactly as they happened — in the middle of late nights, busy days, and quiet hours where distance didn't matter.",
    calls: [
      {
        id: "call-1",
        number: "01",
        title: "Laughing Until My Cheeks Hurt",
        tag: "UNFILTERED JOY",
        timestamp: "Late Night · Video Call",
        image: "assets/images/optimized/call_memory_01_laughter.jpg",
        caption: "Mid-laugh with your eyes squeezed shut and head tilted back. You have this unrestrained laugh that completely changes my mood no matter how tired I am.",
        rahulVoice: "I remember looking at you laughing like this and thinking, 'I hope I get to hear this every single day.'"
      },
      {
        id: "call-2",
        number: "02",
        title: "The Subtle Teasing Smirk",
        tag: "PLAYFUL & WICKED",
        timestamp: "Midnight Call · Quiet Room",
        image: "assets/images/optimized/call_memory_02_playful_smirk.jpg",
        caption: "Resting your chin on your hands, giving me that little knowing look right after teasing me about something silly.",
        rahulVoice: "You love throwing a playful remark and then watching my reaction with this exact expression."
      },
      {
        id: "call-3",
        number: "03",
        title: "Chin in Palm & The Penguin",
        tag: "OUR COMFORT ZONE",
        timestamp: "Quiet Evening · Long Call",
        image: "assets/images/optimized/call_memory_03_chin_in_palm.jpg",
        caption: "Hand cupping your cheek, comfortable silence, and that little plushie sitting beside you while we talked about everything and nothing.",
        rahulVoice: "These were the calls where we didn't even need to speak constantly. Just having you on my screen was enough."
      },
      {
        id: "call-4",
        number: "04",
        title: "The Soft Listening Gaze",
        tag: "PURE ATTENTION",
        timestamp: "Midnight · Deep Conversation",
        image: "assets/images/optimized/call_memory_04_intimate_gaze.jpg",
        caption: "Looking directly into the camera with those gentle, attentive eyes while listening to me ramble on about my day.",
        rahulVoice: "Nobody has ever listened to me the way you do. You make me feel completely heard."
      },
      {
        id: "call-5",
        number: "05",
        title: "Dramatic & Animated",
        tag: "THE STORYTELLER",
        timestamp: "Evening · Animated Story",
        image: "assets/images/optimized/call_memory_05_animated_story.jpg",
        caption: "Wide eyes, animated hands, and that dramatic expression you make when recounting something absurd that happened during your day.",
        rahulVoice: "You are the most entertaining storyteller. I could listen to you narrate mundane grocery trips for hours."
      },
      {
        id: "call-6",
        number: "06",
        title: "Gentle Smile in Soft Light",
        tag: "WARM RADIANCE",
        timestamp: "Late Evening · Soft Lamp Glow",
        image: "assets/images/optimized/call_memory_06_soft_smile.jpg",
        caption: "Soft lighting catching your hair and that quiet, peaceful smile that always makes whatever stress I had dissolve instantly.",
        rahulVoice: "A quiet moment in the middle of a long week where everything suddenly felt calm."
      },
      {
        id: "call-7",
        number: "07",
        title: "Right Before Goodnight",
        tag: "THE HARDEST GOODBYE",
        timestamp: "01:40 AM · Just Before Hanging Up",
        image: "assets/images/optimized/call_memory_07_before_goodnight.jpg",
        caption: "That sleepy, tender expression right before we finally gave in and said goodnight, after promising 'five more minutes' four times.",
        rahulVoice: "I never wanted to hit the red button. Even when both of us were half asleep, hanging up was always the hardest part."
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 8: THE KIND OF LOVE I WANT TO GIVE YOU
  // ----------------------------------------------------------------------------
  kindOfLove: {
    heading: "ONE LAST THING",
    subheading: "The Kind of Love I Want to Give You",
    waxSealMonogram: "B",
    salutation: "Dearest Bhavya,",
    promisePortrait: {
      image: "assets/images/optimized/promise_beside_you_couple.jpg",
      tag: "THE PROMISE · BESIDE YOU",
      title: "Walking Beside You",
      captionParagraphs: [
        "I don't want to be ahead of you, deciding where we should go.",
        "I don't want you to follow behind me either.",
        "I want to walk beside you, discover things with you, and make memories at your pace. Not ahead of you. Not pulling you behind me. Just beside you."
      ]
    },
    paragraphs: [
      "I didn't know that a simple staircase conversation on a regular afternoon would lead me here.",
      "From the moment Anamika practically pushed you to ask me about coding, to watching you wave across the crowd at Amma's birthday, to that unforgettable night behind Engineering where you fidgeted with your hands, and to 11:11 PM on 27 September when I said those three words—every chapter has made me realize how special you are to me.",
      "I want you to know the kind of love I hope to give you.",
      "I want you to feel genuinely loved, cared for, appreciated, and safe. I want to be someone you can trust completely—someone you never have to pretend around, someone you can share your weird thoughts with, someone you can laugh with, and someone you can comfortably be silent next to.",
      "I want to listen to you. I want to understand your boundaries, respect every choice you make, and let our relationship grow naturally, without pressure or rush. You never owe me anything; my love is not a transaction, an obligation, or a claim. It is simply a promise to walk beside you at whatever pace brings peace to your heart.",
      "I want us to enjoy each other's company, share endless laughter, go on long road trips, make memories with our families, and support each other's dreams every single step of the way.",
      "I could fill galleries, magazines, gardens, and entire skies with all the things I find beautiful about you. And somehow, I would still have more to say."
    ],
    closing: "Yours, with all my love,",
    author: "Rahul",
    postscript: "P.S. You will always be the masterpiece of this exhibition. MY BABEE. ♡"
  },

  // ----------------------------------------------------------------------------
  // AUDIO CONFIGURATION (Opt-in ambient sound, strictly NO autoplay)
  // ----------------------------------------------------------------------------
  audio: {
    enabled: true,
    autoplay: false,
    src: "assets/audio/ambient-piano.mp3",
    label: "Atmospheric Ambience",
    volume: 0.35
  }
};
