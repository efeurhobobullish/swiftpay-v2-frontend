import { DashboardLayout } from "@/Layout";
import {
  Building2,
  CheckCheck,
  Copy,
  IdCard,
  Info,
  UserRound,
  Wallet2,
} from "lucide-react";
import { useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useTransactions } from "@/Hooks";
import { toast } from "sonner";
import { ButtonWithLoader, InputWithIcon, Success } from "@/Components/UI";
import { useState } from "react";

const ninSchema = z.object({
  nin: z
    .number({ invalid_type_error: "Enter a valid NIN number" })
    .min(10, "Your NIN must be 11-digits"),
});

type NinSchema = z.infer<typeof ninSchema>;

const Fund = () => {
  const { user } = useAuth();
  const { createBankAccount, isLoading } = useTransactions();
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NinSchema>({
    resolver: zodResolver(ninSchema),
  });

  const onSubmit = async (data: NinSchema) => {
    const message = createBankAccount(data.nin);
    setMessage(message as unknown as string);
    reset();
  };

  const onError = (error: FieldErrors<NinSchema>) => {
    console.log(error);
    toast.error("Invalid NIN");
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = (value: string) => {
    try {
      navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Account Number Copied")
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DashboardLayout title="Fund Wallet">
        {user?.bankAccounts && user?.bankAccounts.length === 0 && (
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-xl p-4 mb-4">
            <Info size={18} className=" mt-1 flex-shrink-0" />
            <p className="font-medium text-xs">
              According to CBN, your National Identification Number (NIN) is
              required to generate a dedicated virtual account number for you,
              to be used on Questpay.
            </p>
          </div>
        )}

        {user?.bankAccounts && user?.bankAccounts.length === 0 && (
          <div className="dark:bg-secondary shadow-2xl shadow-primary/10 border border-line rounded-3xl p-6 w-full">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-5"
            >
              <InputWithIcon
                label="National Identity Number (NIN)"
                type="number"
                icon={<IdCard />}
                placeholder="Enter your 11-digits NIN"
                {...register("nin", { valueAsNumber: true })}
                error={errors?.nin && errors?.nin.message}
              />

              <ButtonWithLoader
                loading={isLoading}
                initialText="Generate Aza"
                loadingText="Generating..."
                className="btn-primary-2 text-sm h-10 w-full rounded-full"
              />
            </form>
          </div>
        )}

        {user?.bankAccounts && user?.bankAccounts.length > 0 && (
          <div className="dark:bg-secondary grid gap-2 grid-cols-1 shadow-2xl shadow-primary/10 border border-line rounded-3xl p-6 w-full">
            {user?.bankAccounts.map((x: BankAccount) => (
              <div key={x.bankId} className="space-y-4">
                <div className="bg-secondary dark:bg-foreground p-4 rounded-xl flex items-center gap-4">
                  <Building2 />
                  <div>
                    <p className="text-sm text-muted">Bank Name</p>
                    <p className="font-medium">{x.bankName}</p>
                  </div>
                </div>
                <div className="bg-secondary dark:bg-foreground p-4 rounded-xl flex items-center gap-4">
                  <Wallet2 />
                  <div>
                    <p className="text-sm text-muted">Account Number</p>
                    <p className="font-medium">{x.accountNumber}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(x.accountNumber)}
                    className="ml-auto"
                  >
                    {copied ? <CheckCheck size={22} className="text-green-500" /> : <Copy size={22} className="text-muted hover:text-main" />}
                  </button>
                </div>
                <div className="bg-secondary dark:bg-foreground p-4 rounded-xl flex items-center gap-4">
                  <UserRound />
                  <div>
                    <p className="text-sm text-muted">Account Name</p>
                    <p className="font-medium">{x.accountHolderName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashboardLayout>

      {isSuccess && (
        <Success description={message} onClose={() => setIsSuccess(false)} />
      )}
    </>
  );
};

export default Fund;
