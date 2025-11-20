import {
    MessageSquare,
    Code,
    Users,
    User,
    Settings,
    FolderGit2,
    X,
    Menu,
    Bell,
    Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
    { name: "Chats", icon: MessageSquare, link: "/chats", badge: 3 },
    { name: "Projects", icon: FolderGit2, link: "/projects" },
    { name: "Teams", icon: Users, link: "/teams" },
    { name: "Code Snippets", icon: Code, link: "/snippets" },
    { name: "Profile", icon: User, link: "/profile" },
    { name: "Settings", icon: Settings, link: "/settings" },
];

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const primaryItems = menuItems.slice(0, 3);
    const secondaryItems = menuItems.slice(3);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            {/* Main navigation bar */}
            <div className="bg-gray-900 border-t border-gray-700 fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-gray-900/95">
                <div className="flex items-center justify-between px-6 py-3">
                    {/* Primary navigation items */}
                    <div className="flex items-center gap-8">
                        {primaryItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.link}
                                className={({ isActive }) =>
                                    `relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                                        isActive
                                            ? "text-blue-400 bg-blue-400/10"
                                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }`
                                }
                            >
                                <item.icon size={20} />
                                <span className="text-xs font-medium">{item.name}</span>
                                {item.badge && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Central menu button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                        className="relative -top-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white h-14 w-14 flex items-center justify-center rounded-2xl shadow-lg border border-blue-400/30 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                        {hasUnread && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></span>
                        )}
                    </button>

                    {/* Quick actions */}
                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <Search size={20} />
                        </button>
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Expanded menu panel */}
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="fixed bottom-20 left-4 right-4 bg-gray-800 border border-gray-700 rounded-2xl z-50 shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-gray-700">
                                <h3 className="text-white font-semibold">Developer Tools</h3>
                                <p className="text-gray-400 text-sm">Quick access to your workspace</p>
                            </div>

                            {/* Secondary menu items */}
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-3">
                                    {secondaryItems.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.link}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                                        : "border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-700/50"
                                                }`
                                            }
                                        >
                                            <item.icon size={18} />
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </NavLink>
                                    ))}
                                </div>

                                {/* Quick stats */}
                                <div className="mt-4 p-3 bg-gray-900/50 rounded-xl border border-gray-700">
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Active Projects</span>
                                        <span>3</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                                        <span>Unread Messages</span>
                                        <span>5</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default MenuBar;