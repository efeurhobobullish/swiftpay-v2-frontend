import api from "@/API/axios";
import { useTransactionStore } from "@/Stores";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import useAuth from "./useAuth";

const useTransactions = () => {
  const { checkAuth } = useAuth();
  const { transactions, getTransactions } = useTransactionStore();
  const [isLoading, setIsLoading] = useState(false);

  const createTransaction = async (
    amount: number,
    reference: string,
    status: string
  ) => {
    setIsLoading(true);
    try {
      const response = await api.post("/transactions/create", {
        amount,
        reference,
        status,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        checkAuth();
      }
      return response?.data.data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createBankAccount = async (idNumber: number) => {
    setIsLoading(true);
    try {
      const response = await api.post("/user/bank", idNumber);
      if (response.data.success) {
        checkAuth();
        return response.data.message;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendFunds = async (
    senderId: string,
    receipientEmail: string,
    amount: number
  ): Promise<{message: string, success: boolean} | undefined> => {
    setIsLoading(true);
    try {
      const payload = {
        senderId,
        receipientEmail,
        amount,
      };

      const response = await api.post("/transactions/send", payload);
      const { message, success } = response.data;

    if (success) {
      await checkAuth()
      return { message, success }; 
    }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    transactions,
    getTransactions,
    createTransaction,
    isLoading,
    createBankAccount,
    sendFunds
  };
};

export default useTransactions;
