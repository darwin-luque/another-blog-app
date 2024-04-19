import { PostArtworkLoader } from "@/components/posts/post-artwork/loader";

export default function LoadingMyBlogs() {
  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array<undefined>(6)].map((_, i) => (
        <PostArtworkLoader key={i} />
      ))}
    </div>
  );
}
