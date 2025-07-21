export interface ResourceItem {
  title: string;
  fileLink: string;
  password: string;
  description?: string;
}

export const resources: ResourceItem[] = [
  // Example:
  // {
  //   title: "Sample PDF",
  //   fileLink: "https://github.com/yourusername/yourrepo/raw/main/sample.pdf",
  //   password: "1234",
  //   description: "A sample PDF file for testing.",
  // },
  {
    title: "back to friends - Sombr",
    fileLink: "https://github.com/veloxineology/portfolio/raw/main/resources/sombr%20-%20back%20to%20friends.mp3",
    password: "sombr",
    description: "A chill track by Sombr. Download requires password.",
  },
]; 