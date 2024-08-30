import { env } from "@/env";
import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "CodexLin",
  author: "CodexLin",
  description:
    "Next.js 14+ t3 starter template with app router, shadcn/ui, typesafe env, icons and configs setup.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui", "t3"],
  url: {
    // base: env.NEXT_PUBLIC_APP_URL,
    author: "CodexLin",
  },
  links: {
    github: "https://github.com/codexlin",
  },
  //   ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
};
