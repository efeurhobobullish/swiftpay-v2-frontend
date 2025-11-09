import api from "@/API/axios";
import type { networkProviders } from "@/constants/data";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import useAuth from "./useAuth";
import { useServicesStore } from "@/Stores";

interface DataPlanDetails {
  phone: string;
  planId: number;
  planName: string;
  planType: string;
  volume: number;
  extension: string;
  networkId: number;
  network: string;
  amount: number;
}

const useDataPlan = () => {
  const {checkAuth} = useAuth()
  const {dataPlans, getDataPlans} = useServicesStore()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<
    (typeof networkProviders)[0] | null
  >(null);

  const [selectedDataPlan, setSelectedDataPlan] = useState<DataPlan | null>(
    null
  );
  const [dataPlanDetails, setDataPlanDetails] =
    useState<DataPlanDetails | null>(null);
    const [planType, setPlanType] = useState<"daily" | "weekly" | "monthly">("daily");

    const [isLoading, setIsLoading] = useState(false);

    const buyData = async (data: DataPlanDetails) =>{
      setIsLoading(true)
      try {
        const payload = {
          networkId: data.networkId,
          planId: data.planId,
          phone: data.phone,
          planAmount: data.amount,
          planName: data.planName,
        }
        console.log(payload)
        const response = await api.post("/services/data", payload)
        await checkAuth()
        return response.data
      } catch (error) {
        console.log(error)
        if(error instanceof AxiosError){
          toast.error(error.response?.data?.message)
        } else if(error instanceof Error){
          toast.error(error.message)
        }
      } finally{
        setIsLoading(false)
      }
    }

  
    

  return {
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
    setIsLoading,
    buyData,
    dataPlans,
    getDataPlans
  };
};

export default useDataPlan;
