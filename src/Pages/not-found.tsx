import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="layout">
      <div className="flex flex-col items-center justify-center gap-8 h-screen">
        <div className="space-y-2 center flex-col">
          <img src="/not-found.svg" alt="not-found" width={200} height={200} />
         
          <div className=" rounded-md max-w-md mx-auto bg-yellow-100 dark:bg-yellow-200 text-yellow-800 p-4 font-medium flex gap-2 text-xs text-left">
            <Info size={18} className="flex-shrink-0 mt-1" />
            <p>
              The developer at Questpay is working diligently to bring you the
              best experience. Please check back soon!
            </p>
          </div>
        </div>
        <button
          onClick={()=> navigate(-1)}
          className="btn bg-primary/10 text-primary px-6 font-semibold py-3 rounded-lg text-sm"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
