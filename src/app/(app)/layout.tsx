import { NavbarLayout } from "@/layouts/navbar";
import { SidebarLayout } from "@/layouts/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <NavbarLayout>
      <SidebarLayout>
        <main className="flex-1">{children}</main>
      </SidebarLayout>
    </NavbarLayout>
  );
}
