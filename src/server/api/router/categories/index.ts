import { createTRPCRouter } from "@/server/api/trpc";
import { createCategory } from "./create";
import { listCategories } from "./list";
import { updateCategory } from "./update";

export const categoriesRouter = createTRPCRouter({
  update: updateCategory,
  create: createCategory,
  list: listCategories,
});
