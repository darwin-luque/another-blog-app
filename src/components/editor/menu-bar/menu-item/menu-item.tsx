"use client";

import { type FC } from "react";
import { Button } from "../../../ui/button";

export type MenuItemProps = {
  icon: JSX.Element;
  title: string;
  action: () => boolean;
  isActive?: () => boolean;
};

export const MenuItem: FC<MenuItemProps> = ({
  icon,
  title,
  action,
  isActive,
}) => {
  return (
    <Button
      variant={isActive?.() ? "secondary" : "ghost"}
      size="icon"
      onClick={action}
      title={title}
    >
      {icon}
    </Button>
  );
};
