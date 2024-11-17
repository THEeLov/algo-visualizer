import { Node, Edge } from "@xyflow/react";
import { NodeChildren } from "@/types";

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

export const validateBinaryTree = (head: BinaryTreeNode) => {
  const validationMap = new Map<string, Node[]>([
    ["valid", []],
    ["invalid", []],
  ]);

  validationMap.get("valid")?.push(head.node);

  const queue: BinaryTreeNode[] = [head];

  while (queue.length > 0) {

    const node = queue.pop
  }

  return validationMap;
};
