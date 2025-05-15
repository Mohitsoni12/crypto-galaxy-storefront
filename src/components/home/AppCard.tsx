
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Rating from "@/components/ui/rating";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppCardProps {
  title: string;
  description: string;
  icon: string;
  rating: number;
  category: string;
  downloadUrl: string;
  blockchain?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  className?: string;
}

export function AppCard({
  title,
  description,
  icon,
  rating,
  category,
  downloadUrl,
  blockchain,
  isFeatured = false,
  isNew = false,
  className,
}: AppCardProps) {
  return (
    <div 
      className={cn(
        "flex flex-col bg-crypto-purple-dark border border-crypto-purple rounded-xl overflow-hidden transition-all hover:border-crypto-neon-purple card-hover",
        isFeatured && "animate-glow",
        className
      )}
    >
      <div className="flex items-start p-4 space-x-4">
        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={icon}
            alt={`${title} icon`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between">
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            {(isFeatured || isNew) && (
              <div className="mb-1">
                {isFeatured && (
                  <Badge className="mr-2 bg-crypto-neon-purple text-white">Featured</Badge>
                )}
                {isNew && (
                  <Badge className="bg-crypto-neon-pink text-white">New</Badge>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center mb-2 text-sm text-gray-400">
            <span className="mr-3">{category}</span>
            {blockchain && (
              <Badge variant="outline" className="mr-3 text-crypto-neon-blue border-crypto-neon-blue/30">
                {blockchain}
              </Badge>
            )}
          </div>
          <Rating value={rating} size="sm" />
        </div>
      </div>
      
      <div className="flex-1 px-4 py-2">
        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
      </div>
      
      <div className="p-4 mt-auto">
        <Button 
          className="w-full bg-crypto-neon-blue hover:bg-crypto-neon-blue/80 text-white"
          asChild
        >
          <a href={downloadUrl}>
            <Download className="h-4 w-4 mr-2" />
            <span>Download</span>
          </a>
        </Button>
      </div>
    </div>
  );
}

export default AppCard;
