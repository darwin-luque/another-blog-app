import type { FC } from "react";
import { PostArtworkLoader } from "../post-artwork/loader";

export const PostsListLoader: FC = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[...Array<undefined>(6)].map((_, i) => (
      <PostArtworkLoader key={i} />
    ))}
  </div>
);
