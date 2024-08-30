import { LatestPost } from "@/app/_components/post";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen items-center justify-center">
        <div className="absolute left-[50%] top-[50%] z-[-1] h-[400px] w-[590px] translate-x-[-50%] translate-y-[-50%] rounded-[100%] bg-[#e626fd] blur-[90px]"></div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]"> {siteConfig.name}</span>
            <Icons.logo className="h-16 w-16" />
            <ThemeToggle />
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>

          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
