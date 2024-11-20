import { useDialogs } from "@/hooks/useDialogsContext";
import { useGraph } from "@/hooks/useGraphContext";
import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";

const BstOperations = () => {
  const { setIsAddDialogOpen, setIsEditDialogOpen } = useDialogs();
  const { selectedNode } = useGraph();
  const { deleteNodeOrEdge } = useGraph();

  return (
    <div className="flex gap-2">
      <button
        className="text-white p-2 rounded button"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <FaPlus size={16}/>
      </button>

      <button
        className="button text-white p-2 rounded"
        onClick={deleteNodeOrEdge}
      >
        <FaMinus size={16} />
      </button>

      <button
        className="p-2 button rounded text-white"
        onClick={() => setIsEditDialogOpen(true)}
        disabled={selectedNode === null}
      >
        <FaEdit size={16} />
      </button>
    </div>
  );
};

export default BstOperations;
