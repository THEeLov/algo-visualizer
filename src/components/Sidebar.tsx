import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import Tabs from "./Tabs";
import { IoIosBackspace } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="absolute top-2 right-2 font-bold p-1 rounded button"
      >
        <IoIosSettings
          size={32}
          color="white"
          className="transition-transform duration-200 hover:rotate-90"
        />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] sidebar text-white transform transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className={`absolute -left-9 text-white p-2 rounded-r-md sidebarButton rotate-180 ${isOpen ? "" : "hidden"}`}
          onClick={() => setIsOpen(false)}
        >
          <IoIosBackspace size={24} />
        </button>
        <Tabs />
      </div>
    </div>
  );
};

export default Sidebar;
