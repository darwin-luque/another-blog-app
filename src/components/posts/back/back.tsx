"use client";

import type { FC } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";

export const PostBack: FC = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <Button onClick={() => router.back()} variant="link">
        <ChevronLeft /> Back
      </Button>
    </div>
  );
};
