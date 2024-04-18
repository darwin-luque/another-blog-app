"use client";

import { useCallback, useEffect, useRef, type FC } from "react";
import { Input } from "../../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import { SearchIcon } from "lucide-react";

export const CategoriesSearchInput: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = useCallback(() => {
    const value = inputRef.current?.value;
    router.push(pathname + "?q=" + value);
  }, [router, pathname]);

  useEffect(() => {
    if (!!inputRef.current) {
      inputRef.current.value = searchParams.get("q") ?? "";
    }
  }, [searchParams]);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSearch();
      }
    };
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [onSearch]);

  return (
    <div className="mb-4 flex w-full items-center space-x-4">
      <Input ref={inputRef} className="flex-1" />
      <Button
        onClick={onSearch}
        size="icon"
        variant="ghost"
        className="h-6 w-6"
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
