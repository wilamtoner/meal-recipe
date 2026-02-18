import { z } from "zod";

export const ingredientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(120)
});

export type Ingredient = z.infer<typeof ingredientSchema>;
