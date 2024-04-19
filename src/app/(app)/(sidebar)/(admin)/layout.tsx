import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { ReactNode, PropsWithChildren } from "react";

export default function AdminLayout({
  children,
}: PropsWithChildren): ReactNode {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/");
  }

  return <>{children}</>;
}
