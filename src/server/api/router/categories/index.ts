import { createTRPCRouter } from "@/server/api/trpc";
import { postsCount } from "./posts-count";
import { createCategory } from "./create";
import { updateCategory } from "./update";
import { deleteCategory } from "./delete";
import { listCategories } from "./list";
import { getCategoryBySlug } from "./get-by-slug";

export const categoriesRouter = createTRPCRouter({
  getBySlug: getCategoryBySlug,
  postsCount: postsCount,
  remove: deleteCategory,
  update: updateCategory,
  create: createCategory,
  list: listCategories,
});
