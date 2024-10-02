import { FC } from "react";

interface SideMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, onToggle }) => {
  return (
    <div className={`fixed inset-y-0 left-0 ${isOpen ? "w-64" : "w-16"} bg-gray-800 text-white`}>
      <button onClick={onToggle} className="p-4">
        {isOpen ? "Close" : "Open"}
      </button>
      {/* Add menu items here */}
    </div>
  );
};

export default SideMenu;