import { Handle, Position, Node } from "@xyflow/react";
import { useGraph } from "../hooks/useGraphContext";

function CustomNode({ ...props }) {
  const { selectedNode } = useGraph();

  return (
    <>
      <Handle type="target" position={Position.Top} style={{}} />
      <div
        className={`p-4 ${
          props.id === selectedNode?.id ? "bg-blue-500" : "bg-red-300"
        } border-2`}
      >
        {`Hello`}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CustomNode;
