"use client";

import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { api } from "../../../trpc/react";
import { type FC } from "react";

export type PreviewDropzoneProps = {
  setPreviewId: (id: string) => void;
};

export const PreviewDropzone: FC<PreviewDropzoneProps> = ({ setPreviewId }) => {
  const { toast } = useToast();
  const createFile = api.files.create.useMutation();

  return (
    <UploadDropzone
      endpoint="previewUploader"
      onUploadError={(err) => {
        toast({
          title: "Failed to upload image",
          description: err.message,
          variant: "destructive",
        });
      }}
      onClientUploadComplete={async ([preview]) => {
        if (!preview) {
          toast({
            title: "Failed to upload image",
            description: "No image uploaded",
            variant: "destructive",
          });
          return;
        }
        const [file] =
          (await createFile
            .mutateAsync({
              ...preview,
              createdBy: preview.serverData.uploadedBy ?? "guest",
            })
            .catch((err) => {
              toast({
                title: "Failed to upload image",
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                description: err.message,
                variant: "destructive",
              });
              return null;
            })) ?? [];

        if (!file) {
          return;
        }
        toast({
          title: "Image uploaded",
          description: file.name,
        });
        setPreviewId(file.id);
      }}
    />
  );
};
