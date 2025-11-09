import { useAuth } from "@/Hooks";
import { DashboardLayout } from "@/Layout";
import { RecentTransactions } from "@/Components/Dashboard";
import { formatNumber } from "@/Utils/formatNumber";
import { Send, Wallet2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wallet = () => {
  const { user } = useAuth();

  

  return (
    <DashboardLayout title="Wallet">
       <div className="bg-primary rounded-3xl p-4 space-y-6">
        <div className="flex items-center justify-between">
          <img src="/logo-white.svg" alt="logo" width={30} />
          <p className="text-white">**** {user?.phone.slice(-4)}</p>
        </div>
        <p className="text-center text-white text-3xl font-bold">
          {formatNumber(user?.wallet)} <span className="text-lg font-semibold">NGN</span>
        </p>
        <div className="flex items-center gap-2">
          <Link
            to="/wallet/fund"
            className="btn shadow-2xl bg-white/20 border border-white/10 text-white w-full backdrop-blur-sm rounded-full py-3 text-sm font-semibold"
          >
            <Wallet2 size={18} />
            Deposit
          </Link>
          <Link
            to="/wallet/share"
            className="btn shadow-2xl bg-white/20 border border-white/10 text-white w-full backdrop-blur-sm rounded-full py-3 text-sm font-semibold"
          >
            <Send size={18} />
            Send Funds
          </Link>
        </div>
      </div>

      

      <RecentTransactions />
    </DashboardLayout>
  );
};

export default Wallet;
