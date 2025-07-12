import { z } from "zod"
import { SwapStatus } from "../generated/prisma"

export const createSwapSchema = z
  .object({
    requestedItemId: z.string().cuid(),
    offeredItemId: z.string().cuid().optional(),
    message: z.string().max(500).optional(),
    pointsUsed: z.number().int().min(1).optional(),
  })
  .refine((data) => data.offeredItemId || data.pointsUsed, {
    message: "Either offeredItemId or pointsUsed must be provided",
    path: ["offeredItemId"],
  })

export const updateSwapStatusSchema = z.object({
  status: z.nativeEnum(SwapStatus),
})

export type CreateSwapInput = z.infer<typeof createSwapSchema>
export type UpdateSwapStatusInput = z.infer<typeof updateSwapStatusSchema>
