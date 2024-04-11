"use client";

import { useEditor } from "@tiptap/react";
import Focus from "@tiptap/extension-focus";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import FileHandler from "@tiptap-pro/extension-file-handler";
import CharacterCount from "@tiptap/extension-character-count";
import { useUploadThing } from "@/server/uploadthing/helpers";
import { useToast } from "@/components/ui/use-toast";
import { api } from "../trpc/react";

type UseAppEditorProps = {
  quiet?: boolean | {
    error?: boolean;
    success?: boolean;
  };
};

export const useAppEditor = ({ quiet }: UseAppEditorProps = {}) => {
  const { toast } = useToast();
  const createFile = api.files.create.useMutation();
  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError(err) {
      if (!quiet || (typeof quiet !== "boolean" && !quiet.error)) {
        toast({
          title: "Failed to upload image",
          description: err.message,
          variant: "destructive",
        });
      }
    },
    async onClientUploadComplete(files) {
      const response = await Promise.allSettled(files.map((file) => createFile.mutateAsync({
        ...file,
        createdBy: file.serverData.uploadedBy ?? "guest",
      })));
      if (!quiet || (typeof quiet !== "boolean" && !quiet.success)) {
        const successfulUploads = response.filter((result) => result.status === "fulfilled");
        const failedUploads = response.filter((result) => result.status === "rejected");

        if (failedUploads.length) {
          toast({
            title: "Failed to upload image",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            description: failedUploads.map((result) => result.reason).join(", "),
            variant: "destructive",
          });
        }

        if (successfulUploads.length) {
          toast({
            title: "Image uploaded",
            description: successfulUploads
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
              .flatMap((result) => result.value.map((file) => file.name))
              .join(", "),
          });
        }
      }
    }
  });

  const editor = useEditor({
    extensions: [
      TaskList,
      TaskItem,
      Highlight,
      TextAlign,
      StarterKit,
      Image,
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        async onDrop(editor, files, pos) {
          const uploadedFiles = await startUpload(files);
          uploadedFiles?.forEach((file) => {
            editor
              .chain()
              .insertContentAt(pos, {
                type: "image",
                attrs: {
                  src: file.url,
                },
              })
              .focus()
              .run();
          }, []);
        },
        async onPaste(editor, files, pasteContent) {
          if (pasteContent) {
            return false;
          }
          const uploadedFiles = await startUpload(files);
          uploadedFiles?.forEach((file) => {
            editor
              .chain()
              .insertContentAt(editor.state.selection.anchor, {
                type: "image",
                attrs: {
                  src: file.url,
                },
              })
              .focus()
              .run();
          }, []);
        },
      }),
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

  return editor;
};
