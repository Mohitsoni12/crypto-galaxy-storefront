
import { 
  Gamepad, 
  AppWindow, 
  Gift, 
  Book, 
  TrendingUp, 
  BarChart2, 
  LayoutGrid, 
  Coins, 
  Search,
  Wallet,
  Rocket,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <TooltipProvider delayDuration={300}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all",
            active
              ? "bg-crypto-neon-purple/20 text-crypto-neon-purple"
              : "text-gray-400 hover:bg-crypto-dark-card hover:text-crypto-neon-blue"
          )}
          onClick={onClick}
        >
          <div className="text-current">{icon}</div>
          <span className="text-[10px] mt-1">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-crypto-dark-card border-crypto-border">
        {label}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const blockchains = [
  { name: "Ethereum", icon: <Coins size={14} className="text-blue-400" /> },
  { name: "Bitcoin", icon: <Bitcoin size={14} className="text-amber-500" /> },
  { name: "Solana", icon: (
    <svg width="14" height="14" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
      <path d="M93.94 42.63H13.78c-1.75 0-2.62 0-3.07.55-.44.55-.34 1.39.12 3.07a8.72 8.72 0 0 0 3.17 4.64l17.42 12.96c.83.62 1.24.93 1.39 1.33.14.4.11.84-.17 1.71a8.7 8.7 0 0 1-1.88 3.16L12.01 90.68c-.67.67-1.01 1.01-1.02 1.41 0 .4.32.75.98 1.44a8.72 8.72 0 0 0 5.9 2.3h80.16c1.74 0 2.62 0 3.07-.55.44-.55.34-1.39-.13-3.07a8.72 8.72 0 0 0-3.17-4.64l-17.42-12.96c-.83-.62-1.24-.93-1.39-1.33-.14-.4-.11-.84.18-1.71a8.7 8.7 0 0 1 1.87-3.16l18.75-20.64c.67-.67 1.01-1.01 1.02-1.41 0-.4-.32-.75-.98-1.44a8.72 8.72 0 0 0-5.9-2.3z" fill="currentColor" />
    </svg>
  ) },
  { name: "Polygon", icon: <Wallet size={14} className="text-purple-400" /> }
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-20 border-r border-crypto-border shrink-0">
      <div className="flex flex-col items-center gap-2 py-4 flex-1">
        <NavItem icon={<Home size={22} />} label="Home" active />
        <NavItem icon={<Search size={22} />} label="Search" />
        <NavItem icon={<Gamepad size={22} />} label="Games" />
        <NavItem icon={<AppWindow size={22} />} label="Apps" />
        <NavItem icon={<Gift size={22} />} label="Offers" />
        <NavItem icon={<Book size={22} />} label="Books" />
        <NavItem icon={<TrendingUp size={22} />} label="Trending" />
        <NavItem icon={<BarChart2 size={22} />} label="Top" />
        <NavItem icon={<LayoutGrid size={22} />} label="Categories" />
        <NavItem icon={<Rocket size={22} />} label="Early Access" />

        <div className="mt-auto border-t border-crypto-border pt-4 w-full">
          <div className="px-2">
            <p className="text-[10px] text-center text-gray-400 mb-3">Blockchains</p>
            <div className="flex flex-col gap-3 items-center">
              {blockchains.map((chain, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-crypto-dark-card border border-crypto-border hover:border-crypto-neon-purple transition-colors"
                  title={chain.name}
                >
                  {chain.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
