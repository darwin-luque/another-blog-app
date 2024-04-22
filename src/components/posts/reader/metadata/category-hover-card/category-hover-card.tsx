import Link from "next/link";
import type { FC } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import type { api } from "@/trpc/server";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { cn } from "../../../../../lib/utils";

export type CategoryHoverCardProps = {
  category: Awaited<ReturnType<typeof api.posts.mine>>[0]["cateogry"];
};

export const CategoryHoverCard: FC<CategoryHoverCardProps> = ({ category }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          className="p-0 font-semibold text-gray-500"
          size="sm"
          variant="link"
        >
          {category.name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex justify-between space-x-4">
          <DynamicIcon className="h-24 w-24" name={category.icon} useLoader />
          <div className="space-y-1">
            <Link
              href={`/by-genre/${category.slug}`}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "p-0 text-sm font-semibold",
              )}
            >
              {category.name}
            </Link>
            <p className="text-sm">{category.description}</p>
            <div className="flex items-center pt-2">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Created {format(category.createdAt, "MMMM yyyy")}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
