export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  body: string
}

const blogPostsData: BlogPost[] = [
  {
    slug: "building-design-systems-that-scale",
    title: "Building Design Systems That Scale",
    description:
      "Lessons learned from building and maintaining design systems across multiple products and teams. How to create components that grow with your organization.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["design-systems", "react", "figma", "scaling"],
    body: `
# Building Design Systems That Scale

Design systems are more than just a collection of components—they're the foundation of consistent, scalable product development. After building and maintaining design systems across multiple products and teams, I've learned some valuable lessons about what makes them successful.

## The Foundation: Principles Over Pixels

The most successful design systems start with **clear principles**, not components. Before diving into button variants and color palettes, establish:

- **Design principles** that guide decision-making
- *Brand values* that inform aesthetic choices  
- ***User experience goals*** that drive functionality

> "A design system is a living, breathing thing that evolves with your product and team." - Brad Frost

## Component Architecture

When building components, think in systems:

\`\`\`tsx
// Good: Flexible, composable
<Button variant="primary" size="large" icon={<Icon />}>
  Submit Form
</Button>

// Better: Semantic, purposeful
<SubmitButton loading={isSubmitting}>
  Create Account
</SubmitButton>
\`\`\`
`
  }
  // Add the rest of the blog posts here
];

// Function to get blog posts for static site generation
export function getBlogPosts(): BlogPost[] {
  return blogPostsData;
}

// Export for backward compatibility
export const blogPosts = blogPostsData;
