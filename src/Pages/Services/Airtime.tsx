import { Modal } from "@/Components/Dashboard";
import { networkProviders } from "@/constants/data";
import { useAirtime, useAuth } from "@/Hooks";
import { DashboardLayout } from "@/Layout";
import { formatNumber } from "@/Utils/formatNumber";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Loader, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Success } from "@/Components/UI";
import { toast } from "sonner";

const formSchema = z.object({
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  network: z.number().min(1, { message: "Network is required" }),
});

type FormData = z.infer<typeof formSchema>;

export interface AirtimeDetails {
  mainAmount: number;
  discountedAmount: number;
  networkId: number | undefined;
  networkName: string | undefined;
  phone: string;
}

const Airtime = () => {
  const { user } = useAuth();
  const { buyAirtime, isLoading, airtimeProfitData } = useAirtime();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [selectedNetwork, setSelectedNetwork] = useState<
    (typeof networkProviders)[0] | null
  >(null);

  const [airtimeDetails, setAirtimeDetails] = useState<AirtimeDetails | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleNetworkSelect = (network: (typeof networkProviders)[0]) => {
    setSelectedNetwork(network);
    setValue("network", network.id);
  };

  const handleUseMyNumber = () => {
    setValue("phoneNumber", user?.phone || "");
    clearErrors("phoneNumber");
  };

  const onSubmit = (data: FormData) => {
    if (!selectedNetwork) {
      toast.error("Please select a network to continue");
      return;
    }

    const airtimeProfitMargin =
      airtimeProfitData.find((profit) => profit.name === selectedNetwork?.name)
        ?.profit || 0;
    const mainAmount = Number(data.amount);
    const discount = (mainAmount * airtimeProfitMargin) / 100;
    const discountedAmount = mainAmount - discount;

    setAirtimeDetails({
      mainAmount,
      discountedAmount,
      networkId: selectedNetwork?.id,
      networkName: selectedNetwork?.name,
      phone: data.phoneNumber,
    });

    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!airtimeDetails) return;
    const response = await buyAirtime(airtimeDetails);
    if (response?.success) {
      setIsModalOpen(false);
      setIsSuccess(true);
      setMessage(response?.data?.message);
      reset();
    }
  };

  return (
    <>
      <DashboardLayout title="Airtime">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="border border-line md:p-4 p-2 rounded-2xl shadow-xl dark:shadow-2xl shadow-primary/10 dark:bg-secondary">
            <ul className="grid grid-cols-4 md:gap-2 gap-1">
              {networkProviders.map((network) => (
                <li
                  key={network.id}
                  className={`center relative cursor-pointer flex-col gap-2 p-2 rounded-xl ${
                    selectedNetwork?.id === network.id
                      ? "border-3 border-green-500 bg-green-500/10"
                      : "border-3 border-transparent bg-foreground"
                  }`}
                  onClick={() => handleNetworkSelect(network)}
                >
                  <div className="md:h-9 md:w-9 h-8 w-8 rounded-lg overflow-hidden">
                    <img
                      src={network.image}
                      alt={network.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="md:text-sm text-xs font-medium text-center">
                    {network.name}
                  </span>
                  {selectedNetwork?.id === network.id && (
                    <CircleCheck
                      size={28}
                      className="absolute -top-2 -right-2 bg-green-500 z-10 text-white rounded-full p-1"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          {selectedNetwork && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border border-line p-4 rounded-2xl shadow-xl dark:shadow-2xl shadow-primary/10 dark:bg-secondary">
                  <label htmlFor="phone" className="text-sm text-muted">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="E.g 080 2222 2222"
                    className="input w-full my-1"
                    {...register("phoneNumber")}
                  />

                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleUseMyNumber}
                    className="bg-primary/10 text-primary dark:text-main dark:bg-foreground font-medium px-3 h-10 rounded-full mt-4 flex items-center gap-2 justify-center w-fit"
                  >
                    <Phone size={18} />
                    <span className="text-sm">Use my number</span>
                  </button>
                </div>
                <div className="border border-line p-4 dark:bg-secondary rounded-2xl shadow-xl dark:shadow-2xl shadow-primary/10">
                  <label htmlFor="amount" className="text-sm text-muted">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="E.g 100"
                    className="input w-full my-1"
                    {...register("amount")}
                  />

                  {errors.amount && (
                    <p className="text-red-500 text-sm">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary h-12 rounded-full font-medium w-full mt-4"
                >
                  <span>Proceed</span>
                </button>
              </motion.div>
            </>
          )}

          {!selectedNetwork && (
            <p className="text-lg text-muted text-center">
              Please select a network to continue!
            </p>
          )}
        </form>
      </DashboardLayout>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title="Confirm Purchase"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <div className="space-y-4">
              <p className=" text-sm">
                Please confirm your details before proceeding
              </p>
              <ul className="space-y-2 bg-foreground p-2 rounded-lg">
                <li className="flex items-center justify-between gap-2">
                  <span className="text-muted text-sm">Network:</span>
                  <span className="text-medium text-sm">
                    {selectedNetwork?.name}
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="text-muted text-sm">Phone Number:</span>
                  <span className="text-medium text-sm">
                    {airtimeDetails?.phone}
                  </span>
                </li>

                <li className="flex items-center justify-between gap-2">
                  <span className="text-muted text-sm">Amount:</span>
                  <span className="text-medium text-sm">
                    &#8358;
                    {formatNumber(Number(airtimeDetails?.mainAmount) || 0)}
                  </span>
                </li>

                <li className="flex items-center justify-between gap-2">
                  <span className="text-muted text-sm">Discount:</span>
                  <span className="text-medium text-sm">
                    {airtimeProfitData.find(
                      (profit) => profit.name === selectedNetwork?.name
                    )?.profit || 0}
                    %
                  </span>
                </li>
              </ul>

              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="btn-primary-2 h-12 rounded-full font-medium w-full mt-4"
              >
                {isLoading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <span>
                    Pay &#8358;
                    {formatNumber(Number(airtimeDetails?.discountedAmount))}
                  </span>
                )}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

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

export default Airtime;
