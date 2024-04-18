import { api } from "@/trpc/server";
import { PostsList } from "@/components/posts/list";

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

  return <PostsList posts={data} />;
}
