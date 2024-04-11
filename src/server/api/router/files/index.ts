import { createTRPCRouter } from "@/server/api/trpc";
import { createFile } from "./create";

export const filesRouter = createTRPCRouter({
  create: createFile,
});
