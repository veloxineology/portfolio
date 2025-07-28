import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaushik S - Student & Developer Portfolio",
  description:
    "Poet at heart, with an obsessive devotion to precision—every word, every pixel, placed with purpose. Explore my software projects, poetry, blog, and innovations.",
  keywords: [
    // Name & Branding
    "kaushikieee", "kaushik ieee", "kaushikieee.me", "kaushikieee portfolio", "kaushikieee personal site",
    "kaushik ieee developer", "kaushik ieee blog", "kaushik ieee student", "kaushik ieee github",
    "kaushik s portfolio", "kaushik s website", "kaushik s developer", "kaushik s full stack",
    "kaushik s poet", "kaushik s open source", "kaushik s projects",

    // Projects & Tags
    "veloxineology", "veloxineologylabs", "veloxineology labs github", "ghostgms", "gms optimizer",
    "HomeLifeSync", "Echo music extensions", "tanalyseAI", "Magisk module developer",

    // Skills & Stack
    "student developer india", "indian web developer", "11th grade developer", "frontend developer",
    "backend developer", "full stack engineer", "software engineer", "creative coder", "kotlin developer",
    "bash scripting", "macrodroid automation", "raspberry pi server", "AI integration developer",

    // Tech Tools
    "HTML CSS JavaScript NextJS", "Markdown portfolio", "Framer Motion developer", "Tailwind developer",
    "Nothing Phone 2 optimization", "custom rom flasher script", "Github Pages portfolio",

    // Unique Traits
    "developer poet", "obsessive precision developer", "minimalist portfolio", "clean aesthetic website",
    "developer with deep dark academia vibe", "nerdy fun portfolio", "developer with passion for writing",

    // Location Relevance
    "developer in Chennai", "portfolio made in India", "indian student programmer", "indian creative coder",

    // Social/Reach
    "kaushikieee github", "veloxineology github", "kaushikieee contact", "kaushikieee resume"
  ],
  metadataBase: new URL("https://kaushikieee.me"),
  alternates: {
    canonical: "https://kaushikieee.me",
  },
  authors: [
    {
      name: "Kaushik S",
      url: "https://github.com/veloxineology",
    },
  ],
  creator: "Kaushik S",
  publisher: "Kaushik S",
  openGraph: {
    title: "Kaushik S - Student & Developer Portfolio",
    description:
      "Explore my journey in full-stack development, creative writing, and technology. Discover precision-crafted projects and poetic passion.",
    url: "https://kaushikieee.me",
    siteName: "Kaushik S Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", // use /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Kaushik S Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaushik S - Portfolio",
    description: "Student. Developer. Poet. Building with heart and precision.",
    images: ["/og-image.jpg"],
    site: "@kaushikieee",      // optional, if you have a Twitter/X account
    creator: "@kaushikieee",   // same here
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code", // mgiht use when i change domains 
  //   other: {
  //     "yandex-verification": "your-yandex-code",
  //     "bing-verification": "your-bing-code",
  //   },
  // },
  icons: {
    icon: "/favicon.png", // from public/
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};