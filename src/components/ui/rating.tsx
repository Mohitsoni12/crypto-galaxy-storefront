
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Rating({ 
  value, 
  max = 5, 
  size = "md", 
  className 
}: RatingProps) {
  // Determine size in pixels
  const sizeInPx = {
    sm: 14,
    md: 16,
    lg: 20
  }[size];

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          size={sizeInPx}
          className={cn(
            "transition-colors",
            i < Math.floor(value)
              ? "text-crypto-neon-orange fill-crypto-neon-orange"
              : i < value
              ? "text-crypto-neon-orange fill-crypto-neon-orange/50" // Half star
              : "text-gray-400" // Empty star
          )}
        />
      ))}
      <span className="ml-2 text-sm text-gray-300">{value.toFixed(1)}</span>
    </div>
  );
}

export default Rating;
