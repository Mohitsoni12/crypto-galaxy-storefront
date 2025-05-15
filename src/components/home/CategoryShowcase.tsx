
import { Gamepad, AppWindow, Gift, Book, TrendingUp, BarChart2, Rocket, Zap, HeartPulse, Dices } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  className?: string;
}

const CategoryCard = ({ title, icon, gradient, className }: CategoryCardProps) => {
  return (
    <div 
      className={cn(
        "relative flex flex-col items-center justify-center h-36 overflow-hidden rounded-xl cursor-pointer transition-all hover:scale-[1.02] border border-crypto-border",
        className
      )}
    >
      <div 
        className="absolute inset-0 opacity-80"
        style={{ background: gradient }}
      />
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative flex flex-col items-center space-y-3 text-white">
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
          {icon}
        </div>
        <span className="font-semibold">{title}</span>
      </div>
    </div>
  );
};

const categories = [
  { 
    title: "Games", 
    icon: <Gamepad className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #6366f1, #a78bfa)" 
  },
  { 
    title: "Apps", 
    icon: <AppWindow className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)" 
  },
  { 
    title: "DeFi", 
    icon: <Zap className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #059669, #34d399)" 
  },
  { 
    title: "NFTs", 
    icon: <Gift className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #d946ef, #f472b6)" 
  },
  { 
    title: "Books", 
    icon: <Book className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)" 
  },
  { 
    title: "Social", 
    icon: <HeartPulse className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #e11d48, #fb7185)" 
  },
  { 
    title: "Trending", 
    icon: <TrendingUp className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #2563eb, #60a5fa)" 
  },
  { 
    title: "Top Rated", 
    icon: <BarChart2 className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)" 
  },
  { 
    title: "New", 
    icon: <Rocket className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #0d9488, #2dd4bf)" 
  },
  { 
    title: "Play to Earn", 
    icon: <Dices className="h-6 w-6" />, 
    gradient: "linear-gradient(135deg, #c026d3, #e879f9)" 
  }
];

const SectionHeader = ({ title, actionLink }: { title: string; actionLink?: string }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-purple text-transparent bg-clip-text">
      {title}
    </h2>
    {actionLink && (
      <a 
        href={actionLink} 
        className="text-crypto-neon-blue hover:text-crypto-neon-purple transition-colors text-sm"
      >
        View All
      </a>
    )}
  </div>
);

const CategoryShowcase = () => {
  return (
    <section className="mb-12">
      <SectionHeader title="Browse Categories" actionLink="#categories" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            icon={category.icon}
            gradient={category.gradient}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
