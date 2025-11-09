import { useAuth } from "@/Hooks";
import { Navigate, Outlet } from "react-router-dom";

const Protect = () => {
  const { user} = useAuth();

  // if (isCheckingAuth) {
  //   return <div className="h-screen bg-background center flex-col gap-4">
  //     <span className="loader"></span>
  //     </div>;
  // }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protect;
