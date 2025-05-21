
import { Loader2 } from "lucide-react";

interface DashboardLoadingProps {
  message?: string;
}

const DashboardLoading = ({ message = "Loading..." }: DashboardLoadingProps) => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default DashboardLoading;
