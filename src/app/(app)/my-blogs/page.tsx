import { PostArtwork } from "../../../components/posts/post-artwork";
import { api } from "../../../trpc/server";

type MyBlogsProps = {
  searchParams?: {
    direction?: "asc" | "desc";
    field?: "title" | "createdAt" | "updatedAt";
    limit?: number;
    offset?: number;
  };
};

export default async function MyBlogs({ searchParams }: MyBlogsProps) {
  const data = await api.posts.mine({
    direction: searchParams?.direction,
    field: searchParams?.field,
    limit: searchParams?.limit,
    offset: searchParams?.offset,
  });

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((post) => (
        <PostArtwork key={post.id} post={post} aspectRatio="landscape" />
      ))}
    </div>
  );
}
