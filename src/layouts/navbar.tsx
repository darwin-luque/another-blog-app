import { Rss } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { Search } from "@/components/navbar/search";
import { ModeToggle } from "../components/ui/mode-toggle";

export const NavbarLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <Rss className="h-5 w-5 font-bold" />
            <h1 className="text-xl font-bold tracking-tight">
              Yet Another Blog App
            </h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
};
