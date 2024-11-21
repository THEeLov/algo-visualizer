import { FaQuestion } from "react-icons/fa";
import BstOperations from "./tabsOperations/BstOperations";
import BstAlgorithms from "./tabsOperations/BstAlgorithms";
const BstTab = () => {
  return (
    <div className="pl-4 pr-4 flex flex-col gap-7">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold font-mono select-none">Binary Search Tree (BST) </h2>
        <button className="button text-white font-bold pl-2 pr-2 rounded button">
          <FaQuestion />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-mono">Operations</h3>
        <BstOperations />
      </div>

      <div>
        <h3 className="font-mono">Algorithms</h3>
        <BstAlgorithms />
      </div>
    </div>
  );
};

export default BstTab;
