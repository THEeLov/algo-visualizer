import { FaQuestion } from "react-icons/fa";
import BstOperations from "./tabsOperations/BstOperations";
const BstTab = () => {
  return (
    <div className="pl-4 pr-4 flex flex-col gap-7">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Binary Search Tree (BST) </h2>
        <button className="button text-white font-bold pl-2 pr-2 rounded button">
          <FaQuestion />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h1>Operations</h1>
        <BstOperations />
      </div>
    </div>
  );
};

export default BstTab;
