import { ScrollArea } from "@/components/ui/scroll-area";
import { Editor } from "@/components/editor";

export default async function Create() {
  return (
    <main className="flex h-full w-full">
      <ScrollArea className="flex-1 flex">
        <Editor />
      </ScrollArea>
    </main>
  );
}
