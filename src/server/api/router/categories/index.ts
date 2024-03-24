import { createTRPCRouter } from "@/server/api/trpc";
import { createCategory } from "./create";
import { listCategories } from "./list";

export const categoriesRouter = createTRPCRouter({
  create: createCategory,
  list: listCategories,
});
