import { createTRPCRouter } from "@/server/api/trpc";
import { createCategory } from "./create";
import { listCategories } from "./list";
import { updateCategory } from "./update";
import { deleteCategory } from "./delete";

export const categoriesRouter = createTRPCRouter({
  remove: deleteCategory,
  update: updateCategory,
  create: createCategory,
  list: listCategories,
});
