import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    CLERK_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_DEFAULT_ORGANIZATION_ID: z.string().default("1"),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().default("/"),
    NEXT_PUBLIC_CLERK_SIGN_OUT_URL: z.string().default("/"),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().default("/"),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default("/"),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default("/"),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_OUT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_OUT_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_DEFAULT_ORGANIZATION_ID: process.env.NEXT_PUBLIC_DEFAULT_ORGANIZATION_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
