import { DashboardLayout } from "@/Layout";
import { useTransactionStore } from "@/Stores";
import { formatNumber } from "@/Utils/formatNumber";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ListFilter,
  OctagonAlert,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Transactions = () => {
  const { getTransactions } = useTransactionStore();
  const [activeFilter, setActiveFilter] = useState<"all" | "debit" | "credit">(
    "all"
  );

  const { data: transactions, isLoading: isFetchingTransaction } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  const filteredTransactions = transactions?.filter(
    (x) => x.type === activeFilter || activeFilter === "all"
  );

  console.log(transactions);
  return (
    <>
      <DashboardLayout title="Transactions">
        <div className="flex items-center gap-4">
          <ListFilter />
          <div className="inline-flex gap-4 bg-secondary p-2 rounded-full border border-line">
            {["all", "debit", "credit"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type as "debit" | "credit")}
                className={clsx("capitalize rounded-full px-4 py-2", {
                  "bg-primary text-white": type === activeFilter,
                  "bg-secondary text-main": type !== activeFilter,
                })}
              >
                <h2 className="text-sm font-medium">{type}</h2>
              </button>
            ))}
          </div>
        </div>

        {isFetchingTransaction &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-background border-b border-line py-2"
            >
              <div className="h-10 w-10 center rounded-lg bg-pulse animate-pulse"></div>
              <span className="p-2 min-w-[200px] rounded-full bg-pulse animate-pulse"></span>
            </div>
          ))}

        {filteredTransactions?.length === 0 && !isFetchingTransaction && (
          <div className="center bg-secondary p-4 rounded-sm flex-col gap-1 h-full ">
            <div className="center bg-yellow-500/10 text-yellow-500 rounded-full h-14 w-14">
              <OctagonAlert size={24} />
            </div>
            <p className="text-sm text-main">No transactions found</p>
            <p className="text-xs text-muted">
              Fund your wallet to access our services
            </p>
          </div>
        )}

        {filteredTransactions &&
          filteredTransactions?.length > 0 &&
          !isFetchingTransaction && (
            <ul className="mt-4 space-y-2">
              {filteredTransactions?.map((transaction) => (
                <li key={transaction.id}>
                  <Link
                    to={`/transactions/${transaction.id}`}
                    className="flex items-center gap-2 bg-background border-b border-line py-2"
                  >
                    <div
                      className={clsx(
                        "h-10 w-10 center rounded-lg",
                        transaction.type === "debit"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-green-500/10 text-green-500"
                      )}
                    >
                      {transaction.type === "debit" ? (
                        <ArrowUpRight size={18} />
                      ) : (
                        <ArrowDownLeft size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm line-clamp-1">
                        {transaction.description}
                      </h4>
                      <p className="text-xs text-muted">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <h4 className="text-sm font-outfit">
                        {transaction.type === "debit" ? "-" : "+"} ₦
                        {formatNumber(transaction.amount)}
                      </h4>
                      <p
                        className={clsx(
                          "text-xs",
                          transaction.status === "success"
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {transaction.status}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
      </DashboardLayout>
    </>
  );
};

export default Transactions;
