import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";

export const createTRPCContext = async (opts: { headers: Headers; }) => {
  const authData = auth();
  return {
    db,
    auth: authData,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const authMiddleware = t.middleware(({ ctx, next }) => {
  const userId = ctx.auth.userId;
  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: {
        ...ctx.auth,
        userId,
      },
    },
  });
});

export const adminMiddleware = t.middleware(({ ctx, next }) => {
  const orgId = ctx.auth.orgId;
  if (!orgId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must be an admin to access this resource",
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: {
        ...ctx.auth,
        orgId,
      }
    },
  });
});

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(authMiddleware);

export const adminProcedure = t.procedure.use(adminMiddleware);
