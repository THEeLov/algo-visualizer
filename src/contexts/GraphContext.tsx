import { addEdge, applyEdgeChanges, applyNodeChanges, Node, Edge, Connection } from "@xyflow/react";
import React, { createContext, useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface GraphContextProps {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  addNode: () => void;
  deleteNode: () => void;
  setSelectedNode: (node: Node | null) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (params: Edge | Connection) => void;
}

export const GraphContext = createContext<GraphContextProps | undefined>(undefined);

export const GraphContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
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

  const deleteNode = () => {
    if (selectedNode === null) return;
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        deleteNode();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [deleteNode]);

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        selectedNode,
        addNode,
        deleteNode,
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