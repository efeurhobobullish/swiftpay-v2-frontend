import { DashboardLayout } from "@/Layout"
import { useTransactionStore } from "@/Stores"
import { formatNumber } from "@/Utils/formatNumber"
import { formatDate } from "@/Utils/helpers"
import clsx from "clsx"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { useParams } from "react-router-dom"
import { toast } from "sonner"

const TransactionDetails = () => {
    const {transactions} = useTransactionStore()

    const {transactionId} = useParams()
    const transaction = transactions.find(transaction => transaction.id === transactionId)

    const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(transaction?.id || "");
      setCopied(true);
      toast.success("Transaction ID copied to clipboard", {
        description:
          "You can now share this transaction ID with support if you have any issues",
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy transaction ID");
    }
  };

  return (
    <DashboardLayout title="Transaction Details">
        <div className="bg-secondary p-4 rounded-lg">

        <div className="space-y-2">
          <Item label="Title" value={transaction?.description} />
          <Item label="Amount" value={`NGN ${formatNumber(transaction?.amount)}`} />
          <Item
            label="Date"
            value={
              transaction?.createdAt ? formatDate(transaction.createdAt) : ""
            }
          />
          <Item label="Transaction ID" value={transaction?.id} />
          <Item label="Transaction Type" value={transaction?.type} />
          <Item label="Old Balance" value={`NGN ${formatNumber(transaction?.oldBalance)}`} />
          <Item label="New Balance" value={`NGN ${formatNumber(transaction?.newBalance)}`} />
          <Item label="Status" value={transaction?.status} />
        </div>

        <div className="center gap-4 mt-8">
          <div
            onClick={handleCopy}
            className="center gap-2 h-10 rounded-xl text-sm cursor-pointer"
          >
            <span>{copied ? "Copied" : "Tap to copy ID"}</span>

            {copied ? (
              <Check className="text-green-500" size={18} />
            ) : (
              <Copy className="text-yellow-500" size={18} />
            )}
          </div>
        </div>
        </div>

        <div className="mt-8 bg-secondary p-4 rounded-lg">
          <p className="text-sm">
            Having issues with this transaction?{" "}
            <a
              className="text-primary font-outfit"
              href="https://wa.me/2348137411338"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resolve Now
            </a>
          </p>
        </div>
    </DashboardLayout>
  )
}

export default TransactionDetails


const Item = ({ label, value }: { label: string; value?: string }) => {
    return (
      <>
        <div className="flex justify-between border-b border-line py-3">
          <p className="text-sm text-muted capitalize">{label}:</p>
          <p
            className={clsx(
              "font-outfit text-sm capitalize text-right max-w-1/2 ",
              value === "success"
                ? "text-green-500"
                : value === "failed"
                ? "text-red-500"
                : "text-main"
            )}
          >
            {value}
          </p>
        </div>
      </>
    );
  };