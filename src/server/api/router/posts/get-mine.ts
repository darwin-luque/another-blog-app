import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { paginationSchema } from "../../commons/schemas/pagination";
import { sortSchema } from "../../commons/schemas/sort";
import { fieldEnums } from "./schemas";
import { TRPCError } from "@trpc/server";

export const listPostsSchema = z.object({})
  .merge(paginationSchema)
  .merge(sortSchema(fieldEnums.default("title")));

export const getMyPosts = protectedProcedure
  .input(listPostsSchema)
  .query(async ({ ctx, input }) => {
    return ctx.db.query.posts.findMany({
      orderBy: (post, op) => op[input.direction](post[input.field]),
      offset: input.offset,
      limit: input.limit,
      where(fields, { eq }) {
        if (!ctx.auth.userId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to view your posts",
          });
        }
        return eq(fields.createdBy, ctx.auth.userId);
      },
      with: {
        category: true,
        preview: true,
      }
    });
  });
