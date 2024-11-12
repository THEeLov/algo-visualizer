import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGraph } from "./hooks/useGraphContext";
import CustomNode from "./components/CustomNode";
import { FaMinus, FaPlus, FaQuestion } from "react-icons/fa";
import CustomEdge from "./components/CustomEdge";

const nodeType = { customNode: CustomNode };
const edgeType = { 'customEdge': CustomEdge}

export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteNodeOrEdge,
    onNodeSelect,
    onEdgeSelect,
    selectedNode,
  } = useGraph();

  console.log(selectedNode);

  return (
    <div className="relative">
      <h1 className="absolute font-black text-5xl headline-color p-4">
        Algo-Visualizer
      </h1>
      <div className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeType}
          edgeTypes={edgeType}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => onNodeSelect(node)}
          onNodeDragStart={(_, node, _nodes) => onNodeSelect(node)}
          onEdgeClick={(_, edge) => onEdgeSelect(edge)}
          fitView
        >
          <Controls />
          <Background
            gap={12}
            size={1}
            color="#f1f1f1"
            variant={BackgroundVariant.Dots}
          />
        </ReactFlow>
      </div>

      <button
        className="absolute top-4 right-4 text-white font-bold p-2 rounded button"
        onClick={addNode}
      >
        <FaPlus size={32} />
      </button>

      <button
        className="absolute top-20 right-4 button text-white font-bold p-2 rounded"
        onClick={deleteNodeOrEdge}
      >
        <FaMinus size={32} />
      </button>

      <button className="absolute bottom-4 right-4 p-2 button rounded text-white">
        <FaQuestion size={32}/>
      </button>
    </div>
  );
}
