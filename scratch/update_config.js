const fs = require("fs");
const path = require("path");

const configPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\config.js";
let content = fs.readFileSync(configPath, "utf8");

// 1. Update Chapter images in storyOfUs
const chapterUpdates = [
  {
    oldImg: 'image: "assets/images/memories/chapter-1-staircase.svg",\n        realSrc: "assets/images/memories/chapter-1-staircase.jpg",\n        caption: "Where a walk back from Engineering turned into the start of everything."',
    newImg: 'image: "assets/images/optimized/timeline_interlude_phone_call.jpg",\n        realSrc: "assets/images/optimized/timeline_interlude_phone_call.jpg",\n        caption: "Supporting memory keepsake: A quiet portrait from our first semester — the gentle presence that caught my attention."'
  },
  {
    oldImg: 'image: "assets/images/memories/chapter-2-instagram.svg",\n        realSrc: "assets/images/memories/chapter-2-instagram.jpg",\n        caption: "A single frame, a memorable song, and thoughts that wouldn\'t fade."',
    newImg: 'image: "assets/images/optimized/timeline_interlude_candid_blush.jpg",\n        realSrc: "assets/images/optimized/timeline_interlude_candid_blush.jpg",\n        caption: "Supporting memory keepsake: That bright smile and unforgettable vibe from your Instagram highlight that I kept revisiting."'
  },
  {
    oldImg: 'image: "assets/images/memories/chapter-3-burger-spot.svg",\n        realSrc: "assets/images/memories/chapter-3-burger-spot.jpg",\n        caption: "Waving enthusiastically across a crowded evening."',
    newImg: 'image: "assets/images/optimized/editorial_spread_evening_lights.jpg",\n        realSrc: "assets/images/optimized/editorial_spread_evening_lights.jpg",\n        caption: "Supporting memory keepsake: Golden festive evening lights — waving enthusiastically across the crowd near the burger spot."'
  },
  {
    oldImg: 'image: "assets/images/memories/chapter-4-engineering-night.svg",\n        realSrc: "assets/images/memories/chapter-4-engineering-night.jpg",\n        caption: "Talking for hours under the quiet streetlights."',
    newImg: 'image: "assets/images/optimized/museum_profile_grace.jpg",\n        realSrc: "assets/images/optimized/museum_profile_grace.jpg",\n        caption: "Supporting memory keepsake: That gentle profile and nervous laughter under the quiet campus streetlights behind Engineering."'
  },
  {
    oldImg: 'image: "assets/images/memories/chapter-5-11-11.svg",\n        realSrc: "assets/images/memories/chapter-5-11-11.jpg",\n        caption: "The exact moment everything changed. 11:11 PM."',
    newImg: 'image: "assets/images/optimized/timeline_interlude_soft_profile.jpg",\n        realSrc: "assets/images/optimized/timeline_interlude_soft_profile.jpg",\n        caption: "Supporting memory keepsake: 27 September 2026, around 11:11 PM — thinking about you as I sent those three words: I LOVE U."'
  },
  {
    oldImg: 'image: "assets/images/memories/chapter-6-present.svg",\n        realSrc: "assets/images/memories/chapter-6-present.jpg",\n        caption: "Every single day with you is my favourite chapter."',
    newImg: 'image: "assets/images/optimized/editorial_spread_green_jersey.jpg",\n        realSrc: "assets/images/optimized/editorial_spread_green_jersey.jpg",\n        caption: "Supporting memory keepsake: One of my absolute favourite casual smiles — radiant, completely unscripted, and true."'
  },
  {
    oldImg: 'image: "assets/images/memories/chapter-7-roads-ahead.svg",\n        realSrc: "assets/images/memories/chapter-7-roads-ahead.jpg",\n        caption: "A thousand roads ahead, and I want you beside me for all of them."',
    newImg: 'image: "assets/images/optimized/promise_beside_you_couple.jpg",\n        realSrc: "assets/images/optimized/promise_beside_you_couple.jpg",\n        caption: "Supporting memory keepsake: The two of us, side by side — ready for every road and every tomorrow ahead."'
  }
];

chapterUpdates.forEach((up, idx) => {
  if (content.includes(up.oldImg)) {
    content = content.replace(up.oldImg, up.newImg);
    console.log(`Updated Chapter ${idx + 1} image`);
  } else {
    console.warn(`Could not find old string for chapter ${idx + 1}`);
  }
});

// 2. Add ourLittleCalls section right after storyOfUs
const ourLittleCallsSection = `
  // ----------------------------------------------------------------------------
  // SECTION 7: OUR LITTLE CALLS (THOSE CALLS I DIDN'T WANT TO END)
  // ----------------------------------------------------------------------------
  ourLittleCalls: {
    sectionId: "calls",
    romanNumeral: "07",
    eyebrow: "PRIVATE ARCHIVE · SCREEN MEMORIES",
    heading: "OUR LITTLE CALLS",
    subheading: "Those Calls I Didn't Want to End",
    openingQuote: "Some of my favourite moments aren't photographs we posed for. They're just little calls, random expressions, your face on my screen, and me wishing the conversation wouldn't end.",
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
`;

if (!content.includes("ourLittleCalls:")) {
  content = content.replace("  // ----------------------------------------------------------------------------\n  // SECTION 8: THE KIND OF LOVE", ourLittleCallsSection + "\n  // ----------------------------------------------------------------------------\n  // SECTION 8: THE KIND OF LOVE");
  console.log("Added ourLittleCalls section");
}

// 3. Add promisePortrait into kindOfLove
const promisePortraitBlock = `    promisePortrait: {
      image: "assets/images/optimized/promise_beside_you_couple.jpg",
      tag: "THE PROMISE · BESIDE YOU",
      title: "Walking Beside You",
      captionParagraphs: [
        "I don't want to be ahead of you, deciding where we should go.",
        "I don't want you to follow behind me either.",
        "I want to walk beside you, discover things with you, and make memories at your pace. Not ahead of you. Not pulling you behind me. Just beside you."
      ]
    },
`;

if (!content.includes("promisePortrait:")) {
  content = content.replace('salutation: "Dearest Bhavya,",\n', 'salutation: "Dearest Bhavya,",\n' + promisePortraitBlock);
  console.log("Added promisePortrait into kindOfLove");
}

fs.writeFileSync(configPath, content, "utf8");
console.log("config.js update complete!");
