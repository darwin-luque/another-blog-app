import { pgEnum } from "drizzle-orm/pg-core";
import { lucideIconNames } from "@/lib/lucide-icon-names";

export const iconNamesEnum = pgEnum("icon_names_enum", lucideIconNames);
