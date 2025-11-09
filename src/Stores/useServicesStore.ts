import api from "@/API/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ServicesStore {
  airtimeProfitData: AirtimeProfitType[];
  dataPlans: DataPlan[];
  getAirtimeProfitData: () => Promise<void>;
  getDataPlans: () => Promise<void>;
}

const useServicesStore = create<ServicesStore>()(
  persist(
    (set) => ({
      airtimeProfitData: [],
      dataPlans: [],
      getAirtimeProfitData: async () => {
        try {
          const response = await api.get("/services/airtime/profits");
          set({ airtimeProfitData: response.data.data });
        } catch (error) {
          console.log(error);
        }
      },
      getDataPlans: async () => {
        try {
            const response = await api.get("/services/data/plans")
            set({dataPlans: response.data.data})
        } catch (error) {
            console.log(error)
        }
      },
    }),
    {
      name: "services-store",
      partialize: (state) => ({
        airtimeProfitData: state.airtimeProfitData,
        dataPlans: state.dataPlans,
      }),
    }
  )
);

export default useServicesStore;