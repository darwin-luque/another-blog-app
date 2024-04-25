"use client";

import { type TRPCError } from "@trpc/server";

type ErrorByGenreProps = {
  error: TRPCError & { digest?: string };
  reset: () => void;
};

export default function ErrorBookmark({ error, reset }: ErrorByGenreProps) {
  return (
    <div>
      <h2>{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
