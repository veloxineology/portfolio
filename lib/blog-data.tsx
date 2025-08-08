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
    tags: ["people"],
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
  },
  {
    slug: "aesthetic-memories-and-fading-silhouettes",
    title: "Aesthetic Memories and Fading Silhouettes",
    description:
      "When someone becomes a part of your personal gallery, their absence still hangs on the wall—just blurred, muted, or replaced by empty space.",
    date: "2025-08-08",
    tags: ["feelings", "aesthetic", "loss"],
    readTime: "5 min read",
    body: `
# The Art of Keeping Someone Who’s Leaving

> "Sometimes the most beautiful picture is the one you can’t fully see anymore."

There’s this strange comfort in candid moments—the kind that feel unposed, accidental, yet impossibly perfect. Like a blurry photo you took in passing, only to realize years later that it’s your favorite.

The cover art of *linger* by *i don't like mirrors* is exactly that feeling:  
A real place, a real moment… but someone’s been cut out. Not maliciously. Just—gone.

## Why We Keep Empty Spaces

People always talk about moving on as if erasing is the only way forward. But maybe, sometimes, it’s okay to let their outline stay in the frame.  
Because the silhouette still tells a story. It says:

- *Someone mattered here.*
- *They made this scene worth remembering.*
- *Even if they’re not here now, the light they brought is.*

Keeping the space they occupied is its own kind of art. Not clinging. Not replacing. Just… acknowledging.

## The Aesthetic of Unfinished Love

Love, especially unreciprocated, is a little like those candid pictures: raw, imperfect, but too real to throw away.  

You might know the ending before it happens—counting down days until the message reads *“this won’t work out”*. But you still keep showing up, like a photographer chasing the last bit of sunset.

***Because even if the light fades, the photograph still exists.***

## The Fade Effect

In design, there’s something called the **masking** or **cutout effect**—you remove part of an image, leaving only an outline.  
In life, it’s what happens when someone leaves but your memories keep their shape.

Maybe your heart works like Photoshop layers:  
- Background: the life you keep living  
- Foreground: the memories you can’t delete  
- Mask: the shape of them, still here, still gone

> “A silhouette can be lonelier than emptiness—because it proves something *was* there.”

## Closing Frame

If I ever change my profile picture, I’d want it to look like that cover art. Not because I’m hiding the pain, but because I’m letting it be part of the art.  

When someone’s gone, all you can do is honor the fact they were here.  
And maybe that’s the most candid thing of all.
`
  }
//add blog posts here
];

// Function to get blog posts for static site generation
export function getBlogPosts(): BlogPost[] {
  return blogPostsData;
}

// Export for backward compatibility
export const blogPosts = blogPostsData;
