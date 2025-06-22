export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  emoji: string
  tags: string[]
  demoLink?: string
  repoLink?: string
}

export const projectsData: Project[] = [
  {
    slug: "ghostgms",
    title: "GhostGMS",
    description:
      "Optimize Google Mobile Services for better battery life, privacy, and performance using module.",
    tech: ["Magisk", "Optimization", "Battery Saving"],
    emoji: "🎨",
    tags: ["GMS", "Magisk", "Module"],
    demoLink: "https://ghostgms.vercel.app",
    repoLink: "https://github.com/veloxineology/ghostgms",
  },
  {
    slug: "d17",
    title: "D17 - Interactive Piano & MIDI Player",
    description:
      "A beautiful, feature-rich web-based piano application built with Next.js, featuring realistic piano sounds, MIDI playback with stunning visualizations, and an intuitive user interface that works seamlessly across all devices.",
    tech: ["TypeScript", "CSS", "JavaScript", "Next.js"],
    emoji: "🌙",
    tags: ["vscode", "interactive", "piano"],
    demoLink: "https://d17-gamma.vercel.app",
    repoLink: "https://github.com/veloxineology/d17",
  },
  {
    slug: "elysium",
    title: "ElysiumPhotos",
    description:
      "ElysiumPhotos enables unlimited Google Photos backup by bypassing storage limitations and enforcing original quality uploads.",
    tech: ["Shell"],
    emoji: "📚",
    tags: ["backup", "mod", "photos"],
    demoLink: "https://github.com/veloxineology/ElysiumPhotos",
    repoLink: "https://github.com/veloxineology/ElysiumPhotos",
  },
  {
    slug: "serenote",
    title: "Serenote",
    description:
      "Write your text, serenote it, and export it like it’s your next chaotic album drop. This tool turns your sass, shade, and slay into bold BRAT-style art — all in the browser.",
    tech: ["Svelte", "TypeScript", "JavaScript", "HTML", "CSS"],
    emoji: "💼",
    tags: ["generator", "template", "interactive"],
    demoLink: "https://serenote123.vercel.app",
    repoLink: "https://github.com/veloxineology/serenote",
  },
  {
    slug: "kernel",
    title: "android_kernel_nothing_sm8475",
    description:
      "Linux kernel - Automated Kernel Compilation and Release",
    tech: ["lpunpack"],
    emoji: "⚡",
    tags: ["np2", "kernel", "arter97"],
    demoLink: "https://github.com/veloxineology/android_kernel_nothing_sm8475",
    repoLink: "hhttps://github.com/veloxineology/android_kernel_nothing_sm8475",
  },
  {
    slug: "wavemotion",
    title: "WaveMotion",
    description:
      "High Level Audio Visuaizer",
    tech: ["TypeScript", "CSS", "JavaScript", "npm"],
    emoji: "🎯",
    tags: ["icons", "library", "design"],
    demoLink: "https://wavemotion.vercel.app",
    repoLink: "https://github.com/veloxineology/WaveMotion",
  },
  {
    slug: "key-muse",
    title: "KeyMuse",
    description: "Basic Piano Made With Tone Generators",
    tech: ["JavaScript", "Tailwind CSS", "TypeScript", "CSS"],
    emoji: "🧩",
    tags: ["ui", "piano", "interactive"],
    demoLink: "https://key-muse.vercel.app",
    repoLink: "https://github.com/veloxineology/KeyMuse",
  },
]
