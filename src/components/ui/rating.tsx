
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Rating = ({ value, max = 5, size = "md", className }: RatingProps) => {
  // Convert value to nearest 0.5
  const roundedValue = Math.round(value * 2) / 2;
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {[...Array(max)].map((_, i) => {
          const starValue = i + 1;
          return (
            <span key={i} className="relative">
              {/* Background star (empty) */}
              <Star className={cn("text-gray-600", sizeClasses[size])} />
              
              {/* Filled star overlay */}
              {roundedValue >= starValue ? (
                <Star 
                  className={cn(
                    "absolute top-0 left-0 text-amber-400", 
                    sizeClasses[size]
                  )}
                  fill="currentColor"
                />
              ) : roundedValue >= starValue - 0.5 ? (
                <span className="absolute top-0 left-0 overflow-hidden w-1/2">
                  <Star 
                    className={cn(
                      "text-amber-400", 
                      sizeClasses[size]
                    )}
                    fill="currentColor"
                  />
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
      
      <span className="ml-1.5 text-xs text-gray-400">
        {value.toFixed(1)}
      </span>
    </div>
  );
};

export default Rating;
