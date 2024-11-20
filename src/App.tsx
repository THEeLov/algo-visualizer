import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGraph } from "./hooks/useGraphContext";
import CustomNode from "./components/CustomNode";
import CustomEdge from "./components/CustomEdge";
import { useDialogs } from "./hooks/useDialogsContext";
import EditNodeDialog from "./dialogs/EditNodeDialog";
import AddNodeDialog from "./dialogs/AddNodeDialog";
import { ToastContainer } from 'react-toastify';
import Sidebar from "./components/Sidebar";

const nodeType = { customNode: CustomNode };
const edgeType = { customEdge: CustomEdge };

export default function App() {
  const { isEditDialogOpen, isAddDialogOpen } = useDialogs();

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeSelect,
    onEdgeSelect,
  } = useGraph();

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
            color="#C8C8C8"
            variant={BackgroundVariant.Dots}
          />
        </ReactFlow>
      </div>

      {/* <Toolbar /> */}

      {isEditDialogOpen && <EditNodeDialog />}
      {isAddDialogOpen && <AddNodeDialog />}  

      <ToastContainer />

      <Sidebar/>
    </div>
  );
}
