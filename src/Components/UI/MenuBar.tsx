import {
  Cog,
  Home,
  LayoutGrid,
  MessageSquareText,
  Plus,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  { name: "Home", icon: Home, link: "/dashboard" },
  { name: "Messages", icon: MessageSquareText, link: "/messages" },
  { name: "Profile", icon: UserRound, link: "/profile" },
  { name: "Settings", icon: Cog, link: "/settings" },
  { name: "New Chat", icon: Plus, link: "/new-chat" },
  { name: "Search", icon: Search, link: "/explore" },
];

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const leftItems = menuItems.slice(0, 2);
  const rightItems = menuItems.slice(2, 4);
  const hiddenItems = menuItems.slice(4);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Bottom Nav */}
      <div className="bg-blue-600 dark:bg-blue-500 px-6 py-4 rounded-full fixed bottom-4 left-1/2 -translate-x-1/2 z-50 shadow-lg flex items-center gap-8 backdrop-blur-md">
        <ul className="flex items-center gap-2">
          {leftItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center justify-center w-10 h-10 bg-white/20 rounded-full border border-white/20 shadow-sm"
                    : "text-white/80 flex items-center justify-center w-10 h-10 rounded-full hover:text-white hover:bg-white/10 transition-all"
                }
              >
                <item.icon size={20} />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="w-14" />

        <ul className="flex items-center gap-2">
          {rightItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center justify-center w-10 h-10 bg-white/20 rounded-full border border-white/20 shadow-sm"
                    : "text-white/80 flex items-center justify-center w-10 h-10 rounded-full hover:text-white hover:bg-white/10 transition-all"
                }
              >
                <item.icon size={20} />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Center Action Button */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-blue-600 dark:text-blue-500 h-16 w-16 flex items-center justify-center rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform border-4 border-blue-600 dark:border-blue-500"
        >
          {isOpen ? <X size={28} /> : <LayoutGrid size={28} />}
        </button>
      </div>

      {/* Sliding Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Popup Menu */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="fixed bottom-36 left-1/2 -translate-x-1/2 w-[85%] md:w-[450px] bg-white dark:bg-gray-900 p-5 rounded-3xl z-50 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="mb-4">
                <h3 className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
                  Quick Actions
                </h3>
              </div>

              <ul className="space-y-2">
                {hiddenItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 text-sm font-medium bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl p-4 border border-blue-200 dark:border-blue-500/30"
                          : "flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      }
                    >
                      <item.icon size={22} />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuBar;