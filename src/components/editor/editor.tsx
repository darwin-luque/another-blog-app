"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, type FC } from "react";
import { useRouter } from "next/navigation";
import { EditorContent } from "@tiptap/react";
import { useAppEditor } from "@/hooks/use-app-editor";
import type { api as serverApi } from "@/trpc/server";
import { CategoriesCombobox } from "@/components/categories/combobox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { EditorToolbar } from "./toolbar";
import { PreviewDropzone } from "./preview-dropzone";

type Category = Awaited<
  ReturnType<typeof serverApi.categories.list>
>["items"][number];

export const Editor: FC = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const editor = useAppEditor();

  const createPost = api.posts.create.useMutation({
    onSuccess(_, data) {
      router.push("/my-blogs");
      toast({
        title: `${data.title} has been created!`,
        description: "You can view it on the homepage.",
      });
    },
    onError(err) {
      toast({
        title: "Failed to create post",
        description: err.message,
      });
    },
  });

  return (
    <Dialog>
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
      <div className="sticky top-0 z-10 bg-background">
        {editor ? <EditorToolbar editor={editor} /> : null}
        <Separator />
      </div>

      <EditorContent editor={editor} className="flex-auto px-4 py-5" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You are about to create new blog</DialogTitle>
          <DialogDescription>
            Please confirm with the title of your blog before saving. The blog
            will be saved and published immediately.
            <br />
            <sub>*Note: Drafts are not yet implemented.</sub>
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-2 pt-5">
          <Label htmlFor="email">Confirm Title</Label>
          <Input
            onChange={(e) => setConfirmTitle(e.target.value)}
            value={confirmTitle}
            type="text"
            placeholder={title}
          />
          <Label>Chose Category</Label>
          <CategoriesCombobox value={category} onSelect={setCategory} />
          <Label>Upload a Preview Image</Label>
          <PreviewDropzone setPreviewId={setPreviewId} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Keep editing</Button>
          </DialogClose>
          <Button
            disabled={
              title !== confirmTitle || !category || !previewId || !editor
            }
            variant="default"
            onClick={() =>
              createPost.mutate({
                title,
                categoryId: category?.id ?? "",
                content: editor?.getHTML() ?? "",
                createdBy: userId ?? "default-user",
                previewId: previewId ?? "",
              })
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
