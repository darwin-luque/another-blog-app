import type { FC, PropsWithChildren } from "react";
import { Sidebar } from "@/components/sidebar";

export const SidebarLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-background flex-1 flex">
      <div className="grid lg:grid-cols-5">
        <Sidebar className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-4 lg:border-l overflow-auto">
          <div className="px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
};
