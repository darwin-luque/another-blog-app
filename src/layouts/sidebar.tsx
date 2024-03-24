import type { FC, PropsWithChildren } from "react";
import { Sidebar } from "@/components/sidebar";

export const SidebarLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-background h-full">
      <div className="grid lg:grid-cols-5 h-full">
        <Sidebar className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
};
