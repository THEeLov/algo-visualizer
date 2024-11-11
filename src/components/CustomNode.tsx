import { Handle, Position } from "@xyflow/react";
import { useGraph } from "../hooks/useGraphContext";

function CustomNode({ ...props }) {
  const { selectedNode } = useGraph();

  return (
    <>
      <Handle type="target" position={Position.Top} style={{}} />
      <div
        className={`pt-2 pb-2 pl-4 pr-4 rounded-lg ${
          props.id === selectedNode?.id ? "nodeSelected motion-preset-confetti -z-10" : ""
        } border-2`}
      >
        {`${props.data.label}`}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CustomNode;
