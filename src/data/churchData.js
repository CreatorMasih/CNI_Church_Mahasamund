export const IMAGES = {
  // ✝ REAL CNI Church Mahasamund — St. Peter's Church, Mahasamund C.G. (authentic photo)
  cniChurch: "/church.jpg",
  // Used in Hero as cinematic full-bleed — real church building
  hero: "/church.jpg",
  // Beautiful bright church exterior in daylight
  exterior: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1920&q=80",
  // Joyful bright congregation worship — hands raised in praise
  worship: "https://images.unsplash.com/photo-1478147427282-58a87a433cdc?auto=format&fit=crop&w=1920&q=80",
  // Cross in bright golden sunrise sky
  crossSunset: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&w=1920&q=80",
  // Open Bible with warm candlelight and soft golden bokeh
  bibleCandle: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1920&q=80",
  // Beautiful church at warm golden sunset / evening dusk sky
  nightChurch: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=1920&q=80",
  // Warm joyful community of people praying together — bright daylight
  community: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80",
  // Choir in church singing in bright warm church hall
  choir: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80",
  // Warm family / father and child — for Father's Day event
  family: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1920&q=80",
  // Youth group laughing and praying together outdoors
  youth: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80",
  // Sunlit church interior with warm light through windows — welcome section
  sanctuary: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1920&q=80",
  // Open hands in prayer — prayer section
  prayer: "https://images.unsplash.com/photo-1609610130660-5ac0059ca9f4?auto=format&fit=crop&w=1920&q=80",
};

export const WORSHIP_SONG = {
  id: "bvzAG2JomhI",
  youtubeUrl: "https://youtu.be/bvzAG2JomhI?si=3NQZpKsiiVGo706M",
  embedUrl: "https://www.youtube.com/embed/bvzAG2JomhI?autoplay=1&rel=0",
  thumbnail: "https://img.youtube.com/vi/bvzAG2JomhI/maxresdefault.jpg",
  fallbackImage: IMAGES.worship,
  title: "Worship With Us",
  description: "Take a moment to pause, reflect, and worship. Let every heart be filled with peace, faith, and the presence of God.",
  verse: "Sing to the Lord a new song; sing to the Lord, all the earth.",
  reference: "— Psalm 96:1",
};

export const EVENTS = [
  {
    id: 1,
    title: "Sunday Divine Worship",
    time: "Every Sunday | 8:00 AM – 10:00 AM",
    location: "Main Sanctuary, CNI Church Mahasamund",
    category: "Worship",
    description: "Join our congregation for a morning of powerful worship, communion, divine fellowship, and scripture exposition.",
    image: IMAGES.worship,
    date: "SUNDAY 8:00 AM"
  },
  {
    id: 2,
    title: "Father's Day & Family Thanksgiving",
    time: "Coming Sunday | 10:30 AM",
    location: "Fellowship Hall & Sanctuary",
    category: "Celebration",
    description: "A special service celebrating fathers and families with heart-filled prayers, youth performances, and community lunch.",
    image: IMAGES.family,
    date: "CELEBRATION"
  },
  {
    id: 3,
    title: "Youth Fellowship Gathering",
    time: "Saturday Evenings | 6:00 PM",
    location: "Youth Center",
    category: "Youth",
    description: "A vibrant space for young believers to study the Word, build genuine friendships, engage in worship music, and grow together.",
    image: IMAGES.youth,
    date: "WEEKLY"
  }
];

