import { z } from "zod";

export const directionEnum = z.enum(["asc", "desc"]);

export const sortSchema = <T extends [string, ...string[]]>(
  fieldsSchema: z.ZodDefault<z.ZodEnum<T>>
) => z.object({
  // field should be an enum of keys of the model schema
  field: fieldsSchema,
  direction: directionEnum.default("asc"),
});
