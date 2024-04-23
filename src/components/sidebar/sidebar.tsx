"use client";

import {
  SquarePen,
  LayoutGrid,
  LibraryBig,
  BookOpenText,
  SearchCheck,
  GanttChart,
  Tags,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, type FC, type HTMLAttributes } from "react";
import { useAuth, useOrganization, useOrganizationList } from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { env } from "@/env";
import { SidebarBookmarks } from "./bookmarks";

type SidebarProps = HTMLAttributes<HTMLDivElement>;

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { userId, isLoaded: authLoaded } = useAuth();
  const { setActive, isLoaded: organizationListLoaded } = useOrganizationList();
  const { organization, isLoaded: organizationLoaded } = useOrganization();
  const pathname = usePathname();
  const hasLoaded = useMemo(
    () => authLoaded && organizationListLoaded && organizationLoaded,
    [authLoaded, organizationListLoaded, organizationLoaded],
  );

  useEffect(() => {
    void setActive?.({ organization: env.NEXT_PUBLIC_DEFAULT_ORGANIZATION_ID });
  }, [setActive]);

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: pathname === "/" ? "secondary" : "ghost",
                }),
                "w-full justify-start",
              )}
            >
              <BookOpenText className="mr-2 h-4 w-4" />
              Read Now
            </Link>
            <Link
              href="/browse"
              className={cn(
                buttonVariants({
                  variant: pathname === "/browse" ? "secondary" : "ghost",
                }),
                "w-full justify-start",
              )}
            >
              <SearchCheck className="mr-2 h-4 w-4" />
              Browse
            </Link>
            <Link
              href="/by-genre"
              className={cn(
                buttonVariants({
                  variant: pathname === "/by-genre" ? "secondary" : "ghost",
                }),
                "w-full justify-start",
              )}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              By Genre
            </Link>
          </div>
        </div>
        {hasLoaded ? (
          <>
            {userId && !organization ? (
              <>
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Library
                  </h2>
                  <div className="space-y-1">
                    <Link
                      href="/create"
                      className={cn(
                        buttonVariants({
                          variant:
                            pathname === "/create" ? "secondary" : "ghost",
                        }),
                        "w-full justify-start",
                      )}
                    >
                      <SquarePen className="mr-2 h-4 w-4" />
                      Create
                    </Link>
                    <Link
                      href="/my-blogs"
                      className={cn(
                        buttonVariants({
                          variant:
                            pathname === "/my-blogs" ? "secondary" : "ghost",
                        }),
                        "w-full justify-start",
                      )}
                    >
                      <LibraryBig className="mr-2 h-4 w-4" />
                      My Blogs
                    </Link>
                  </div>
                </div>
                <SidebarBookmarks />
              </>
            ) : null}
            {organization ? (
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  Admin
                </h2>
                <div className="space-y-1">
                  <Link
                    href="/categories"
                    className={cn(
                      buttonVariants({
                        variant: pathname.startsWith("/categories")
                          ? "secondary"
                          : "ghost",
                      }),
                      "w-full justify-start",
                    )}
                  >
                    <GanttChart className="mr-2 h-4 w-4" />
                    Categories
                  </Link>
                  <Link
                    href="/tags"
                    className={cn(
                      buttonVariants({
                        variant: pathname.startsWith("/tags")
                          ? "secondary"
                          : "ghost",
                      }),
                      "w-full justify-start",
                    )}
                  >
                    <Tags className="mr-2 h-4 w-4" />
                    Tags
                  </Link>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};
