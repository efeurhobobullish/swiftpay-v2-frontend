import { WalletCard, QuickServices } from "@/Components/Dashboard";
import { DashboardLayout } from "../../Layout";
import { useAirtime, useAuth, useDataPlan } from "@/Hooks";
import { greetings } from "@/Utils/greetings";
import { useEffect } from "react";


const Dashboard = () => {
  const {user} = useAuth();
  const {getDataPlans} = useDataPlan()
  const {getAirtimeProfitData} = useAirtime()

  useEffect(()=>{
    getDataPlans()
    getAirtimeProfitData()
  },[getDataPlans, getAirtimeProfitData])



  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold">{greetings()},<br /> <span className="text-muted font-light">{user?.name}</span></h1>
        <WalletCard />
        <QuickServices />
    </DashboardLayout>  
  )
}

export default Dashboard