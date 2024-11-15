import { z } from "zod"

// User can input more values like 52, 23, 65 and all values will be added to canvas
export const AddNodeSchema = z.object({
  value: z
    .string()
    .transform((str) =>
      str
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
        .map((s) => {
          const num = Number(s);
          return isNaN(num) ? null : num;
        })
    )
    .refine(
      (arr) => arr.every((num) => num !== null),
      { message: "All values must be valid numbers." }
    ),
});

export type AddNodeType = z.infer<typeof AddNodeSchema>

export const EditNodeSchema = z.object({
  value: z.coerce.number()
})

export type EditNodeType = z.infer<typeof EditNodeSchema>
