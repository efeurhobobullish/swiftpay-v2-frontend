import api from "@/API/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TransactionState {
  transactions: TransactionType[];
  setTransactions: (transactions: TransactionType[]) => void;
  getTransactions: () => Promise<TransactionType[]>;
  isFetchingTransaction: boolean;
}

const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      isFetchingTransaction: false,
      setTransactions: (transactions) => set({ transactions }),
      getTransactions: async () => {
        try {
          set({ isFetchingTransaction: true });
          const response = await api.get("/transactions/user");
          set({ transactions: response.data.transactions });
          return response.data.transactions;
        } catch (error) { 
          console.log(error);
          if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message);
          }
        } finally {
          set({ isFetchingTransaction: false });
        } 
      },
    }),
    {
      name: "transactions",
      partialize: (state) => ({
        transactions: state.transactions,
      }),
    }
  )
);

export default useTransactionStore;
