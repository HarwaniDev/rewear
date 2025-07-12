import { z } from "zod"

export const createCategorySchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
  parentId: z.string().cuid().optional(),
  iconUrl: z.string().url().optional(),
  sortOrder: z.number().int().min(0).default(0),
})

export const updateCategorySchema = createCategorySchema.partial()

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
