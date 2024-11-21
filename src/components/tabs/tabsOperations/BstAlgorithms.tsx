import { useGraph } from "@/hooks/useGraphContext";
import { FaCheck } from "react-icons/fa";

const BstAlgorithms = () => {

  const {validateTree, selectedNode} = useGraph();

  return (
    <div>
      <button className="button font-mono p-2 rounded-md flex items-center space-x-2" onClick={validateTree} disabled={selectedNode === null}>
        <FaCheck />
        <span>VALIDATE</span>
      </button>
    </div>
  );
};

export default BstAlgorithms;
