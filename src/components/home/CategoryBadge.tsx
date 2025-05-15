
import { Gamepad, AppWindow, Gift, Book, TrendingUp, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  title: string;
  icon: "games" | "apps" | "offers" | "books" | "trending" | "top";
  className?: string;
}

const getIcon = (iconName: string, className: string = "h-5 w-5") => {
  const icons: Record<string, React.ReactNode> = {
    games: <Gamepad className={className} />,
    apps: <AppWindow className={className} />,
    offers: <Gift className={className} />,
    books: <Book className={className} />,
    trending: <TrendingUp className={className} />,
    top: <BarChart2 className={className} />
  };
  return icons[iconName] || null;
};

const getCategoryGradient = (iconName: string) => {
  const gradients: Record<string, string> = {
    games: "from-purple-500 to-blue-600",
    apps: "from-cyan-500 to-blue-500",
    offers: "from-pink-500 to-purple-500",
    books: "from-amber-500 to-orange-600",
    trending: "from-green-500 to-emerald-600",
    top: "from-red-500 to-rose-600"
  };
  return gradients[iconName] || "from-gray-700 to-gray-900";
};

export function CategoryBadge({ title, icon, className }: CategoryBadgeProps) {
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center h-32 overflow-hidden rounded-xl cursor-pointer transition-all hover:scale-[1.03]",
        className
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-80",
          getCategoryGradient(icon)
        )}
      />
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative flex flex-col items-center space-y-2 text-white">
        {getIcon(icon, "h-8 w-8")}
        <span className="font-semibold">{title}</span>
      </div>
    </div>
  );
}

const CategoryGrid = () => {
  const categories = [
    { title: "Games", icon: "games" as const },
    { title: "Apps", icon: "apps" as const },
    { title: "Offers", icon: "offers" as const },
    { title: "Books", icon: "books" as const },
    { title: "Trending", icon: "trending" as const },
    { title: "Top Rated", icon: "top" as const }
  ];
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <CategoryBadge
            key={category.title}
            title={category.title}
            icon={category.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
