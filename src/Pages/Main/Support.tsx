import { DashboardLayout } from "@/Layout";
import { Headset, ArrowUpRight } from "lucide-react";

const Support = () => {
  const whatsappLink = `https://api.whatsapp.com/send?phone=2348137411338&text=Hello%20Jackson`;

  return (
    <DashboardLayout title="Contact Support">
      <div className="border border-line bg-secondary rounded-2xl p-6 center flex-col gap-4">
        <div className="bg-yellow-500/10 text-yellow-500 h-20 w-20 center rounded-full">
          <Headset size={40} />
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold mb-1">Need help or have a question?</h2>
          <p className="text-muted text-sm mb-4">
            Reach out to our support team on WhatsApp. We're happy to help you with issues, questions, or feedback.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-green-700 px-4 py-3 rounded-xl hover:bg-green-500/90 transition"
          >
            Chat on WhatsApp <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
