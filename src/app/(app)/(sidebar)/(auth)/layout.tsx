import type { PropsWithChildren } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return children;
}
