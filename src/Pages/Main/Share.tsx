import { ButtonWithLoader, InputWithIcon, Success } from "@/Components/UI";
import { useAuth, useTransactions, useUsers } from "@/Hooks";
import { DashboardLayout } from "@/Layout";
import { formatNumber } from "@/Utils/formatNumber";
import { motion, AnimatePresence } from "framer-motion";
import { Info, RefreshCcw, Search, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Share = () => {
  const { sendFunds, isLoading } = useTransactions();
  const { user } = useAuth();
  const { users } = useUsers();
  const [receiver, setReceiver] = useState<User>();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const foundEmail = searchParams.get("found");
    if (foundEmail && users) {
      const existing = users.find((user: User) => user.email === foundEmail);
      if (existing) {
        setReceiver(existing);
      }
    }
  }, [searchParams, users]);

  const findUser = () => {
    if (users && email.length > 5) {
      const foundUser = users.find((user: User) => user.email === email);

      if (foundUser) {
        setReceiver(foundUser);
        setSearchParams({ found: foundUser.email });
        setEmail("");
      } else {
        toast.error("Receipient not found");
      }
    }
  };

  const handleSendFunds = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !receiver) return;

    if (!amount) return toast.error("Amount is required");

    const result = await sendFunds(user?.id, receiver?.email, Number(amount));

    if (result?.success) {
      setMessage(result.message);
      setIsSuccess(result.success);
      setReceiver(undefined);
      searchParams.delete("found");
      setSearchParams(searchParams);
      setAmount("")
    }
  };

  return (
    <>
      <DashboardLayout title="Send Funds">
      <div className="rounded-md max-w-full mx-auto bg-yellow-500/10 dark:text-yellow-500 text-yellow-600 p-4 font-medium flex gap-2 text-xs text-left">
  <Info size={18} className="flex-shrink-0 mt-1" />
  <p>
    Fund transfers are available exclusively between <span className="font-semibold">QuestPay</span> users. Enjoy seamless and <span className="font-semibold">fee-free</span> transactions within the platform.
  </p>
</div>

        <div className="bg-secondary p-4 rounded-xl space-y-2">
          <p className="text-sm text-muted">Available Balance </p>
          <p className=" text-2xl font-bold">
            {formatNumber(user?.wallet)}{" "}
            <span className="text-lg font-semibold">NGN</span>
          </p>
        </div>
        <AnimatePresence mode="popLayout">
          {!receiver && (
            <motion.div
              initial={{ y: -30, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0.8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              layoutId="recipient-block"
              className="border border-line p-4 space-y-4 rounded-xl dark:bg-secondary"
            >
              <input
                type="email"
                placeholder="Find receipient by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-foreground h-11 px-4 text-sm rounded-lg w-full"
              />
              <button
                onClick={findUser}
                className="btn-primary-2 text-sm h-11 w-full rounded-full"
              >
                <Search size={20} /> Find Receipient
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {receiver && (
            <motion.button
              initial={{ x: -100, opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="text-sm flex items-center gap-1 text-muted mt-4"
              onClick={() => {
                setReceiver(undefined);
                searchParams.delete("found");
                setSearchParams(searchParams);
              }}
            >
              <RefreshCcw size={18} /> Change recipient
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {receiver && (
            <motion.form
              onSubmit={handleSendFunds}
              initial={{ y: 30, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0.8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              layoutId="recipient-block"
              className="dark:bg-secondary shadow-2xl shadow-primary/10 border border-line rounded-3xl p-6 w-full space-y-4"
            >
              <div className="bg-foreground p-4 rounded-2xl">
                <p className="text-sm text-muted">Receiver</p>
                <p className="font-semibold text-lg">{receiver.name}</p>
              </div>

              <InputWithIcon
                label="Amount"
                icon={<Wallet size={20} />}
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <ButtonWithLoader
                loading={isLoading}
                initialText="Tranfer"
                loadingText="Transferring..."
                className="btn-primary text-sm h-11 w-full rounded-full"
              />
            </motion.form>
          )}
        </AnimatePresence>
      </DashboardLayout>

      <AnimatePresence>
        {isSuccess && (
          <Success
            onClose={() => setIsSuccess(false)}
            description={
              message ||
              "Your payment has been successful. You can now close this page."
            }
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Share;
