import { z } from "zod"
import { Node } from "@xyflow/react"

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

export type NodeChildren = {
  left: Node | null;
  right: Node | null;
}

export type CorrectionType = "correct" | "incorrect";

export type MinimalNode = {
  id: string;
  value: number;
}

export class BinaryTreeNode {
  node: MinimalNode;
  left?: BinaryTreeNode;
  right?: BinaryTreeNode;

  constructor(node: Node) {
    this.node = node;
  }
}
