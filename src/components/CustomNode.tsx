import { Handle, Position } from "@xyflow/react";
import { useGraph } from "../hooks/useGraphContext";
import CustomHandle from "./CustomHandle";
import { CorrectionType } from "@/types";

function CustomNode({ ...props }) {
  const { selectedNode, validNodes } = useGraph();

  const validation: CorrectionType | null | undefined =
    validNodes?.get(props.id) === undefined
      ? null
      : validNodes!.get(props.id);

  return (
    <>
      <CustomHandle type="target" position={Position.Top} connectionCount={1} />
      <div
        className={`pt-2 pb-2 pl-4 pr-4 rounded-full ${
          props.id === selectedNode?.id
            ? "nodeSelected motion-preset-confetti -z-10"
            : ""
        } ${
          validation === "correct" && "correctNode motion-preset-confetti -z-10"
        } 
        ${validation === "incorrect" && "incorrectNode motion-preset-confetti -z-10"} border-2`}
      >
        {`${props.data.label}`}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CustomNode;
