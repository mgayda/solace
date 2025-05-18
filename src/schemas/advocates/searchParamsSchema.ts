import { z } from "zod";

export const SearchParamsSchema = z.object({
  query: z.string().optional(),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});
