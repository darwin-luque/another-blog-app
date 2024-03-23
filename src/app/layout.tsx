import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { NavbarLayout } from "../layouts/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Another Blog App",
  description: "This is yet another blog app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavbarLayout>{children}</NavbarLayout>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
