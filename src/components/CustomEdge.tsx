import {
  BaseEdge,
  getBezierPath,
} from "@xyflow/react";
import { useGraph } from "../hooks/useGraphContext";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }: any) {

  const { selectedEdge } = useGraph();

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const customStyle = {
    stroke: selectedEdge?.id === id ? "#00dbde" : "",
    strokeWidth: 1,
  }

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={customStyle}/>
    </>
  );
}
