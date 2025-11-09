import { useAuthStore } from "@/Stores";
import { AxiosError } from "axios";
import { toast } from "sonner";
import api from "@/API/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useAuth = () => {
  const { token, user, setToken, setUser, checkAuth, isCheckingAuth } =
    useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (name: string, email: string, phone: string) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await api.post("/auth/register", { name, email, phone });
      if (response.data.success) {
        toast.success(response.data.message, {
          description: "Please check your email for the OTP",
        });
        navigate(`/verify?email=${email}`);
      }
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error("Network error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otpCode: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/verify", { email, otpCode });
      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        toast.success(response.data.message, {
          description: "You can now start using the app",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async (email: string) => {
    setIsResendingOtp(true);
    try {
      const response = await api.post("/auth/resend-otp", { email });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error("Network error");
      }
    } finally {
      setIsResendingOtp(false);
    }
  };

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setToken(response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error("Network error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setToken(null);
      setUser(null);
      navigate("/login")
      toast.success("Logout successful!")
      setIsLoading(false);
    }, 1000);
  };

  return {
    token,
    user,
    isCheckingAuth,
    checkAuth,
    registerUser,
    isLoading,
    verifyOtp,
    login,
    logout,
    isResendingOtp,
    resendOtp,
  };
};

export default useAuth;
