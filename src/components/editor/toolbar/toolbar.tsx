"use client";

import type { FC } from "react";
import { type Editor } from "@tiptap/react";
import { Separator } from "../../ui/separator";
import { ActionItems } from "./action-items";
import { FormattingItems } from "./formatting-items";
import { ParagraphItems } from "./paragraph-items";
import { UtilItems } from "./utils-items";

export type MenuBarProps = {
  editor: Editor;
};

export const EditorToolbar: FC<MenuBarProps> = ({ editor }) => {
  return (
    <div className="flex flex-wrap items-center space-x-3 p-1 text-sm">
      <ActionItems editor={editor} />
      <Separator orientation="vertical" className="h-6" />
      <FormattingItems editor={editor} />
      <Separator orientation="vertical" className="h-6" />
      <ParagraphItems editor={editor} />
      <Separator orientation="vertical" className="h-6" />
      <UtilItems editor={editor} />
    </div>
  );
};
