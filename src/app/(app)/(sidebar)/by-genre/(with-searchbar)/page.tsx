import { Suspense } from "react";
import { api } from "@/trpc/server";
import { CategoryItem } from "@/components/categories/category-item";
import { CategoryItemLoader } from "@/components/categories/category-item/loader";

type CategoriesPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const categories = await api.categories.list({
    q: searchParams?.q,
    limit: 100,
    offset: 0,
    field: "name",
    direction: "asc",
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.items.map((category) => (
        <Suspense key={category.id} fallback={<CategoryItemLoader />}>
          <CategoryItem category={category} />
        </Suspense>
      ))}
    </div>
  );
}
