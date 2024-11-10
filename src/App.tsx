import { ReactFlow, Background, Controls, BackgroundVariant } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGraph } from "./hooks/useGraphContext";
import CustomNode from "./components/CustomNode";

const nodeType = { customNode: CustomNode };

export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteNode,
    selectedNode,
    setSelectedNode,
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
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => setSelectedNode(node)}
          onNodeDragStart={(_, node, _nodes) => setSelectedNode(node)}
          onNodeDragStop={(_, node, _nodes) => setSelectedNode(node)}
          fitView
        >
          <Controls />
          <Background gap={12} size={1} color="#f1f1f1" variant={BackgroundVariant.Dots}/>
        </ReactFlow>
      </div>

      <button
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addNode}
      >
        + Add Node
      </button>

      <button
        className="absolute top-16 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={deleteNode}
      >
        - Delete Node
      </button>
    </div>
  );
}
