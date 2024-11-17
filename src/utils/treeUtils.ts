import { Node, Edge } from "@xyflow/react";
import { CorrectionType, NodeChildren } from "@/types";

class BinaryTreeNode {
  node: Node;
  left?: BinaryTreeNode;
  right?: BinaryTreeNode;

  constructor(node: Node) {
    this.node = node;
  }
}

export const createBinaryTree = (
  nodes: Node[],
  edges: Edge[],
  selectedNode: Node
): BinaryTreeNode => {
  const head = new BinaryTreeNode(selectedNode);

  const nodeMap = new Map<string, BinaryTreeNode>();
  nodeMap.set(selectedNode.id, head);

  const queue: Node[] = [selectedNode];

  while (queue.length > 0) {
    const currentNode = queue.pop()!;
    const currentBinaryNode = nodeMap.get(currentNode.id)!;

    const { left, right } = findChildren(nodes, edges, currentNode);

    if (left) {
      const leftBinaryNode = new BinaryTreeNode(left);
      currentBinaryNode.left = leftBinaryNode;
      nodeMap.set(left.id, leftBinaryNode);
      queue.push(left);
    }

    if (right) {
      const rightBinaryNode = new BinaryTreeNode(right);
      currentBinaryNode.right = rightBinaryNode;
      nodeMap.set(right.id, rightBinaryNode);
      queue.push(right);
    }
  }

  return head;
};

const findChildren = (
  nodes: Node[],
  edges: Edge[],
  parentNode: Node
): NodeChildren => {
  const childEdges = edges.filter((edge) => edge.source === parentNode.id);

  const childNodes = childEdges
    .map((edge) => nodes.find((node) => node.id === edge.target))
    .filter((node): node is Node => node !== undefined);

  let left: Node | null = null;
  let right: Node | null = null;

  childNodes.forEach((child) => {
    if (child.position.x < parentNode.position.x) {
      left = child;
    } else if (child.position.x > parentNode.position.x) {
      right = child;
    }
  });

  return { left, right };
};

export const validateBinaryTree = (
  head: BinaryTreeNode
): Map<string, CorrectionType> => {
  const validationMap = new Map<string, CorrectionType>([
    [head.node.id, "correct"],
  ]);

  const queue: { node: BinaryTreeNode; min: number; max: number }[] = [
    { node: head, min: -Infinity, max: Infinity },
  ];

  while (queue.length > 0) {
    const { node: parent, min, max } = queue.pop()!;

    if (parent.left) {
      const leftMin = min;
      const leftMax = parent.node.value;
      const correction: CorrectionType =
        parent.left.node.value >= leftMin && parent.left.node.value < leftMax
          ? "correct"
          : "incorrect";
      validationMap.set(parent.left.node.id, correction);
      if (correction === "correct") {
        queue.push({
          node: parent.left,
          min: leftMin,
          max: leftMax,
        });
      }
    }

    if (parent.right) {
      const rightMin = parent.node.value;
      const rightMax = max;
      const correction: CorrectionType =
        parent.right.node.value >= rightMin &&
        parent.right.node.value < rightMax
          ? "correct"
          : "incorrect";
      validationMap.set(parent.right.node.id, correction);
      if (correction === "correct") {
        queue.push({
          node: parent.right,
          min: rightMin,
          max: rightMax,
        });
      }
    }
  }

  return validationMap;
};
