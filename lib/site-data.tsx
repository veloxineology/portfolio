export const siteData = {
  home: {
    name: "Kaushik S",
    tagline: "Design Engineer",
    greetingEmoji: "👋",
    location: "📍 Chennai, India",
    description:
      "System-focused developer and design engineer passionate about automation, minimalism, and creating seamless digital experiences. Obsessed with clean architecture, purposeful design, and making tech feel like magic.",
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
    ],
    social: {
      github: "https://github.com/kaushik",
      instagram: "https://instagram.com/kaushik",
      snapchat: "https://snapchat.com/add/kaushik",
      email: "hello@kaushik.dev",
    },
    calendarLink: "https://cal.com/kaushik",
  },

  about: {
    visible: true,
    introLine: "Hey there! I'm a design engineer who loves building things that make people's lives better.",
    longBio:
      "I'm Kaushik, a design engineer with 5+ years of experience building products that users love. I started as a frontend developer and gradually moved into design, finding my sweet spot at the intersection of both disciplines. I believe great products come from understanding both the technical constraints and user needs. Currently focused on building design systems and developer tools, particularly interested in how AI can enhance the design-to-code workflow.",
    location: "San Francisco, CA (Asia/Kolkata timezone)",
    signatureEmoji: "🧠✨",
    profileImage: "/placeholder.svg?height=120&width=120",

    // Spotify integration
    nowPlaying: {
      enabled: true,
      fallbackMessage: "Not playing",
    },

    // Music preferences
    favoriteGenres: ["Lo-fi Hip Hop", "Synthwave", "Ambient", "Jazz Fusion", "Electronic"],
    topSongs: [
      "Resonance - HOME",
      "Midnight City - M83",
      "Strobe - Deadmau5",
      "Porcelain - Moby",
      "Teardrop - Massive Attack",
    ],

    // Entertainment
    favoriteMovies: ["Blade Runner 2049", "Her", "The Matrix", "Interstellar", "Ex Machina"],
    toWatchList: ["Dune: Part Two", "Everything Everywhere All at Once", "The Menu", "Glass Onion"],
    favoriteBooks: ["Clean Code", "Design Patterns", "The Pragmatic Programmer", "Don't Make Me Think"],

    // Personal details
    funFacts: [
      "Sent a message on NASA's Perseverance rover",
      "Built my first computer at age 12",
      "Can solve a Rubik's cube in under 2 minutes",
      "Speaks 4 programming languages fluently",
      "Once debugged code for 18 hours straight",
      "Has a collection of 50+ mechanical keyboards",
    ],

    // Weekly routine - different for each day
    weeklyRoutine: {
      monday: [
        { time: "6:00 AM", activity: "Wake up & coffee", emoji: "☕" },
        { time: "7:00 AM", activity: "Morning workout", emoji: "🏃" },
        { time: "9:00 AM", activity: "Deep work & coding", emoji: "💻" },
        { time: "12:00 PM", activity: "Lunch & team sync", emoji: "🍽️" },
        { time: "2:00 PM", activity: "Meetings & collaboration", emoji: "🤝" },
        { time: "5:00 PM", activity: "Side projects", emoji: "🚀" },
        { time: "8:00 PM", activity: "Reading & learning", emoji: "📚" },
        { time: "10:00 PM", activity: "Wind down", emoji: "😴" },
      ],
      tuesday: [
        { time: "6:00 AM", activity: "Wake up & coffee", emoji: "☕" },
        { time: "7:30 AM", activity: "Yoga session", emoji: "🧘" },
        { time: "9:00 AM", activity: "Design work", emoji: "🎨" },
        { time: "12:00 PM", activity: "Lunch break", emoji: "🥗" },
        { time: "1:30 PM", activity: "Client calls", emoji: "📞" },
        { time: "4:00 PM", activity: "Code reviews", emoji: "👀" },
        { time: "7:00 PM", activity: "Personal projects", emoji: "⚡" },
        { time: "9:30 PM", activity: "Netflix & chill", emoji: "📺" },
      ],
      wednesday: [
        { time: "6:30 AM", activity: "Sleep in a bit", emoji: "😴" },
        { time: "8:00 AM", activity: "Breakfast & news", emoji: "📰" },
        { time: "9:30 AM", activity: "Focus time", emoji: "🎯" },
        { time: "12:30 PM", activity: "Lunch with team", emoji: "👥" },
        { time: "2:00 PM", activity: "Workshop prep", emoji: "📝" },
        { time: "4:30 PM", activity: "Mentoring session", emoji: "🎓" },
        { time: "7:00 PM", activity: "Cooking dinner", emoji: "👨‍🍳" },
        { time: "9:00 PM", activity: "Gaming time", emoji: "🎮" },
      ],
      thursday: [
        { time: "6:00 AM", activity: "Early bird coding", emoji: "🐦" },
        { time: "8:00 AM", activity: "Protein smoothie", emoji: "🥤" },
        { time: "9:00 AM", activity: "Sprint planning", emoji: "📋" },
        { time: "11:00 AM", activity: "Feature development", emoji: "⚙️" },
        { time: "1:00 PM", activity: "Quick lunch", emoji: "🥪" },
        { time: "3:00 PM", activity: "Bug hunting", emoji: "🐛" },
        { time: "6:00 PM", activity: "Open source contrib", emoji: "🌟" },
        { time: "9:00 PM", activity: "Podcast listening", emoji: "🎧" },
      ],
      friday: [
        { time: "7:00 AM", activity: "Casual wake up", emoji: "😊" },
        { time: "8:30 AM", activity: "Team standup", emoji: "🗣️" },
        { time: "10:00 AM", activity: "Demo preparation", emoji: "🎬" },
        { time: "2:00 PM", activity: "Friday demos", emoji: "🎉" },
        { time: "4:00 PM", activity: "Week retrospective", emoji: "🔄" },
        { time: "6:00 PM", activity: "Happy hour", emoji: "🍻" },
        { time: "8:00 PM", activity: "Date night prep", emoji: "💕" },
        { time: "10:00 PM", activity: "Movie night", emoji: "🍿" },
      ],
      saturday: [
        { time: "9:00 AM", activity: "Lazy morning", emoji: "🛏️" },
        { time: "10:30 AM", activity: "Brunch time", emoji: "🥞" },
        { time: "12:00 PM", activity: "Grocery shopping", emoji: "🛒" },
        { time: "2:00 PM", activity: "Personal projects", emoji: "🔨" },
        { time: "4:00 PM", activity: "Photography walk", emoji: "📸" },
        { time: "7:00 PM", activity: "Dinner with friends", emoji: "👫" },
        { time: "9:30 PM", activity: "Board games", emoji: "🎲" },
        { time: "11:00 PM", activity: "Late night coding", emoji: "🌙" },
      ],
      sunday: [
        { time: "8:00 AM", activity: "Sunday coffee ritual", emoji: "☕" },
        { time: "10:00 AM", activity: "Planning next week", emoji: "📅" },
        { time: "11:30 AM", activity: "Learning new tech", emoji: "🤓" },
        { time: "1:00 PM", activity: "Family video call", emoji: "👨‍👩‍👧‍👦" },
        { time: "3:00 PM", activity: "Blog writing", emoji: "✍️" },
        { time: "5:00 PM", activity: "Meal prep", emoji: "🥘" },
        { time: "7:00 PM", activity: "Relaxation time", emoji: "🧘‍♂️" },
        { time: "9:00 PM", activity: "Early sleep prep", emoji: "🌅" },
      ],
    },

    // Personality
    quotesYouSay: [
      "I love Tanisha ❤️",
      "Is it optimized though?",
      "Let's ship it!",
      "Have you tried turning it off and on again?",
      "It works on my machine 🤷‍♂️",
    ],

    dailyQuote: "The best way to predict the future is to invent it. - Alan Kay",

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
    projects: [
      {
        id: "1",
        title: "Design System Kit",
        description: "A comprehensive design system with React components, design tokens, and documentation.",
        image: "/placeholder.svg?height=200&width=300",
        techStack: ["React", "TypeScript", "Storybook", "Figma"],
        githubUrl: "https://github.com/kaushik/design-system",
        liveUrl: "https://design-system.kaushik.dev",
      },
      {
        id: "2",
        title: "Code Editor Theme",
        description: "A minimal dark theme for VS Code with carefully crafted syntax highlighting.",
        image: "/placeholder.svg?height=200&width=300",
        techStack: ["JSON", "VS Code API", "Color Theory"],
        githubUrl: "https://github.com/kaushik/vscode-theme",
        liveUrl: "https://marketplace.visualstudio.com/items?itemName=kaushik.minimal-dark",
      },
      {
        id: "3",
        title: "API Documentation Tool",
        description: "Interactive API documentation generator with live examples and testing capabilities.",
        image: "/placeholder.svg?height=200&width=300",
        techStack: ["Next.js", "MDX", "OpenAPI", "Tailwind"],
        githubUrl: "https://github.com/kaushik/api-docs",
        liveUrl: "https://api-docs.kaushik.dev",
      },
      {
        id: "4",
        title: "Portfolio Template",
        description: "A clean, developer-focused portfolio template with dark mode and responsive design.",
        image: "/placeholder.svg?height=200&width=300",
        techStack: ["React", "Framer Motion", "Tailwind", "TypeScript"],
        githubUrl: "https://github.com/kaushik/portfolio-template",
        liveUrl: "https://portfolio-template.kaushik.dev",
      },
      {
        id: "5",
        title: "Terminal Dashboard",
        description: "A terminal-inspired dashboard for monitoring system metrics and logs.",
        image: "/placeholder.svg?height=200&width=300",
        techStack: ["Node.js", "WebSocket", "Chart.js", "Express"],
        githubUrl: "https://github.com/kaushik/terminal-dashboard",
        liveUrl: "https://terminal.kaushik.dev",
      },
      {
        id: "6",
        title: "Icon Library",
        description: "A collection of minimal, consistent icons for web and mobile applications.",
        image: "/placeholder.svg?height=200&width=300",
        techStack: ["SVG", "React", "Figma", "npm"],
        githubUrl: "https://github.com/kaushik/icons",
        liveUrl: "https://icons.kaushik.dev",
      },
    ],
  },

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
