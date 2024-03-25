"use client";

import type { FC } from "react";
import Focus from "@tiptap/extension-focus";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import { useEditor, EditorContent } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { MenuBar } from "./menu-bar";

export const Editor: FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
      Focus.configure({
        className: 'outline-none',
      }),
      Highlight,
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm m-5 focus:outline-none',
      },
    },
    content: `
      <p>Hello World! 🌍️</p>
    `,
  });

  return (
    <div className="flex flex-1 flex-col space-y-4">
      <div>
        {editor ? <MenuBar editor={editor} /> : null}
        <Separator />
      </div>
      <EditorContent
        editor={editor}
        className="flex-auto overflow-y-auto overflow-x-hidden px-4 py-5 [-webkit-overflow-scrolling:touch]"
      />
    </div>
  );
};
