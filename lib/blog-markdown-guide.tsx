"use client"

/**
 * Blog Markdown Syntax Guide
 *
 * This file documents all the supported markdown syntax for blog posts.
 * Use these patterns in your blog post body content in lib/blog-data.tsx
 */

export const markdownSyntaxGuide = {
  // HEADINGS
  headings: {
    syntax: `
# Main Heading (H1)
## Section Heading (H2) 
### Subsection Heading (H3)
#### Minor Heading (H4)
    `,
    description: "Use # for headings. More # = smaller heading",
  },

  // TEXT FORMATTING
  textFormatting: {
    syntax: `
**Bold text**
*Italic text*
***Bold and italic text***
~~Strikethrough text~~
\`Inline code\`
    `,
    description: "Format text with asterisks, tildes, and backticks",
  },

  // QUOTES
  quotes: {
    syntax: `
> This is a blockquote
> It can span multiple lines
> And will be styled with a left border

> **Pro tip:** You can use formatting inside quotes too!
    `,
    description: "Use > at the start of lines for blockquotes",
  },

  // LISTS
  lists: {
    syntax: `
// Unordered lists
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

// Ordered lists  
1. First step
2. Second step
   1. Sub-step
   2. Another sub-step
3. Third step

// Mixed formatting in lists
- **Important item** with bold text
- *Emphasized item* with italics
- \`Code item\` with inline code
    `,
    description: "Use - or * for bullets, numbers for ordered lists",
  },

  // CODE BLOCKS
  codeBlocks: {
    syntax: `
// Basic code block
\`\`\`
function hello() {
  console.log("Hello, world!");
}
\`\`\`

// Code block with language syntax highlighting
\`\`\`javascript
const greeting = (name) => {
  return \`Hello, \${name}!\`;
};
\`\`\`

// TypeScript example
\`\`\`tsx
interface Props {
  title: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};
\`\`\`

// CSS example
\`\`\`css
.button {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}
\`\`\`
    `,
    description: "Use triple backticks for code blocks. Add language for syntax highlighting",
  },

  // LINKS
  links: {
    syntax: `
[Link text](https://example.com)
[Link with title](https://example.com "This is a title")
    `,
    description: 'Format: [text](url) or [text](url "title")',
  },

  // HORIZONTAL RULES
  horizontalRules: {
    syntax: `
---
***
___
    `,
    description: "Use three dashes, asterisks, or underscores for horizontal lines",
  },

  // ADVANCED FORMATTING
  advanced: {
    syntax: `
// Combining multiple formats
> **Important Quote:** *This is a quote with both bold and italic text, plus some \`inline code\`.*

// Code with explanation
Here's how to create a React component:

\`\`\`tsx
const MyComponent = ({ title }: { title: string }) => {
  return (
    <div className="component">
      <h1>{title}</h1>
    </div>
  );
};
\`\`\`

**Key points:**
- Uses TypeScript for type safety
- Destructures props in the parameter
- Returns JSX with proper className

// Lists with code
1. **Install dependencies:**
   \`\`\`bash
   npm install react typescript
   \`\`\`

2. **Create component:**
   \`\`\`tsx
   export const Button = () => <button>Click me</button>;
   \`\`\`

3. **Use in your app:**
   \`\`\`tsx
   import { Button } from './Button';
   
   function App() {
     return <Button />;
   }
   \`\`\`
    `,
    description: "Combine different markdown elements for rich content",
  },

  // SPECIAL CHARACTERS
  specialCharacters: {
    syntax: `
// To show literal markdown characters, escape with backslash:
\\*This won't be italic\\*
\\# This won't be a heading
\\\`This won't be code\\\`

// HTML entities for special symbols:
&copy; → ©
&trade; → ™  
&reg; → ®
&mdash; → —
&ndash; → –
&hellip; → …
    `,
    description: "Escape special characters with backslash or use HTML entities",
  },
}

// EXAMPLE BLOG POST TEMPLATE
export const exampleBlogPost = `
# My Awesome Blog Post

This is the introduction paragraph with some **bold text** and *italic text*.

## Main Section

Here's a quote from someone important:

> "The best way to predict the future is to invent it." - Alan Kay

### Code Example

Let me show you some code:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: Math.random(),
    ...userData
  };
};
\`\`\`

### Key Features

- **Type Safety:** Full TypeScript support
- *Performance:* Optimized for speed  
- ***Developer Experience:*** Great tooling and docs

### Step-by-Step Guide

1. **First step** - Do this thing
   \`\`\`bash
   npm install awesome-package
   \`\`\`

2. **Second step** - Configure it
   \`\`\`json
   {
     "config": {
       "awesome": true
     }
   }
   \`\`\`

3. **Final step** - Use it in your code

## Conclusion

That's how you create ***amazing*** content with proper formatting!

---

*Thanks for reading! Share this post if you found it helpful.*
`

// USAGE INSTRUCTIONS
export const usageInstructions = `
HOW TO USE THIS MARKDOWN SYNTAX:

1. Open lib/blog-data.tsx
2. Find the blog post you want to edit
3. Update the 'body' field with your markdown content
4. Use the syntax examples above for formatting
5. Save the file - changes will appear immediately

SUPPORTED LANGUAGES FOR CODE BLOCKS:
- javascript, js
- typescript, tsx, ts  
- css, scss, sass
- html, xml
- json
- bash, shell
- python, py
- java
- cpp, c++
- php
- sql
- yaml, yml
- markdown, md

TIPS:
- Always preview your content after making changes
- Use consistent heading hierarchy (don't skip levels)
- Keep code blocks concise and focused
- Use quotes for important callouts
- Combine formatting for emphasis (***bold italic***)
`
