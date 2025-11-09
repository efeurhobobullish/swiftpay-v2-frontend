import { useQuery } from "@tanstack/react-query";
import { Title } from "../UI";
import { useTransactionStore } from "@/Stores";
import { ArrowDownLeft, ArrowUpRight, OctagonAlert } from "lucide-react";
import clsx from "clsx";

import { formatNumber } from "@/Utils/formatNumber";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  const { getTransactions } = useTransactionStore();
  const { data: transactions, isFetching: isFetchingTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  const recentTransactions = transactions?.slice(0, 5);
  console.log(recentTransactions)
  return (
    <>
      <div className="mt-10 space-y-4">
        <Title
          title="Recent Transactions"
          link="/transactions"
          linkText="View All"
        />
        {isFetchingTransactions &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-background border-b border-line py-2"
            >
              <div className="h-10 w-10 center rounded-lg bg-pulse animate-pulse"></div>
              <span className="p-2 min-w-[200px] rounded-full bg-pulse animate-pulse"></span>
            </div>
          ))}

        {recentTransactions?.length === 0 && !isFetchingTransactions && (
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


        {recentTransactions &&
          recentTransactions?.length > 0 &&
          !isFetchingTransactions && (
            <ul className="mt-4 space-y-2">
              {recentTransactions?.map((transaction) => (
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
      </div>
    </>
  );
};

export default RecentTransactions;
