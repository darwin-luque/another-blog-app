"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export const ThemedClerkProvider: typeof ClerkProvider = (props) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        baseTheme: theme === "dark" ? dark : undefined,
      }}
      {...props}
    />
  );
};
