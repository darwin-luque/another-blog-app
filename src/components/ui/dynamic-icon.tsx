"use client";
import dynamic from "next/dynamic";
import { type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

export const DynamicIcon = ({ name, ...props }: IconProps) => {
  if (!(name in dynamicIconImports)) {
    return null;
  }
  const nameParsed = name as keyof typeof dynamicIconImports;
  const LucideIcon = dynamic(dynamicIconImports[nameParsed]);

  return <LucideIcon {...props} />;
};
