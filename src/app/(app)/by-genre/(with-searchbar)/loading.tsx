import { CategoryItemLoader } from "@/components/categories/category-item/loader";

export default function LoadingMyBlogs() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array<undefined>(6)].map((_, i) => (
        <CategoryItemLoader key={i} />
      ))}
    </div>
  );
}
