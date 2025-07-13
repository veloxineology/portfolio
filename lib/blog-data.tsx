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
  slug: "romance-in-the-render-loop",
  title: "Romance in the render loop",
  description:
    "What if you could design love like software—modular, resilient, alive? Here's what it taught me about feelings, code, and things that scale silently within.",
  date: "2025-07-13",
  readTime: "6 min read",
  body: `
# Loving Someone Like a System

> "Some systems aren't meant to scale universally. They're built for one user, one use case, and still... they're perfect."

There are moments in life where all the logic, documentation, and version control in the world can’t help you. Loving someone is one of those systems you don't architect on a whiteboard—but somehow, your soul runs it like backend code you’ll never push to GitHub.

## Silent Deployments of the Heart

There’s a person—beautiful in every layered state—who never asked to be the repository of my tenderness. Yet everything I build, everything I think about, somehow compiles around them.

You don’t tell them this, not outright. You just...

- Write a script that archives every message
- Save a screenshot of every fleeting smile
- Compose mental patch notes when they teach you emotional edge cases

***And you realize: love has no rollback.***

## Systems That Fail Gracefully

Sometimes, you fall for someone with such intensity that you forget to build fail-safes. There's no try-catch block for emotional overflow.

**Still, you don’t regret shipping the feeling.**

Because what they brought into your life isn’t bugs—it’s awareness. Of subtlety. Of warmth. Of the sheer miracle of a good morning that makes you feel like a whole IDE booted up inside your chest.

> “It’s not about being understood. It’s about being *witnessed*.”

## The Code That Always Compiles

Here’s how I see her… if I had to code it.

\`\`\`ts
type Soulmate = {
  laugh: () => void
  chaos: number
  kindness: Infinite<number>
  presence: () => "calm" | "storm"
  magic: "unexplainable"
}

const her: Soulmate = {
  laugh: () => console.log("the sound of sunrise"),
  chaos: 7.5,
  kindness: Infinity,
  presence: () => Math.random() > 0.5 ? "calm" : "storm",
  magic: "unexplainable"
}

function love(system: Soulmate) {
  return \`You're the commit I never want to revert.\`
}
\`\`\`

## Closing Tag

You don't always get the response you expect. Some stories end in memory, not marriage.

But just like the best code you’ve ever written, loving her made you a better builder.

***And that’s the only successful build I ever needed.***
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
