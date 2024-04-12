"use client";

import { CheckIcon, ChevronsUpDown, Loader2 } from "lucide-react";
import { useMemo, useState, type FC } from "react";
import type { api as serverApi } from "@/trpc/server";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Category = Awaited<
  ReturnType<typeof serverApi.categories.list>
>["items"][number];

type CategoriesComboboxProps = {
  onSelect: (category: Category) => void;
  value: Category | null;
};

export const CategoriesCombobox: FC<CategoriesComboboxProps> = ({
  onSelect,
  value,
}) => {
  const { data, isLoading } = api.categories.list.useQuery({
    limit: 100, // TODO: pagination
  });
  const [open, setOpen] = useState(false);
  const items = useMemo(() => data?.items ?? [], [data]);

  console.log({ items });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="text-left" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <div className="flex items-center">
              <DynamicIcon name={value.icon} className="mr-2 h-4 w-4" />
              {value.name}
            </div>
          ) : (
            "Select category..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "No categories found"
              )}
            </CommandEmpty>
            <CommandGroup heading="Categories">
              {items.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => {
                    onSelect(category);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <DynamicIcon
                      name={category.icon}
                      className="mr-2 h-4 w-4"
                    />
                    {category.name}
                  </div>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value?.id === category.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
