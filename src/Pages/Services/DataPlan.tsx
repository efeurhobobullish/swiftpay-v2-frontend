import { networkProviders } from "@/constants/data";
import { useAuth, useDataPlan } from "@/Hooks";
import { DashboardLayout } from "@/Layout";
import { CircleCheck, Loader, OctagonAlert, Phone, X } from "lucide-react";
import { useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Success } from "@/Components/UI";
import { formatNumber } from "@/Utils/formatNumber";
import { Modal } from "@/Components/Dashboard";
import { toast } from "sonner";

const formSchema = z.object({
  phone: z.string().min(1, { message: "Phone number is required" }),
});

type FormData = z.infer<typeof formSchema>;

export interface DataPlanDetails {
  phone: string;
  planId: number;
  networkId: number;
  network: string;
  amount: number;
  planName: string;
}

const DataPlan = () => {
  const { user } = useAuth();
  const {
    selectedNetwork,
    setSelectedNetwork,
    selectedDataPlan,
    setSelectedDataPlan,
    dataPlanDetails,
    setDataPlanDetails,
    isModalOpen,
    setIsModalOpen,
    isSuccess,
    setIsSuccess,
    message,
    setMessage,
    planType,
    setPlanType,
    isLoading,
    buyData,
    dataPlans,
  } = useDataPlan();

 

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleNetworkSelect = (network: (typeof networkProviders)[0]) => {
    setSelectedNetwork(network);
  };

  const handleUseMyNumber = () => {
    setValue("phone", user?.phone || "");
    clearErrors("phone");
  };

  const handlePlanTypeSelect = (type: "daily" | "weekly" | "monthly") => {
    setPlanType(type);
  };

  const handlePlanSelect = (plan: DataPlan) => {
    setSelectedDataPlan(plan);
  };

  const onSubmit = (data: FormData) => {
    if (!selectedNetwork || !selectedDataPlan) {
      toast.error("Please select a network and a data plan");
      return;
    }

    setDataPlanDetails({
      phone: data.phone,
      planId: selectedDataPlan?.planId,
      planName: selectedDataPlan?.planName,
      planType: selectedDataPlan?.planType,
      volume: selectedDataPlan?.volume,
      extension: selectedDataPlan?.extension,
      networkId: selectedNetwork?.id,
      network: selectedNetwork?.name,
      amount: selectedDataPlan?.price,
    });

    setIsModalOpen(true);
    reset();
    setSelectedDataPlan(null);
  };

  const onError = (errors: FieldErrors<FormData>) => {
    console.log(errors);
  };

  const handleConfirm = async () => {
    if (!dataPlanDetails) return;

    const response = await buyData(dataPlanDetails);
    if (response?.success) {
      setIsModalOpen(false);
      setIsSuccess(true);
      setMessage(response?.data?.message);
    }
  };

  const filteredDataPlans = dataPlans?.filter(
    (plan: DataPlan) =>
      plan.planType === planType && plan.network === selectedNetwork?.name
  );

  return (
    <>
      <DashboardLayout title="Data Plan">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
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
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
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

                <div className="border border-line p-4 rounded-2xl shadow-xl dark:shadow-2xl shadow-primary/10 dark:bg-secondary">
                  <ul className="grid grid-cols-3 gap-2">
                    {["daily", "weekly", "monthly"].map((type) => (
                      <li
                        key={type}
                        className="bg-secondary dark:bg-background rounded-lg overflow-hidden"
                      >
                        <button
                          type="button"
                          className={`h-8 text-xs capitalize rounded-lg font-medium w-full ${
                            planType === type
                              ? "bg-primary text-white"
                              : "bg-foreground"
                          }`}
                          onClick={() =>
                            handlePlanTypeSelect(
                              type as "daily" | "weekly" | "monthly"
                            )
                          }
                        >
                          {type}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {filteredDataPlans?.map((plan: DataPlan) => (
                      <div
                        key={plan.planId}
                        onClick={() => handlePlanSelect(plan)}
                        className={`cursor-pointer rounded-xl p-2 py-4 ${
                          selectedDataPlan?.planId === plan.planId
                            ? "bg-yellow-500/10 text-yellow-600 border-2 border-yellow-500"
                            : "bg-foreground border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center flex-col gap-1">
                          <span className="text-sm text-yellow-600 dark:text-yellow-500 font-outfit font-semibold">
                            {plan.volume} {plan.extension}
                          </span>
                          <span className="text-xs font-medium">
                            {plan.days}
                          </span>
                          <span className="text-xs font-medium">
                            ₦ {formatNumber(plan.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredDataPlans.length === 0 && (
                    <div className="center bg-foreground p-4 rounded-sm flex-col gap-1 h-full ">
                      <div className="center bg-yellow-500/10 text-yellow-500 rounded-full h-14 w-14">
                        <OctagonAlert size={24} />
                      </div>
                      <p className="text-sm text-main">No plans found</p>
                      <p className="text-xs text-muted">
                        Did you select a Network?
                      </p>
                    </div>
                  )}

                  {selectedDataPlan && (
                    <div className="mt-4 bg-foreground p-4 rounded-lg relative overflow-hidden">
                      <p className="text-sm text-muted">Selected Plan</p>
                      <p className="font-semibold">
                        {selectedDataPlan.planName} - ₦
                        {formatNumber(selectedDataPlan.price)}
                      </p>
                      <button
                        onClick={() => setSelectedDataPlan(null)}
                        className="absolute top-0 right-0 bg-red-500/10 text-red-500 p-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary h-12 rounded-full font-medium w-full mt-4"
                >
                  Proceed
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
                    {dataPlanDetails?.phone}
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="text-muted text-sm">Plan:</span>
                  <span className="text-medium text-sm">
                    {dataPlanDetails?.planName}
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="text-muted text-sm">Amount:</span>
                  <span className="text-medium text-sm">
                    ₦{formatNumber(dataPlanDetails?.amount || 0)}
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
                  <span>Pay ₦{formatNumber(dataPlanDetails?.amount || 0)}</span>
                )}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {isSuccess && (
        <Success
          onClose={() => setIsSuccess(false)}
          description={message || "Your data plan purchase was successful."}
        />
      )}
    </>
  );
};

export default DataPlan;
