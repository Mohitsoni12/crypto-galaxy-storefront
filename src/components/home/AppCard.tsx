
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Info, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/rating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface AppCardProps {
  title: string;
  description: string;
  icon: string;
  coverImage?: string;
  rating: number;
  category: string;
  downloadUrl: string;
  blockchain?: string;
  size?: string;
  developer?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isEarlyAccess?: boolean;
  className?: string;
  layout?: "standard" | "featured" | "compact";
}

export function AppCard({
  title,
  description,
  icon,
  coverImage,
  rating,
  category,
  downloadUrl,
  blockchain,
  size = "24MB",
  developer = "Crypto Dev Studios",
  isFeatured = false,
  isNew = false,
  isEarlyAccess = false,
  className,
  layout = "standard",
}: AppCardProps) {
  // Different layouts for different uses
  if (layout === "featured") {
    return (
      <div
        className={cn(
          "group relative flex flex-col h-[350px] rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-crypto-neon-purple/10 cursor-pointer",
          isFeatured && "ring-1 ring-crypto-neon-purple ring-offset-1 ring-offset-crypto-dark-bg",
          className
        )}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
          style={{
            backgroundImage: `url(${coverImage || icon})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-crypto-dark-bg via-crypto-dark-bg/80 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isFeatured && (
            <Badge className="bg-crypto-neon-purple text-white">
              Featured
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-crypto-neon-pink text-white">
              New
            </Badge>
          )}
          {isEarlyAccess && (
            <Badge className="bg-crypto-neon-orange text-white">
              Early Access
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="relative mt-auto p-4 z-10 flex flex-col h-full justify-end">
          <div className="flex items-start">
            <img
              src={icon}
              alt={`${title} icon`}
              className="h-16 w-16 rounded-xl mr-4 object-cover ring-1 ring-white/10"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
              <div className="flex items-center mb-1">
                <span className="text-sm text-gray-400 mr-2">{category}</span>
                {blockchain && (
                  <Badge
                    variant="outline"
                    className="text-xs border-crypto-neon-blue/30 text-crypto-neon-blue"
                  >
                    {blockchain}
                  </Badge>
                )}
              </div>
              <Rating value={rating} size="sm" />
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-3 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-xs text-gray-400">
              <span className="mr-3">{developer}</span>
              <span>{size}</span>
            </div>
            <Button
              size="sm"
              className="bg-crypto-neon-blue hover:bg-crypto-neon-blue/80 text-white"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "compact") {
    return (
      <div
        className={cn(
          "flex items-center p-3 bg-crypto-dark-card rounded-xl border border-crypto-border hover:border-crypto-neon-purple transition-colors",
          className
        )}
      >
        <img
          src={icon}
          alt={`${title} icon`}
          className="h-12 w-12 rounded-lg mr-3 object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white text-sm mb-1 truncate">{title}</h3>
          <div className="flex items-center">
            <Rating value={rating} size="sm" />
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-xs text-gray-400">{category}</span>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="ml-2 h-8 w-8 p-0 rounded-full"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Standard layout
  return (
    <div
      className={cn(
        "flex flex-col bg-crypto-dark-card border border-crypto-border rounded-xl overflow-hidden transition-all hover:border-crypto-neon-purple hover:shadow-lg hover:shadow-crypto-neon-purple/5",
        className
      )}
    >
      {coverImage && (
        <div className="h-36 w-full overflow-hidden">
          <img
            src={coverImage}
            alt={`${title} cover`}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}

      <div className={cn("flex items-start p-4 space-x-4", !coverImage && "pt-4")}>
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
            <div className="flex flex-wrap gap-2 mb-1">
              {isFeatured && (
                <Badge className="bg-crypto-neon-purple text-white">
                  Featured
                </Badge>
              )}
              {isNew && (
                <Badge className="bg-crypto-neon-pink text-white">
                  New
                </Badge>
              )}
              {isEarlyAccess && (
                <Badge className="bg-crypto-neon-orange text-white">
                  Early Access
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center mb-2 text-sm text-gray-400">
            <span className="mr-3">{category}</span>
            {blockchain && (
              <Badge
                variant="outline"
                className="mr-3 text-crypto-neon-blue border-crypto-neon-blue/30"
              >
                {blockchain}
              </Badge>
            )}
          </div>
          <Rating value={rating} size="sm" />
        </div>
      </div>

      <div className="flex-1 px-4 pb-2">
        <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-crypto-border mt-2">
        <div className="flex items-center text-xs text-gray-500">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  <span>{size}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-crypto-dark-card border-crypto-border">
                <div className="text-xs">
                  <p>Developer: {developer}</p>
                  <p>Size: {size}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-8 w-8 p-0 border-crypto-border hover:border-crypto-neon-blue hover:text-crypto-neon-blue"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            className="bg-crypto-neon-blue hover:bg-crypto-neon-blue/80 text-white"
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AppCard;
