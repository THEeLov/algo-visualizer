import { BinaryTreeNode } from "@/types";
import { validateBinaryTree } from "@/utils/treeUtils";

describe("validateBinaryTree", () => {
  test("should validate a correct binary search tree", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      left: {
        node: { id: "2", value: 5 },
        left: { node: { id: "4", value: 3 } },
        right: { node: { id: "5", value: 7 } },
      },
      right: {
        node: { id: "3", value: 15 },
        left: { node: { id: "6", value: 12 } },
        right: { node: { id: "7", value: 20 } },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("correct");
    expect(result.get("3")).toBe("correct");
    expect(result.get("4")).toBe("correct");
    expect(result.get("5")).toBe("correct");
    expect(result.get("6")).toBe("correct");
    expect(result.get("7")).toBe("correct");
  });

  test("should invalidate an incorrect binary search tree", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      left: {
        node: { id: "2", value: 15 }, // Incorrect: left child > parent
        left: { node: { id: "4", value: 3 } },
        right: { node: { id: "5", value: 7 } },
      },
      right: {
        node: { id: "3", value: 5 }, // Incorrect: right child < parent
        left: { node: { id: "6", value: 12 } },
        right: { node: { id: "7", value: 20 } },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("incorrect");
    expect(result.get("3")).toBe("incorrect");
    expect(result.get("4")).toBe(undefined);
    expect(result.get("5")).toBe(undefined);
    expect(result.get("6")).toBe(undefined);
    expect(result.get("7")).toBe(undefined);
  });

  test("should validate an empty tree", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
  });

  test("should validate a tree with only left children", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      left: {
        node: { id: "2", value: 5 },
        left: {
          node: { id: "3", value: 3 },
          left: { node: { id: "4", value: 1 } },
        },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("correct");
    expect(result.get("3")).toBe("correct");
    expect(result.get("4")).toBe("correct");
  });

  test("should validate a tree with only right children", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      right: {
        node: { id: "2", value: 15 },
        right: {
          node: { id: "3", value: 20 },
          right: { node: { id: "4", value: 25 } },
        },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("correct");
    expect(result.get("3")).toBe("correct");
    expect(result.get("4")).toBe("correct");
  });

  test("should validate a correct binary search tree", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      left: {
        node: { id: "2", value: 5 },
        left: { node: { id: "4", value: 2 } },
        right: { node: { id: "5", value: 8 } },
      },
      right: {
        node: { id: "3", value: 15 },
        left: { node: { id: "6", value: 12 } },
        right: { node: { id: "7", value: 20 } },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("correct");
    expect(result.get("3")).toBe("correct");
    expect(result.get("4")).toBe("correct");
    expect(result.get("5")).toBe("correct");
    expect(result.get("6")).toBe("correct");
    expect(result.get("7")).toBe("correct");
  });

  test("should invalidate nodes when left child is greater than parent", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      left: {
        node: { id: "2", value: 15 }, // Incorrect: left child > parent
        left: { node: { id: "4", value: 3 } },
        right: { node: { id: "5", value: 7 } },
      },
      right: {
        node: { id: "3", value: 15 },
        left: { node: { id: "6", value: 12 } },
        right: { node: { id: "7", value: 20 } },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("incorrect");
    expect(result.get("4")).toBe(undefined);
    expect(result.get("5")).toBe(undefined);
    expect(result.get("3")).toBe("correct");
    expect(result.get("6")).toBe("correct");
    expect(result.get("7")).toBe("correct");
  });

  test("should invalidate nodes when right child is less than or equal to parent", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      left: {
        node: { id: "2", value: 5 },
        left: { node: { id: "4", value: 2 } },
        right: { node: { id: "5", value: 8 } },
      },
      right: {
        node: { id: "3", value: 8 }, // Incorrect: right child <= parent
        left: { node: { id: "6", value: 12 } },
        right: { node: { id: "7", value: 20 } },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("correct");
    expect(result.get("3")).toBe("incorrect");
    expect(result.get("4")).toBe("correct");
    expect(result.get("5")).toBe("correct");
    expect(result.get("6")).toBe(undefined);
    expect(result.get("7")).toBe(undefined);
  });

  test("should handle single-node trees", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
  });

  test("should handle an empty tree", () => {
    const result = validateBinaryTree(null as unknown as BinaryTreeNode); // Force a `null` to simulate empty
    expect(result.size).toBe(0); // Map should be empty for an empty tree
  });

  test("should handle left-skewed trees", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      left: {
        node: { id: "2", value: 5 },
        left: {
          node: { id: "3", value: 2 },
          left: {
            node: { id: "4", value: 1 },
          },
        },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("correct");
    expect(result.get("3")).toBe("correct");
    expect(result.get("4")).toBe("correct");
  });

  test("should handle right-skewed trees", () => {
    const root: BinaryTreeNode = {
      node: { id: "1", value: 10 },
      right: {
        node: { id: "2", value: 15 },
        right: {
          node: { id: "3", value: 20 },
          right: {
            node: { id: "4", value: 25 },
          },
        },
      },
    };

    const result = validateBinaryTree(root);
    expect(result.get("1")).toBe("correct");
    expect(result.get("2")).toBe("correct");
    expect(result.get("3")).toBe("correct");
    expect(result.get("4")).toBe("correct");
  });
});
