import { type PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";

export default function MyBlogsLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">My Blogs</h2>
          <p className="text-sm text-muted-foreground">
            Here are all the blogs you&apos;ve written.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      {children}
    </main>
  );
}
