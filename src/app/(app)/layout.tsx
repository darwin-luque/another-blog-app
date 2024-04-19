import { NavbarLayout } from "@/layouts/navbar";
interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <NavbarLayout>
        {children}
    </NavbarLayout>
  );
}
