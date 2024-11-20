import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("BST");

  return (
    <div className="">
      <div className="flex justify-around">
        {["BST", "Heap"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-2 w-full ${
              activeTab === tab
                ? "activeTab"
                : "text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="mt-4">
        {activeTab === "BST" && (
          <div>
            <h2 className="text-lg font-bold">Binary Search Tree (BST)</h2>
            <p>This panel contains information about BST.</p>
          </div>
        )}
        {activeTab === "Heap" && (
          <div>
            <h2 className="text-lg font-bold">Linked List</h2>
            <p>This panel contains information about Linked List.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
