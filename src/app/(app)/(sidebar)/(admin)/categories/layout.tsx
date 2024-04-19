import { type PropsWithChildren } from "react";
import { PagePosition } from "@/components/page-position";

const positionItems = [{ name: "Admin" }, { name: "Categories" }];

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <PagePosition items={positionItems} />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of categories in the platform. You can manage
            them here.
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
