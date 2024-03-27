import type { FC, PropsWithChildren } from "react";
import { Navbar } from "../components/navbar";

export const NavbarLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="hidden h-screen w-screen flex-col md:flex">
      <Navbar />
      <div className="flex-1 flex space-y-4 overflow-auto">{children}</div>
    </div>
  );
};
