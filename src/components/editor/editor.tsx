"use client";

import { useState, type FC } from "react";
import Focus from "@tiptap/extension-focus";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { useEditor, EditorContent } from "@tiptap/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EditorToolbar } from "./toolbar";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export const Editor: FC = () => {
  const [title, setTitle] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");
  const editor = useEditor({
    extensions: [
      TaskList,
      TaskItem,
      Highlight,
      TextAlign,
      StarterKit,
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
      Focus.configure({
        className: "outline-none",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-base m-5 focus:outline-none",
      },
    },
    content: `
      <p>Hello World! 🌍️</p>
    `,
  });

  return (
    <Dialog>
      <ScrollArea className="flex flex-1 flex-col">
        <div className="flex w-full items-center space-x-2 p-1">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="The Title of my Blog"
            className="h-fit flex-1 border-none p-2 text-3xl font-extrabold"
          />
          <DialogTrigger asChild>
            <Button disabled={!title}>Save</Button>
          </DialogTrigger>
        </div>
        <div>
          {editor ? <EditorToolbar editor={editor} /> : null}
          <Separator />
        </div>
        <EditorContent
          editor={editor}
          className="flex-auto overflow-hidden px-4 py-5"
        />
      </ScrollArea>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You are about to create new blog</DialogTitle>
          <DialogDescription>
            Please confirm with the title of your blog before saving. The blog
            will be saved and published immediately.
            <br />
            <sub>*Note: Drafts are not yet implemented.</sub>
          </DialogDescription>
          <div className="grid w-full max-w-sm items-center gap-2 pt-5">
            <Label htmlFor="email">Confirm Title</Label>
            <Input
              onChange={(e) => setConfirmTitle(e.target.value)}
              value={confirmTitle}
              type="text"
              placeholder={title}
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Keep editing</Button>
          </DialogClose>
          <Button disabled={title !== confirmTitle} variant="default">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
