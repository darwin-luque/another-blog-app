import { type PropsWithChildren } from "react";
import { CategoriesSearchInput } from "@/components/categories/search-input";
import { Separator } from "@/components/ui/separator";

export default function CategoriesLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">By Genre</h2>
          <p className="text-sm text-muted-foreground">
            Find your favorite genre and explore the latest posts
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <CategoriesSearchInput />
      {children}
    </main>
  );
}
