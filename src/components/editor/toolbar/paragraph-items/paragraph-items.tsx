import type { Editor } from "@tiptap/react";
import type { FC } from "react";
import { MenuItem } from "../menu-item";
import {
  Code,
  Highlighter,
  List,
  ListChecks,
  ListOrdered,
  Quote,
  SquareDashedBottomCode,
} from "lucide-react";
import { Separator } from "../../../ui/separator";

export type ParagraphItemsProps = {
  editor: Editor;
};

export const ParagraphItems: FC<ParagraphItemsProps> = ({ editor }) => {
  return (
    <>
      <div className="flex gap-1">
        <MenuItem
          action={() => editor.chain().focus().toggleBulletList().run()}
          icon={<List className="h-4 w-4" />}
          title="Bullet List"
          isActive={() => editor.isActive("bulletList")}
        />
        <MenuItem
          action={() => editor.chain().focus().toggleOrderedList().run()}
          icon={<ListOrdered className="h-4 w-4" />}
          title="Ordered List"
          isActive={() => editor.isActive("orderedList")}
        />
        <MenuItem
          action={() => editor.chain().focus().toggleTaskList().run()}
          icon={<ListChecks className="h-4 w-4" />}
          title="Task List"
          isActive={() => editor.isActive("taskList")}
        />
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-1">
        <MenuItem
          action={() => editor.chain().focus().toggleBlockquote().run()}
          icon={<Quote className="h-4 w-4" />}
          title="Blockquote"
          isActive={() => editor.isActive("blockquote")}
        />
        <MenuItem
          action={() => editor.chain().focus().toggleCodeBlock().run()}
          icon={<SquareDashedBottomCode className="h-4 w-4" />}
          title="Code Block"
          isActive={() => editor.isActive("codeBlock")}
        />
        <MenuItem
          action={() => editor.chain().focus().toggleCode().run()}
          icon={<Code className="h-4 w-4" />}
          title="Code"
          isActive={() => editor.isActive("code")}
        />
        <MenuItem
          action={() => editor.chain().focus().toggleHighlight().run()}
          icon={<Highlighter className="h-4 w-4" />}
          title="Highlight"
          isActive={() => editor.isActive("highlight")}
        />
      </div>
    </>
  );
};
