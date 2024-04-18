import { createTRPCRouter } from "@/server/api/trpc";
import { postsCount } from "./posts-count";
import { createCategory } from "./create";
import { updateCategory } from "./update";
import { deleteCategory } from "./delete";
import { listCategories } from "./list";

export const categoriesRouter = createTRPCRouter({
  postsCount: postsCount,
  remove: deleteCategory,
  update: updateCategory,
  create: createCategory,
  list: listCategories,
});
