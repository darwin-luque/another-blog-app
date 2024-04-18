import type { FC } from "react";
import { PostsList } from "../../posts/list";
import { api } from "../../../trpc/server";

export type PostsListByCategoryProps = {
  categoryId: string;
};

export const PostsListByCategory: FC<PostsListByCategoryProps> = async ({
  categoryId,
}) => {
  const data = await api.posts.listForCategory({ categoryId });

  return <PostsList posts={data.items} />;
};
