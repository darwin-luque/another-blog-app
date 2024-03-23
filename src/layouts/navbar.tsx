import type { FC, PropsWithChildren } from "react";
import { Navbar } from "../components/navbar";

export const NavbarLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="hidden h-screen w-screen flex-col md:flex">
      <Navbar />
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
};
