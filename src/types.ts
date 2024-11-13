import { z } from "zod"

export const EditNode = z.object({
  value: z.string().min(1, "Value is required")
})

export type EditNodeType = z.infer<typeof EditNode>