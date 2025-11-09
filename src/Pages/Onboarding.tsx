import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/API/axios";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkServices = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/");
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error("Services are not available");
      } finally {
        setIsLoading(false);
      }
    };
    checkServices();
  }, []);

  return (
    <div className="h-[100dvh] relative w-screen bg-gradient-to-b from-violet-900 to-pink-400 flex items-center justify-between flex-col py-12">
      <main className=" h-full">
        <img
          src="/full-logo-white.svg"
          alt="logo"
          height={200}
          width={200}
          className="absolute top-10 left-1/2 -translate-x-1/2"
        />

        <AnimatePresence>
          {isLoading ? (
            <div className="center gap-2 text-center absolute bottom-15 left-1/2 -translate-x-1/2 w-[90%] md:w-[480px] mx-auto">
              <Loader size={20} className="animate-spin text-white" />
              <p className="text-white/80 text-sm font-medium animate-pulse">
                Checking Services...
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{
                delay: 0.5,
              }}
              className="space-y-4 text-center absolute bottom-15 left-1/2 -translate-x-1/2 w-[90%] md:w-[480px] mx-auto"
            >
              <div className="space-y-2 border-b border-white/20 pb-4">
                <h1 className="text-4xl text-white font-light">
                  Quick, simple <br />
                  bill payments
                </h1>
                <p className="text-white/80 text-sm">
                  Buy airtime, data, cable tv, and more at affordable rates
                </p>
              </div>
              <div className="space-y-4">
                <Link
                  to="/signup"
                  className="btn bg-white text-[#333] font-semibold font-serif py-3 rounded-full"
                >
                  Create an account
                </Link>
                <Link
                  to="/login"
                  className="text-white underline underline-offset-2"
                >
                  I already have an account
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Onboarding;
