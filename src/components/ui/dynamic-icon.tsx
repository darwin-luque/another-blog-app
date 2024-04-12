"use client";
import dynamic from "next/dynamic";
import { Loader2, type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "../../lib/utils";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
  useLoader?: boolean;
}

export const DynamicIcon = ({ name, useLoader = false, ...props }: IconProps) => {
  if (!(name in dynamicIconImports)) {
    if (useLoader) {
      return (
        <Loader2 {...props} className={cn("animate-spin", props.className)} />
      );
    }
    return null;
  }
  const nameParsed = name as keyof typeof dynamicIconImports;
  const LucideIcon = dynamic(dynamicIconImports[nameParsed]);

  return <LucideIcon {...props} />;
};
