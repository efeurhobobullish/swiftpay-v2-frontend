import { Link } from "react-router-dom";
import { Link2, Wallet } from "lucide-react";
import { useAuth } from "@/Hooks";
import CountUp from "react-countup";

const WalletCard = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="bg-gradient-to-b from-violet-900 to-pink-400 rounded-3xl p-4 space-y-6">
        <div className="flex items-center justify-between">
          <img src="/logo-white.svg" alt="logo" width={30} />
          <p className="text-white">**** {user?.phone.slice(-4)}</p>
        </div>
        <p className="text-center text-white text-3xl font-bold">
          <CountUp end={Number(user?.wallet)} duration={0.5} decimals={2} separator="," /> <span className="text-lg font-semibold">NGN</span>
        </p>
        <div className="flex items-center gap-2">
          <Link
            to="/wallet"
            className="btn shadow-2xl bg-white/20 border border-white/10 text-white w-full backdrop-blur-sm rounded-full py-3 text-sm font-semibold"
          >
            <Wallet size={18} />
            Wallet
          </Link>
          <Link
            to="/wallet"
            className="btn shadow-2xl bg-white/20 border border-white/10 text-white w-full backdrop-blur-sm rounded-full py-3 text-sm font-semibold"
          >
            <Link2 size={18} />
            Questgen
          </Link>
        </div>
      </div>
    </>
  );
};

export default WalletCard;
