"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
  Italic,
  List,
  ListChecks,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  SquareDashedBottomCode,
  Strikethrough,
  Undo2,
  WrapText,
} from "lucide-react";
import { useMemo, type FC } from "react";
import { MenuItem, type MenuItemProps } from "./menu-item";
import { Separator } from "../../ui/separator";

export type MenuBarProps = {
  editor: Editor;
};

const iconClassName = "h-4 w-4";

export const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  const textMenus = useMemo<(MenuItemProps & { id: string })[]>(
    () => [
      {
        id: "bold",
        icon: <Bold className={iconClassName} />,
        title: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive("bold"),
      },
      {
        id: "italic",
        icon: <Italic className={iconClassName} />,
        title: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive("italic"),
      },
      {
        id: "strike",
        icon: <Strikethrough className={iconClassName} />,
        title: "Strike",
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive("strike"),
      },
      {
        id: "code",
        icon: <Code className={iconClassName} />,
        title: "Code",
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: () => editor.isActive("code"),
      },
      {
        id: "highlight",
        icon: <Highlighter className={iconClassName} />,
        title: "Highlight",
        action: () => editor.chain().focus().toggleHighlight().run(),
        isActive: () => editor.isActive("highlight"),
      },
    ],
    [editor],
  );
  const headingMenus = useMemo<(MenuItemProps & { id: string })[]>(
    () => [
      {
        id: "heading-1",
        icon: <Heading1 className={iconClassName} />,
        title: "Heading 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive("heading", { level: 1 }),
      },
      {
        id: "heading-2",
        icon: <Heading2 className={iconClassName} />,
        title: "Heading 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive("heading", { level: 2 }),
      },
      {
        id: "heading-3",
        icon: <Heading3 className={iconClassName} />,
        title: "Heading 3",
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => editor.isActive("heading", { level: 3 }),
      },
      {
        id: "heading-4",
        icon: <Heading4 className={iconClassName} />,
        title: "Heading 4",
        action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        isActive: () => editor.isActive("heading", { level: 4 }),
      },
      {
        id: "heading-5",
        icon: <Heading5 className={iconClassName} />,
        title: "Heading 5",
        action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        isActive: () => editor.isActive("heading", { level: 5 }),
      },
      {
        id: "heading-6",
        icon: <Heading6 className={iconClassName} />,
        title: "Heading 6",
        action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        isActive: () => editor.isActive("heading", { level: 6 }),
      },
      {
        id: "paragraph",
        icon: <Pilcrow className={iconClassName} />,
        title: "Paragraph",
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: () => editor.isActive("paragraph"),
      },
    ],
    [editor],
  );
  const multipleMenus = useMemo<(MenuItemProps & { id: string })[]>(
    () => [
      {
        id: "bullet-list",
        icon: <List className={iconClassName} />,
        title: "Bullet List",
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive("bulletList"),
      },
      {
        id: "ordered-list",
        icon: <ListOrdered className={iconClassName} />,
        title: "Ordered List",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive("orderedList"),
      },
      {
        id: "task-list",
        icon: <ListChecks className={iconClassName} />,
        title: "Task List",
        action: () => editor.chain().focus().toggleTaskList().run(),
        isActive: () => editor.isActive("taskList"),
      },
      {
        id: "code-block",
        icon: <SquareDashedBottomCode className={iconClassName} />,
        title: "Code Block",
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => editor.isActive("codeBlock"),
      },
    ],
    [editor],
  );
  const separationMenus = useMemo<(MenuItemProps & { id: string })[]>(
    () => [
      {
        id: "blockquote",
        icon: <Quote className={iconClassName} />,
        title: "Blockquote",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive("blockquote"),
      },
      {
        id: "horizontal-rule",
        icon: <Minus className={iconClassName} />,
        title: "Horizontal Rule",
        action: () => editor.chain().focus().setHorizontalRule().run(),
      },
    ],
    [editor],
  );
  const cutMenus = useMemo<(MenuItemProps & { id: string })[]>(
    () => [
      {
        id: "hard-break",
        icon: <WrapText className={iconClassName} />,
        title: "Hard Break",
        action: () => editor.chain().focus().setHardBreak().run(),
      },
      {
        id: "clear-format",
        icon: <RemoveFormatting className={iconClassName} />,
        title: "Clear Format",
        action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
    ],
    [editor],
  );
  const historyMenus = useMemo<(MenuItemProps & { id: string })[]>(
    () => [
      {
        id: "undo",
        icon: <Undo2 className={iconClassName} />,
        title: "Undo",
        action: () => editor.chain().focus().undo().run(),
      },
      {
        id: "redo",
        icon: <Redo2 className={iconClassName} />,
        title: "Redo",
        action: () => editor.chain().focus().redo().run(),
      },
    ],
    [editor],
  );

  return (
    <div className="flex items-center space-x-3 p-1 text-sm flex-wrap">
      <div className="flex gap-1">
        {textMenus.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-1">
        {headingMenus.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-1">
        {multipleMenus.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-1">
        {separationMenus.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-1">
        {cutMenus.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-1">
        {historyMenus.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
