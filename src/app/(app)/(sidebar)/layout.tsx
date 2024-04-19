import type { PropsWithChildren } from "react";
import { SidebarLayout as Sidebar } from "@/layouts/sidebar";

export default function SidebarLayout({ children }: PropsWithChildren) {
  return <Sidebar>{children}</Sidebar>;
}
