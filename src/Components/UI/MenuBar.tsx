import {
  Cog,
  Home,
  MessageSquareText,
  Plus,
  Search,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";


const MenuBar = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-5 z-50">
      {/* Left Icons */}
      <div className="flex gap-4">
        <IconLink to="/dashboard" icon={Home} />
        <IconLink to="/messages" icon={MessageSquareText} />
      </div>

      {/* Floating Middle Button (Main Action - New Chat) */}
      <button
        aria-label="Start new chat"
        className="bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
      >
        <Plus size={28} />
      </button>

      {/* Right Icons */}
      <div className="flex gap-4">
        <IconLink to="/profile" icon={UserRound} />
        <IconLink to="/settings" icon={Cog} />
      </div>
    </div>
  );
};

// Reusable icon component
const IconLink = ({ to, icon: Icon }: { to: string; icon: any }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `w-12 h-12 flex items-center justify-center rounded-full shadow-md transition-all
      ${
        isActive
          ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
          : "bg-white text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`
    }
  >
    <Icon size={22} />
  </NavLink>
);

export default MenuBar;