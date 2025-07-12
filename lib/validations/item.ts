import { z } from "zod"
import { ItemCondition } from "../generated/prisma"

export const createItemSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(1000),
  brand: z.string().max(50).optional(),
  color: z.string().max(30).optional(),
  tags: z.array(z.string().max(30)).max(10).default([]),
  categoryId: z.string().cuid(),
  size: z.string().min(1).max(10),
  condition: z.nativeEnum(ItemCondition),
  pointValue: z.number().int().min(1).max(1000).optional(),
})

export const updateItemSchema = createItemSchema.partial()

export const itemQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  categoryId: z.string().cuid().optional(),
  condition: z.nativeEnum(ItemCondition).optional(),
  search: z.string().max(100).optional(),
  minPoints: z.coerce.number().int().min(0).optional(),
  maxPoints: z.coerce.number().int().min(0).optional(),
  sortBy: z.enum(["createdAt", "pointValue", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

export type CreateItemInput = z.infer<typeof createItemSchema>
export type UpdateItemInput = z.infer<typeof updateItemSchema>
export type ItemQueryInput = z.infer<typeof itemQuerySchema>
