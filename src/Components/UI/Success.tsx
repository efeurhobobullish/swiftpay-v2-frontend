import { motion } from "framer-motion";
import { CircleCheck, X } from "lucide-react";
import { Link } from "react-router-dom";

const Success = ({
  description,
  onClose,
}: {
  description: string;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed h-screen w-screen center inset-0 bg-black/50 backdrop-blur-sm z-100"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="w-[90%] md:w-[500px] mx-auto p-4 bg-background dark:bg-secondary rounded-3xl pt-10"
      >
        <div className="space-y-4">
          <div className="bg-green-500/10 text-green-500 backdrop-blur-sm rounded-full h-20 w-20 center mx-auto">
            <CircleCheck size={40} />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl text-main font-semibold">
              Payment Successful!
            </h1>
            <p className="text-muted text-sm">{description}</p>
          </div>
          <div className="flex gap-2 mt-20">
            <button
              onClick={onClose}
              className="bg-red-500/10 text-red-500 w-1/2 h-12 rounded-full"
            >
              <X size={16} />
              <span>Close</span>
            </button>
            <Link
              to="/transactions"
              className="btn w-1/2 bg-primary/10 text-primary h-12 rounded-full"
            >
              <span>Transactions</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Success;
