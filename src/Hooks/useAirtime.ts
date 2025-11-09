import api from "@/API/axios";
import type { AirtimeDetails } from "@/Pages/Services/Airtime";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useServicesStore } from "@/Stores";
import useAuth from "./useAuth";

const useAirtime = () => {
  const {checkAuth} = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const {airtimeProfitData, getAirtimeProfitData} = useServicesStore()

  const buyAirtime = async (airtimeDetails: AirtimeDetails) => {
    setIsLoading(true);
    try {
      const payload = {
        networkId: airtimeDetails.networkId,
        mainAmount: airtimeDetails.mainAmount,
        discountedAmount: airtimeDetails.discountedAmount,
        phone: airtimeDetails.phone,
      };
      const response = await api.post("/services/airtime", payload);
      await checkAuth()
      return response.data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAirtimeProfits = async (networkName: string) => {
    try {
      const response = await api.get("/services/airtime/profits")
      const networkProfits = response.data.data.map((data: AirtimeProfitType) => data.name === networkName && data.profit )
      return networkProfits
    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message)
      } else if(error instanceof Error){
        toast.error(error.message)
      }
    }
  }

 

  

  return {
    buyAirtime,
    isLoading,
    getAirtimeProfits,
    airtimeProfitData,
    getAirtimeProfitData
  };
};

export default useAirtime;
