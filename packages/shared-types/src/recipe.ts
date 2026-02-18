import { z } from "zod";

export const recipeSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(120),
  description: z.string().max(1000).optional(),
  instructions: z.string().min(1),
  prepTimeMinutes: z.number().int().nonnegative(),
  cookTimeMinutes: z.number().int().nonnegative(),
  servings: z.number().int().positive()
});

export type Recipe = z.infer<typeof recipeSchema>;
