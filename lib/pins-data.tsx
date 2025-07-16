export interface Pin {
  id: number;
  name: string;
  designation: string;
  content: string; // markdown
}

export const pins: Pin[] = [
  {
    id: 1,
    name: "Ada Lovelace",
    designation: "First Computer Programmer",
    content: `**Mathematics is the language of nature.**\n\n> The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.\n\n\`\`\`python\ndef hello_world():\n    print('Hello, world!')\n\`\`\``
  },
  {
    id: 2,
    name: "Alan Turing",
    designation: "Father of Computer Science",
    content: `*Sometimes it is the people no one can imagine anything of who do the things no one can imagine.*\n\n- Invented the Turing Machine\n- Broke the Enigma code\n\n\`\`\`text\nTuring Award\n\`\`\``
  }
]; 