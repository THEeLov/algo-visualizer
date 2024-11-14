import { z } from "zod"

export const EditNodeSchema = z.object({
  value: z.coerce.number()
})

export type EditNodeType = z.infer<typeof EditNodeSchema>

export const AddNodeSchema = EditNodeSchema;

export type AddNodeType = z.infer<typeof AddNodeSchema>