import { AuthLayout } from "@/Layout";
import { useAuth } from "@/Hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { Loader, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonWithLoader, InputWithIcon } from "@/Components/UI";

const schema = z.object({
  otp: z.string().min(1, { message: "OTP is required" }),
});

type FormData = z.infer<typeof schema>;

const Verify = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { verifyOtp, isLoading, isResendingOtp, resendOtp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (email) {
      verifyOtp(email, data.otp);
    }
  };

  const [timer, setTimer] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResendOtp = () => {
    if (email) {
      resendOtp(email);
    }
  };

  return (
    <>
      <AuthLayout
        title="Verification 🔐"
        description={`Enter the OTP sent to ${email}`}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
         <InputWithIcon
            icon={<Lock size={20} />}
            label="OTP Code"
             placeholder="Enter the 6-digit code"
            type="text"
            {...register("otp")}
            error={errors.otp && errors?.otp.message}
          />
          
          <ButtonWithLoader
          type="submit"
              loading={isLoading}
              initialText="Verify"
              loadingText="Verifying..."
              className="bg-primary h-11 w-full text-sm font-medium text-white rounded-full"
            />
        </form>
        <div className="center gap-2 mt-4">
          <p className="text-sm text-muted">Didn't receive an OTP? </p>
          {timer > 0 ? (
            <p className="text-sm text-main font-semibold">
              Resend OTP in {timer} seconds
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={isResendingOtp}
              className="text-primary text-sm font-medium bg-primary/10 px-4 h-11 rounded-full"
            >
              {isResendingOtp ? <Loader className="w-4 h-4 animate-spin" /> : "Resend OTP"}
            </button>
          )}
        </div>
      </AuthLayout>
    </>
  );
};

export default Verify;
