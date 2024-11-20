import {
  FaCreativeCommons,
  FaEdit,
  FaMinus,
  FaPlus,
  FaQuestion,
} from "react-icons/fa";
import { useGraph } from "../hooks/useGraphContext";
import { useDialogs } from "../hooks/useDialogsContext";

const Toolbar = () => {
  const { setIsAddDialogOpen, setIsEditDialogOpen } = useDialogs();
  const { selectedNode, createTree } = useGraph();
  const { deleteNodeOrEdge } = useGraph();

  return (
    <>
      <div className="  ">
        <button
          className="absolute top-4 right-4 text-white font-bold p-2 rounded button"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <FaPlus size={32} />
        </button>

        <button
          className="absolute top-20 right-4 button text-white font-bold p-2 rounded"
          onClick={deleteNodeOrEdge}
        >
          <FaMinus size={32} />
        </button>

        <button
          className="absolute top-36 right-4 p-2 button rounded text-white"
          onClick={() => setIsEditDialogOpen(true)}
          disabled={selectedNode === null}
        >
          <FaEdit size={32} />
        </button>

        <button
          className="absolute top-52   right-4 p-2 button rounded text-white"
          onClick={createTree}
        >
          <FaCreativeCommons size={32} />
        </button>

        {/* TODO: Do some manual that explain functionality */}
        <button className="absolute bottom-4 right-4 p-2 button rounded text-white">
          <FaQuestion size={32} />
        </button>
      </div>
    </>
  );
};

export default Toolbar;
