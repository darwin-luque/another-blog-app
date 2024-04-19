"use client";

import { useEffect } from "react";

type ErrorByGenreProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorByGenre({ error, reset }: ErrorByGenreProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
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