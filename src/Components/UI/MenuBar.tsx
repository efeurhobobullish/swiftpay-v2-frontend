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
  { name: "Upload Project", icon: Plus, link: "/upload" },
  { name: "Explore", icon: Search, link: "/explore" },
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
      <div className="bg-primary px-6 py-4 rounded-full fixed bottom-4 left-1/2 -translate-x-1/2 z-50 shadow-xl flex items-center gap-8">
        <ul className="flex items-center gap-2">
          {leftItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center justify-center w-10 h-10 bg-white/20 rounded-full border border-white/10"
                    : "text-white flex items-center justify-center w-10 h-10 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                }
              >
                <item.icon size={20} />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="w-12"></div>

        <ul className="flex items-center gap-2">
          {rightItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-white flex items-center justify-center w-10 h-10 bg-white/20 rounded-full border border-white/10"
                    : "text-white flex items-center justify-center w-10 h-10 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                }
              >
                <item.icon size={20} />
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="absolute border-4 border-primary -top-1/2 left-1/2 -translate-x-1/2 bg-white text-primary h-16 w-16 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          {isOpen ? <X size={28} /> : <LayoutGrid size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="fixed bottom-40 left-1/2 -translate-x-1/2 w-[85%] md:w-[480px] bg-background dark:bg-foreground p-4 rounded-3xl z-50 shadow-2xl border border-white/10"
            >
              <div className="mb-4 px-2">
                 <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Actions</h3>
              </div>
              <ul className="space-y-2">
                {hiddenItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 text-sm font-medium bg-primary/10 text-primary rounded-xl p-4 border border-primary/20"
                          : "flex items-center gap-3 text-sm font-medium text-muted-foreground rounded-xl hover:text-primary hover:bg-secondary/50 border border-transparent p-4 transition-colors"
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
