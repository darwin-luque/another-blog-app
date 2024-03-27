import { Editor } from "@/components/editor";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Create() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <main className="relative flex flex-1 flex-col">
      <Editor />
    </main>
  );
}
