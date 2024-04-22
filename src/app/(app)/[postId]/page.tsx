import {} from "next/navigation";
import { api } from "@/trpc/server";
import { PostReader } from "@/components/posts/reader";
import { PostBack } from "@/components/posts/back";

type PostPageProps = {
  params: {
    postId: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const post = await api.posts.getById(params.postId);

  return (
    <main className="flex w-screen flex-col items-center">
      <PostBack />
      <PostReader post={post} />
    </main>
  );
}
