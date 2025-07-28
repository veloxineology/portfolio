export const siteData = {
  home: {
    name: "Kaushik S",
    tagline: "Student & Developer",
    greetingEmoji: "👋",
    location: "📍 Coimbatore, India",
    description:
      "Poet at heart, with an obsessive devotion to precision in every word, every pixel, placed with purpose in pursuit of perfection.",
    ctaText: "Explore My Work",
    profileImage: "/placeholder.svg?height=80&width=80",
    languages: [
      { name: "Tamil", type: "spoken" },
      { name: "English", type: "spoken" },
      { name: "Hindi", type: "spoken" },
      { name: "Malayalam", type: "spoken" },
      { name: "French", type: "spoken" },
      { name: "JavaScript", type: "code" },
      { name: "TypeScript", type: "code" },
      { name: "Python", type: "code" },
      { name: "HTML", type: "code" },
      { name: "CSS", type: "code" },
      { name: "React", type: "code" },
      { name: "Node.js", type: "code" },
      { name: "Kotlin", type: "code" },
      { name: "Bash", type: "code" },
      { name: "Markdown", type: "code" },
      { name: "JSON", type: "code" },
      { name: "YAML", type: "code" },
      { name: "SQL", type: "code" },
      { name: "C", type: "code" },
      { name: "C++", type: "code" },
    ],
    social: {
      github: "https://github.com/veloxineology",
      instagram: "https://instagram.com/kaushikieee",
      snapchat: "https://snapchat.com/add/kaushikieeee",
      email: "veloxineology@gmail.com",
    },
    calendarLink: "https://cal.com/kaushik",
  },

  about: {
    visible: true,
    introLine: "Hey there! I'm a design engineer who loves building things that make people's lives better.",
    longBio:
      "I'm Kaushik, a design engineer with 5+ years of experience building products that users love. I started as a frontend developer and gradually moved into design, finding my sweet spot at the intersection of both disciplines. I believe great products come from understanding both the technical constraints and user needs. Currently focused on building design systems and developer tools, particularly interested in how AI can enhance the design-to-code workflow.",
    location: "San Francisco, CA (Asia/Kolkata timezone)",
    signatureEmoji: "",
    profileImage: "/profile.jpg?height=120&width=120",

    // Spotify integration
    nowPlaying: {
      enabled: true,
      fallbackMessage: "Not playing",
    },

    // Music preferences
    favoriteGenres: ["Pop", "Malayalam", "Hindi Filmy", "Tamil", "Electronic"],
    topSongs: [
      "Darling I Do - Lucy Schwartz",
      "champagne problems - Taylor Swift",
      "Nee Kavithaigala -  Dhibu Ninan Thomas",
      "Chaudhary Reimagined - Shush & Yohan",
      "Avalukena - Anirudh Ravichander",
      "Channa Mereya - you know it.",
    ],

    // Entertainment
    favoriteMovies: ["La La Land", "Thudarum", "Tourist Family", "500 Days Of Summer", "Me and Her in Late 2024 (iykyk)"],
    toWatchList: ["Retro", "Ford vs Ferarri (Rewatch)", "Ennu Ninte Moideen", "June"],
    favoriteBooks: ["Letters To Milena", "The Fault In Our Stars", "Things we never got over", "Her Texts at 3AM (iykyk)"],

    // Personal details
    funFacts: [
      "Currently working on the ISS (hint btw)",
      "Currently building the front end of Apple Music for web",
      "I have over 4000 commits on my repositories",
      "Working on Blob Tracking in TouchDesigner",
      "I have worked on code for over 24 hours without a break",
      "also, if u got ideas for Thalir - 2025, contact me",
    ],

    // Weekly routine - different for each day
    weeklyRoutine: {
      monday: [
        { time: "5:00 AM", activity: "Wake up, light stretch, basic system check", emoji: "🔋" },
        { time: "5:30 AM", activity: "Workout + podcasts queued", emoji: "🎧" },
        { time: "6:30 AM", activity: "Shower + get ready", emoji: "🚿" },
        { time: "7:00 AM", activity: "School commute / prep", emoji: "🚌" },
        { time: "8:00 AM", activity: "Classes / notes / occasional daydreams", emoji: "📓" },
        { time: "10:00 AM", activity: "Mini-breaks + catch up on thoughts", emoji: "☕" },
        { time: "12:15 PM", activity: "Lunch with background thinking", emoji: "🍽️" },
        { time: "1:00 PM", activity: "More classes. Half-focus mode", emoji: "🧠" },
        { time: "3:00 PM", activity: "Doodles, side notes, random ideas", emoji: "✏️" },
        { time: "4:00 PM", activity: "Head home. Background processing active", emoji: "🎒" },
        { time: "5:30 PM", activity: "Quick nap or scroll session", emoji: "📱" },
        { time: "6:30 PM", activity: "Docs / reading / side project stuff", emoji: "💻" },
        { time: "8:00 PM", activity: "Dinner, maybe a walk", emoji: "🍜" },
        { time: "9:00 PM", activity: "Reflective journaling, small smile", emoji: "📝" },
        { time: "10:30 PM", activity: "Notifications on. Sleep mode", emoji: "🌙" },
      ],
      tuesday: [
        { time: "5:00 AM", activity: "Wake, light movement, audio notes review", emoji: "🎙️" },
        { time: "5:45 AM", activity: "Focused workout session", emoji: "🏋️" },
        { time: "6:30 AM", activity: "Cold shower + prep", emoji: "🧼" },
        { time: "7:00 AM", activity: "Reading saved chats on the way to school", emoji: "🚌" },
        { time: "8:00 AM", activity: "Classes begin. Mental toggle: ON", emoji: "🧠" },
        { time: "10:15 AM", activity: "Quick zone-out + music", emoji: "🎶" },
        { time: "12:15 PM", activity: "Lunch, small talk, recharge", emoji: "🍱" },
        { time: "1:00 PM", activity: "Group work / minor chaos", emoji: "👥" },
        { time: "4:00 PM", activity: "Back home. Bit tired today", emoji: "🏠" },
        { time: "5:30 PM", activity: "Mindless YouTube loop", emoji: "📺" },
        { time: "6:30 PM", activity: "Study, but attention drifts", emoji: "📚" },
        { time: "8:30 PM", activity: "Dinner, Spotify running", emoji: "🎵" },
        { time: "9:30 PM", activity: "Checking if she posted something", emoji: "👀" },
        { time: "10:30 PM", activity: "Sleep, unspoken thoughts linger", emoji: "🌌" },
      ],
      wednesday: [
        { time: "5:00 AM", activity: "Wake + hydration + light cardio", emoji: "💧" },
        { time: "6:00 AM", activity: "Voice memos / ideas dump", emoji: "🗒️" },
        { time: "7:00 AM", activity: "Prep + check calendar", emoji: "📅" },
        { time: "8:00 AM", activity: "School — brain on 50%, heart elsewhere", emoji: "🫀" },
        { time: "10:00 AM", activity: "Mental snapshots of moments", emoji: "📷" },
        { time: "12:15 PM", activity: "Lunch. Quiet table, calm mind", emoji: "🥗" },
        { time: "1:00 PM", activity: "Solo work. Tuned out from the rest", emoji: "🔇" },
        { time: "4:00 PM", activity: "Home. Inbox check", emoji: "📨" },
        { time: "5:30 PM", activity: "Code / side work / silence", emoji: "🧑‍💻" },
        { time: "6:30 PM", activity: "Evening walk + shuffle playlist", emoji: "👟" },
        { time: "8:00 PM", activity: "Dinner + scroll + stare into void", emoji: "🍴" },
        { time: "9:30 PM", activity: "A little overthinking", emoji: "🌀" },
        { time: "10:45 PM", activity: "Goodnight to someone silently", emoji: "🌃" },
      ],
      thursday: [
        { time: "5:00 AM", activity: "Wake, stretch, fix posture", emoji: "🧘" },
        { time: "5:45 AM", activity: "Workout / skipping / offline mode", emoji: "🤫" },
        { time: "6:30 AM", activity: "Get ready while playlist loops", emoji: "🎧" },
        { time: "7:30 AM", activity: "Commute + stare out the window", emoji: "🚍" },
        { time: "8:30 AM", activity: "Midweek fatigue kicks in", emoji: "😶" },
        { time: "12:15 PM", activity: "Lunch. Random laughter at memes", emoji: "😂" },
        { time: "1:00 PM", activity: "Trying to focus but mind elsewhere", emoji: "🪐" },
        { time: "4:30 PM", activity: "Back home, snack, decompress", emoji: "🥪" },
        { time: "6:00 PM", activity: "Project tweaks / Git pushes", emoji: "💻" },
        { time: "7:30 PM", activity: "Random thought: what’s she doing?", emoji: "📲" },
        { time: "9:00 PM", activity: "Notes review + last messages read again", emoji: "📖" },
        { time: "10:30 PM", activity: "Sleep mode with quiet mind", emoji: "🛌" },
      ],
      friday: [
        { time: "5:00 AM", activity: "Wake + light jog", emoji: "🏃" },
        { time: "6:00 AM", activity: "Music + shower + outfit sync", emoji: "🎵" },
        { time: "7:30 AM", activity: "Start prepping for weekend energy", emoji: "⚡" },
        { time: "8:00 AM", activity: "Classes, mostly tolerable", emoji: "🖇️" },
        { time: "12:15 PM", activity: "Lunch. End-of-week chats", emoji: "🍛" },
        { time: "1:00 PM", activity: "Final stretch. Zoning in/out", emoji: "⏳" },
        { time: "3:30 PM", activity: "Back home. Mood: static", emoji: "🧯" },
        { time: "5:00 PM", activity: "Debugging life, maybe watching reels", emoji: "🧠" },
        { time: "7:00 PM", activity: "Prepping logs for Saturday", emoji: "🗂️" },
        { time: "9:00 PM", activity: "Soft playlist + faint smile at her name", emoji: "🫠" },
        { time: "11:00 PM", activity: "Late night YouTube / thinking", emoji: "📹" },
      ],
      saturday: [
        { time: "6:30 AM", activity: "Wake slow. No alarms today", emoji: "😌" },
        { time: "8:00 AM", activity: "Browse saved stuff / clean room", emoji: "🧹" },
        { time: "9:00 AM", activity: "Random side project work", emoji: "🔧" },
        { time: "11:00 AM", activity: "Chores + light banter with fam", emoji: "🧼" },
        { time: "1:00 PM", activity: "Lunch. Sometimes I wish I could text her", emoji: "🍲" },
        { time: "3:00 PM", activity: "Work session / playlist on loop", emoji: "🔁" },
        { time: "6:00 PM", activity: "Maybe a walk. Maybe overthinking", emoji: "🚶" },
        { time: "8:00 PM", activity: "Night edit / photos / low-key vibe", emoji: "📸" },
        { time: "10:00 PM", activity: "Sleep playlist. Just existing", emoji: "🌌" },
      ],
      sunday: [
        { time: "8:00 AM", activity: "Wake slow. Coffee + sit in silence", emoji: "☕" },
        { time: "9:00 AM", activity: "Review calendar / reset brain", emoji: "📅" },
        { time: "11:00 AM", activity: "Writing, scripting, low volume music", emoji: "📖" },
        { time: "1:00 PM", activity: "Lunch + calm conversations", emoji: "🍛" },
        { time: "3:00 PM", activity: "Review week, maybe stare at old messages", emoji: "📂" },
        { time: "5:00 PM", activity: "Short walk / think / plan week", emoji: "🗺️" },
        { time: "7:00 PM", activity: "System check: mental + digital", emoji: "🧾" },
        { time: "9:00 PM", activity: "Weekend closeout. Message drafts stay unsent", emoji: "📮" },
        { time: "10:30 PM", activity: "Sleep with a small hope loop", emoji: "🌠" },
      ],
    },

    // Personality
    quotesYouSay: [
      "I really like her. No drama, just facts.",
      "Paathu panikalam – we'll handle it when it comes.",
      "Seri, veetuku po – I'm done talking about it.",
      "Vera level da – can’t lie, she’s different.",
      "Avlothaan po – maybe that’s how it ends, maybe not.",
    ],

    // Skills
    skills: [
      {
        category: "Frontend",
        items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
      },
      {
        category: "Design",
        items: ["Figma", "Framer", "Prototyping", "Design Systems", "UI/UX"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Python", "PostgreSQL", "API Design", "GraphQL"],
      },
      {
        category: "Tools",
        items: ["Git", "Docker", "Vercel", "Linear", "Notion"],
      },
    ],
  },

  work: {
    visible: true,
  },

  navigation: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/work",
      label: "Work",
    },
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: "/gallery",
      label: "Gallery",
    },
    {
      href: "/resources",
      label: "Resources",
    },
  ],

  blog: {
    visible: true,
    posts: [
      {
        id: "1",
        title: "Building Design Systems That Scale",
        excerpt: "Lessons learned from building and maintaining design systems across multiple products and teams.",
        date: "2024-01-15",
        readTime: "8 min read",
        tags: ["design-systems", "react", "figma"],
        url: "https://blog.kaushik.dev/design-systems-scale",
      },
      {
        id: "2",
        title: "The Art of Code Reviews",
        excerpt: "How to give and receive feedback that improves code quality and team collaboration.",
        date: "2024-01-08",
        readTime: "6 min read",
        tags: ["code-review", "team", "best-practices"],
        url: "https://blog.kaushik.dev/art-of-code-reviews",
      },
      {
        id: "3",
        title: "Designing for Developers",
        excerpt: "Understanding the developer experience and creating tools that developers actually want to use.",
        date: "2024-01-01",
        readTime: "10 min read",
        tags: ["dx", "tools", "design"],
        url: "https://blog.kaushik.dev/designing-for-developers",
      },
    ],
  },

  gallery: {
    visible: true,
    items: [
      {
        id: "1",
        title: "Workspace Setup",
        description: "My minimal home office setup",
        image: "/placeholder.svg?height=250&width=300",
        category: "workspace",
      },
      {
        id: "2",
        title: "UI Explorations",
        description: "Daily UI challenge submissions",
        image: "/placeholder.svg?height=250&width=300",
        category: "design",
      },
      {
        id: "3",
        title: "Code Snippets",
        description: "Beautiful code screenshots",
        image: "/placeholder.svg?height=250&width=300",
        category: "code",
      },
      {
        id: "4",
        title: "Typography Study",
        description: "Font pairing experiments",
        image: "/placeholder.svg?height=250&width=300",
        category: "design",
      },
      {
        id: "5",
        title: "Terminal Themes",
        description: "Custom terminal configurations",
        image: "/placeholder.svg?height=250&width=300",
        category: "code",
      },
      {
        id: "6",
        title: "Sketch Notes",
        description: "Hand-drawn design concepts",
        image: "/placeholder.svg?height=250&width=300",
        category: "sketches",
      },
    ],
  },
}
