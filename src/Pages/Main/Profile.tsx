import { Modal } from "@/Components/Dashboard";
import { useAuth } from "@/Hooks";
import { DashboardLayout } from "@/Layout"
import { ChevronRight, Lock, User, Copy, Check, Settings, LogOut, Trash2, Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
    return (
        <DashboardLayout title="Profile">
            <ProfileCard />
            <SettingsCard />
            <LogoutCard />
        </DashboardLayout>
  )
}

export default Profile


const ProfileCard = () => {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
      setCopied(true);
      navigator.clipboard.writeText(user?.email || "");
      toast.success("Email copied to clipboard", {
        description:
          "You can now share your email with others to receive funds.",
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };
    return (
      <div className="shadow-2xl shadow-primary/10 flex gap-4 md:flex-row flex-col bg-background dark:bg-secondary border border-line rounded-3xl p-6">
        <div className="w-24 h-24 rounded-full bg-primary overflow-hidden">
          <img
            src={`https://api.dicebear.com/9.x/micah/svg?seed=${
              user?.name
            }`}
            alt=""
            className=" object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-main">{user?.name}</h3>
          <p className="text-sm text-muted">{user?.phone}</p>
          <div
            onClick={copyToClipboard}
            className="mt-2  cursor-pointer inline-flex items-center justify-between gap-2 bg-background rounded-full border border-line px-1 pl-4 py-1"
          >
            <p className="text-sm text-muted mr-2">{user?.email}</p>
            <button className="btn bg-foreground rounded-full p-2">
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} className="text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const SettingsCard = () => {
    const settings = [
      {
        title: "Update Profile",
        icon: <User size={18} />,
        link: "update",
      },
      {
        title: "Set Preferences",
        icon: <Settings size={18} />,
        link: "preferences",
      },
      {
        title: "Set Security Pin",
        icon: <Lock size={18} />,
        link: "pin",
      },
    ];
    return (
      <>
        <div className="">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-outfit text-mute">
              Account Settings
            </h3>
          </div>
  
          <div className="shadow-2xl shadow-primary/10 bg-background dark:bg-secondary border border-line rounded-xl p-4 mt-4">
            <ul className="flex flex-col">
              {settings.map((setting) => (
                <li
                  key={setting.title}
                  className="border-b border-line last:border-b-0 first:rounded-t-lg last:rounded-b-lg overflow-hidden"
                >
                  <Link
                  
                    to={setting.link}
                    className="flex items-center justify-between py-4 px-2 hover:bg-secondary dark:hover:bg-foreground "
                  >
                    <div className="flex items-center gap-4 text-sm">
                      {setting.icon}
                      <span>{setting.title}</span>
                    </div>
                    <ChevronRight size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  };

  const LogoutCard = () => {
    const { logout, isLoading } = useAuth();
    const [showModal, setShowModal] = useState({
      logout: false,
      delete: false,
    });
    const toggleModal = (modal: "logout" | "delete") => {
      setShowModal((prev) => ({ ...prev, [modal]: !prev[modal] }));
    };
  
    
  
   
    return (
      <>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleModal("logout")}
            className="btn bg-red-500/10 text-sm font-medium text-red-500 rounded-xl px-4 h-10"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
          
            <button
              onClick={() => toggleModal("delete")}
              className="btn bg-primary/10 text-sm font-medium text-primary rounded-xl px-4 h-10"
            >
              <Trash2 size={18} />
              <span>Delete Account</span>
            </button>
        
        </div>
  
        {showModal.logout && (
          <Modal
            isOpen={showModal.logout}
            onClose={() => toggleModal("logout")}
            title="Logout"
          >
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-secondary text-sm font-medium hover:bg-secondary/80 transition-all duration-300 rounded-lg px-4 h-10"
                  onClick={() => toggleModal("logout")}
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  className="bg-red-500 text-white text-sm font-medium hover:bg-red-500/30 transition-all duration-300 rounded-lg px-4 h-10"
                  onClick={logout}
                >
                  {isLoading ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </div>
          </Modal>
        )}
        {showModal.delete && (
          <Modal
            isOpen={showModal.delete}
            onClose={() => toggleModal("delete")}
            title="Delete Account"
          >
            <div className="space-y-4">
            <p className="text-sm">Are you sure you want to delete your account?</p>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={()=>{
                    toggleModal("delete")
                    toast.warning("Contact Admin!",{
                      description:"Reachout to Admin to complete this action!"
                    })
                  }}
                  className="btn bg-red-500 text-white rounded-lg text-sm px-4 h-10"
                >
                  <LogOut size={18} />
                  <span>Yes, delete</span>
                </button>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  };