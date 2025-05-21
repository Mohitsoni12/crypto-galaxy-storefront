
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  buttonText: string;
  buttonLink: string;
}

const DashboardHeader = ({ title, buttonText, buttonLink }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Link to={buttonLink}>
        <Button variant="outline">{buttonText}</Button>
      </Link>
    </div>
  );
};

export default DashboardHeader;
