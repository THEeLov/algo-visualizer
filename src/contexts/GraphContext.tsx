import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  Connection,
} from "@xyflow/react";
import React, { createContext, useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface GraphContextProps {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  addNode: () => void;
  deleteNodeOrEdge: () => void;
  onNodeSelect: (node: Node) => void;
  onEdgeSelect: (edge: Edge) => void;
  setSelectedNode: (node: Node | null) => void;
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

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection:any) => {
      const edge = { ...connection, type: 'customEdge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  const addNode = () => {
    const newNode: Node = {
      id: uuidv4(),
      position: { x: 0, y: 0 },
      data: { label: "Node", isVisited: nodes.length === 0 ? false : true },
      type: "customNode",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteNodeOrEdge = () => {
    if (selectedNode !== null) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    } else if (selectedEdge !== null) {
      console.log(selectedEdge);
      console.log(edges);
      setEdges((eds) => eds.filter((edge) => !(edge.target === selectedEdge.target && edge.source === selectedEdge.source)));
      setSelectedEdge(null);
    }
  };

  const onEdgeSelect = (edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const onNodeSelect = (node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }

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
        addNode,
        deleteNodeOrEdge,
        onNodeSelect,
        onEdgeSelect,
        setSelectedNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};
