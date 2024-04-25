import type { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";

export default function BookmarksLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            My Bookmarks
          </h2>
          <p className="text-sm text-muted-foreground">
            Here are all you&apos;re bookmarks.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      {children}
    </main>
  );
}
