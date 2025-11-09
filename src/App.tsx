import { Routes, Route } from "react-router-dom";
import { NotFound, Onboarding, Protect } from "./Pages";
import { Signup, Login, Verify } from "./Pages/Auth";
import { Dashboard, Fund, Profile, Services, Share, Support, TransactionDetails, Transactions, Wallet } from "./Pages/Main";
import { useEffect } from "react";
import useAuth from "./Hooks/useAuth";
import { Toaster } from "sonner";
import { Airtime, DataPlan } from "./Pages/Services";
import { ScrollToTop } from "./Components/UI";

const App = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route element={<Protect />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/fund" element={<Fund />} />
          <Route path="/wallet/share" element={<Share />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/services" element={<Services />} />
          <Route path="/support" element={<Support />} />
          <Route path="/transactions/:transactionId" element={<TransactionDetails />} />
          <Route path="/services">
            <Route path="airtime" element={<Airtime />} />
            <Route path="data" element={<DataPlan />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
