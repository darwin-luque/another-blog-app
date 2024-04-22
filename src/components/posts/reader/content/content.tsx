"use client";

import type { FC } from "react";
import { EditorContent } from "@tiptap/react";
import { useAppEditor } from "@/hooks/use-app-editor";

export type PostReaderContentProps = {
  content: string;
  className?: string;
};

export const PostReaderContent: FC<PostReaderContentProps> = ({
  content,
  className,
}) => {
  const editor = useAppEditor({ content });

  return (
    <EditorContent
      readOnly
      editor={editor}
      className={className}
    />
  );
};
