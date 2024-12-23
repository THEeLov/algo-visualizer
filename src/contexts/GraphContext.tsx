import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  Connection,
  MarkerType,
} from "@xyflow/react";
import React, { createContext, useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddNodeType, EditNodeType, CorrectionType } from "../types";
import { createBinaryTree, validateBinaryTree } from "@/utils/treeUtils";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface GraphContextProps {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  validNodes: Map<string, CorrectionType> | null;
  addNode: (data: AddNodeType) => void;
  editNode: (data: EditNodeType) => void;
  deleteNodeOrEdge: () => void;
  onNodeSelect: (node: Node) => void;
  onEdgeSelect: (edge: Edge) => void;
  setSelectedNode: (node: Node | null) => void;
  validateTree: () => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (params: Edge | Connection) => void;
}

export const GraphContext = createContext<GraphContextProps | undefined>(
  undefined
);

export const GraphContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [validNodes, setValidNodes] = useState<Map<
    string,
    CorrectionType
  > | null>(null);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: any) => {
      const sourceNodeId = connection.source;
      const sourceNode: Node | undefined = nodes.find(
        (node) => node.id === sourceNodeId
      );

      if (!sourceNode || sourceNode.connectionCount >= 2) {
        // Prevent connection if the source node has already 2 connections
        return;
      }

      const edge = {
        ...connection,
        type: "customEdge",
        id: uuidv4(),
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#2a363b",
        },
      };

      setEdges((eds) => addEdge(edge, eds));

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === sourceNodeId) {
            return {
              ...node,
              data: {
                ...node.data,
              },
              connectionCount: node.connectionCount + 1,
            };
          }
          return node;
        })
      );
    },
    [setEdges, nodes, setNodes]
  );

  const addNode = (data: AddNodeType) => {
    const newNodes = data.value.map((value) => ({
      id: uuidv4(),
      position: { x: 0, y: 0 },
      data: {
        label: value,
      },
      type: "customNode",
      value: value,
      connectionCount: 0,
    }));

    setNodes((nds) => [...nds, ...newNodes]);
  };

  const editNode = (data: EditNodeType) => {
    if (selectedNode === null) {
      return;
    }

    setNodes(
      nodes.map((node) =>
        node.id === selectedNode.id
          ? {
              ...node,
              value: data.value,
              data: {
                ...node.data,
                label: data.value,
              },
            }
          : node
      )
    );
  };

  const deleteNodeOrEdge = () => {
    if (selectedNode !== null) {
      setNodes((nds) =>
        nds
          .map((node) => {
            if (
              edges.some(
                (edge) =>
                  edge.target === selectedNode.id && edge.source === node.id
              )
            ) {
              return {
                ...node,
                connectionCount: node.connectionCount - 1,
              };
            }
            return node;
          })
          .filter((node) => node.id !== selectedNode.id)
      );
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    } else if (selectedEdge !== null) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedEdge.source) {
            return {
              ...node,
              data: {
                ...node.data,
              },
              connectionCount: node.connectionCount - 1,
            };
          }
          return node;
        })
      );

      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !(
              edge.target === selectedEdge.target &&
              edge.source === selectedEdge.source
            )
        )
      );
      setSelectedEdge(null);
    }
  };

  const validateTree = () => {
    setValidNodes(null);
    const tree = createBinaryTree(nodes, edges, selectedNode!);
    const validation = validateBinaryTree(tree);

    setValidNodes(validation);
  };

  const onEdgeSelect = (edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const onNodeSelect = (node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        deleteNodeOrEdge();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [deleteNodeOrEdge]);

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        selectedNode,
        selectedEdge,
        validNodes,
        addNode,
        editNode,
        deleteNodeOrEdge,
        onNodeSelect,
        onEdgeSelect,
        setSelectedNode,
        validateTree,
        onNodesChange,
        onEdgesChange,
        onConnect,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};