export const MINISTRIES = [
  {
    id: "youth",
    title: "Youth Ministry",
    description: "Empowering the younger generation to stand firm in Christ, build Christian character, and lead with purpose.",
    image: IMAGES.youth,
    leader: "Youth Council Leaders"
  },
  {
    id: "women",
    title: "Women's Fellowship",
    description: "A sisterhood united in prayer, Bible reflection, hospital visits, and community benevolence.",
    image: IMAGES.community,
    leader: "Women's Fellowship Committee"
  },
  {
    id: "sunday-school",
    title: "Sunday School",
    description: "Nurturing children in biblical values through creative lessons, songs, activities, and joyful learning.",
    image: IMAGES.family,
    leader: "Sunday School Teachers"
  },
  {
    id: "choir",
    title: "Choir Ministry",
    description: "Leading the church into deep spiritual worship through sacred hymns, choral harmonies, and praise music.",
    image: IMAGES.choir,
    leader: "Worship Leader & Choir Master"
  },
  {
    id: "prayer",
    title: "Prayer Ministry",
    description: "Interceding daily for our congregation, the sick, our city Mahasamund, and global peace.",
    image: IMAGES.prayer,
    leader: "Prayer Tower Team"
  },
  {
    id: "community",
    title: "Community Outreach",
    description: "Extending Christ's love to the underprivileged through food distribution, medical camps, and educational support.",
    image: IMAGES.worship,
    leader: "Outreach & Service Team"
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Morning Light in the Sanctuary",
    category: "Worship",
    image: IMAGES.sanctuary,
    aspect: "tall"
  },
  {
    id: 2,
    title: "Youth Fellowship Gathering",
    category: "Youth",
    image: IMAGES.youth,
    aspect: "wide"
  },
  {
    id: 3,
    title: "Christmas Candlelight Vigil",
    category: "Christmas",
    image: IMAGES.exterior,
    aspect: "square"
  },
  {
    id: 4,
    title: "Easter Dawn Praise Service",
    category: "Easter",
    image: IMAGES.crossSunset,
    aspect: "tall"
  },
  {
    id: 5,
    title: "Community Benevolence Drive",
    category: "Community",
    image: IMAGES.community,
    aspect: "square"
  },
  {
    id: 6,
    title: "Sacred Choir Praise Harmony",
    category: "Choir",
    image: IMAGES.choir,
    aspect: "wide"
  },
  {
    id: 7,
    title: "Family & Sunday Fellowship",
    category: "Celebration",
    image: IMAGES.family,
    aspect: "square"
  },
  {
    id: 8,
    title: "Evening Prayer Circle",
    category: "Fellowship",
    image: IMAGES.worship,
    aspect: "tall"
  }
];


export const SERMONS = {
  featured: {
    id: "feat-1",
    title: "Walking by Faith, Not by Sight",
    speaker: "Rev. Presbyter In-Charge",
    date: "Latest Sunday Message",
    duration: "42 mins",
    series: "Faith Unshaken",
    description: "An inspiring message on trusting God's unyielding promises during seasons of uncertainty and finding peace in His divine presence.",
    image: IMAGES.hero,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // sample video embed fallback
  },
  recent: [
    {
      id: "serm-1",
      title: "The Power of Forgiveness and Grace",
      speaker: "Church Pastor",
      date: "August 18, 2026",
      duration: "38 mins",
      image: IMAGES.worship
    },
    {
      id: "serm-2",
      title: "Living as Light in the World",
      speaker: "Guest Speaker",
      date: "August 11, 2026",
      duration: "45 mins",
      image: IMAGES.crossSunset
    },
    {
      id: "serm-3",
      title: "The Shepherd's Protection — Psalm 23",
      speaker: "Rev. Presbyter In-Charge",
      date: "August 4, 2026",
      duration: "40 mins",
      image: IMAGES.bibleCandle
    }
  ]
};

export const MEMORIALS = [
  {
    id: 1,
    name: "In Loving Memory of Church Founders & Saints",
    years: "Resting in Heavenly Peace",
    tribute: "Remembering those faithful servants who laid the foundation of CNI Church Mahasamund and dedicated their lives to Christ.",
    verse: "Their works do follow them. — Revelation 14:13"
  },
  {
    id: 2,
    name: "Beloved Elders & Departure Saints",
    years: "Forever in Our Hearts",
    tribute: "Honoring our dearly departed brothers and sisters whose prayers and love continue to inspire our community.",
    verse: "Precious in the sight of the LORD is the death of his saints. — Psalm 116:15"
  }
];
