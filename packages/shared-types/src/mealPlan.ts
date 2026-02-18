import { z } from "zod";

export const mealTypeSchema = z.enum(["breakfast", "lunch", "dinner", "snack"]);

export const mealPlanItemSchema = z.object({
  id: z.string().uuid().optional(),
  recipeId: z.string().uuid(),
  date: z.string().date(),
  mealType: mealTypeSchema
});

export const mealPlanSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(120),
  startDate: z.string().date(),
  endDate: z.string().date(),
  items: z.array(mealPlanItemSchema).default([])
});

export type MealPlan = z.infer<typeof mealPlanSchema>;
export type MealPlanItem = z.infer<typeof mealPlanItemSchema>;
