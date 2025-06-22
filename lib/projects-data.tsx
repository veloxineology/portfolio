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
    slug: "design-system-kit",
    title: "Design System Kit",
    description:
      "A comprehensive design system with React components, design tokens, and documentation. Built for scalability and consistency across multiple products.",
    tech: ["React", "TypeScript", "Storybook", "Figma", "Tailwind CSS"],
    emoji: "🎨",
    tags: ["design-system", "react", "typescript"],
    demoLink: "https://design-system.kaushik.dev",
    repoLink: "https://github.com/kaushik/design-system",
  },
  {
    slug: "code-editor-theme",
    title: "Minimal Dark Theme",
    description:
      "A carefully crafted dark theme for VS Code with optimized syntax highlighting and reduced eye strain for long coding sessions.",
    tech: ["JSON", "VS Code API", "Color Theory", "Design"],
    emoji: "🌙",
    tags: ["vscode", "theme", "design"],
    demoLink: "https://marketplace.visualstudio.com/items?itemName=kaushik.minimal-dark",
    repoLink: "https://github.com/kaushik/vscode-theme",
  },
  {
    slug: "api-docs-generator",
    title: "API Documentation Tool",
    description:
      "Interactive API documentation generator with live examples, testing capabilities, and beautiful responsive design.",
    tech: ["Next.js", "MDX", "OpenAPI", "Tailwind", "TypeScript"],
    emoji: "📚",
    tags: ["api", "documentation", "nextjs"],
    demoLink: "https://api-docs.kaushik.dev",
    repoLink: "https://github.com/kaushik/api-docs",
  },
  {
    slug: "portfolio-template",
    title: "Developer Portfolio",
    description:
      "A clean, developer-focused portfolio template with dark mode, responsive design, and smooth animations.",
    tech: ["React", "Framer Motion", "Tailwind", "TypeScript", "Next.js"],
    emoji: "💼",
    tags: ["portfolio", "template", "react"],
    demoLink: "https://portfolio-template.kaushik.dev",
    repoLink: "https://github.com/kaushik/portfolio-template",
  },
  {
    slug: "terminal-dashboard",
    title: "Terminal Dashboard",
    description:
      "A terminal-inspired dashboard for monitoring system metrics, logs, and application performance in real-time.",
    tech: ["Node.js", "WebSocket", "Chart.js", "Express", "Docker"],
    emoji: "⚡",
    tags: ["dashboard", "monitoring", "nodejs"],
    demoLink: "https://terminal.kaushik.dev",
    repoLink: "https://github.com/kaushik/terminal-dashboard",
  },
  {
    slug: "icon-library",
    title: "Minimal Icon Library",
    description:
      "A collection of 200+ minimal, consistent icons for web and mobile applications. Available as React components and SVGs.",
    tech: ["SVG", "React", "Figma", "npm", "TypeScript"],
    emoji: "🎯",
    tags: ["icons", "library", "design"],
    demoLink: "https://icons.kaushik.dev",
    repoLink: "https://github.com/kaushik/icons",
  },
  {
    slug: "automation-scripts",
    title: "Dev Automation Scripts",
    description:
      "Collection of useful automation scripts for development workflows, deployment, and system maintenance.",
    tech: ["Python", "Bash", "GitHub Actions", "Docker"],
    emoji: "🤖",
    tags: ["automation", "scripts", "devops"],
    repoLink: "https://github.com/kaushik/automation-scripts",
  },
  {
    slug: "ui-components",
    title: "Reusable UI Components",
    description: "A library of beautiful, accessible UI components built with React and styled with Tailwind CSS.",
    tech: ["React", "Tailwind CSS", "TypeScript", "Storybook"],
    emoji: "🧩",
    tags: ["ui", "components", "react"],
    demoLink: "https://ui.kaushik.dev",
    repoLink: "https://github.com/kaushik/ui-components",
  },
]
