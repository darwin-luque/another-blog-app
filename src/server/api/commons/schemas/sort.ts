import { z } from "zod";

export const sortSchema = <T extends [string, ...string[]]>(
  fieldsSchema: z.ZodEnum<T>
) => z.object({
  // field should be an enum of keys of the model schema
  field: fieldsSchema,
  direction: z.enum(["asc", "desc"]).default("asc"),
});
