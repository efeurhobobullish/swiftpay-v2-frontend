import { AnimatePresence, motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <>
      <div className="min-h-[100dvh] flex md:items-center items-start justify-center py-15 bg-gradient-to-b from-violet-900 to-pink-400">
        <div className="w-[90%] max-w-md space-y-10">
          <img
            src="/full-logo-white.svg"
            alt="logo"
            height={200}
            width={200}
            className="mx-auto"
          />
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 space-y-10 shadow-2xl"
            >
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-medium">{title}</h1>
                <p className="text-sm text-gray-500">{description}</p>
              </div>

              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
