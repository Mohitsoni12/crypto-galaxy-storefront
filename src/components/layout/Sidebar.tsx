
import { Gamepad, AppWindow, Gift, Book, TrendingUp, BarChart2, LayoutGrid, Coins, Bitcoin, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  href?: string;
};

const sidebarItems = [
  { icon: Gamepad, label: "Games", href: "#games" },
  { icon: AppWindow, label: "Apps", href: "#apps" },
  { icon: Gift, label: "Offers", href: "#offers" },
  { icon: Book, label: "Books", href: "#books" },
  { icon: TrendingUp, label: "Trending", href: "#trending" },
  { icon: BarChart2, label: "Top Games", href: "#top-games" },
  { icon: LayoutGrid, label: "Categories", href: "#categories" },
];

const SidebarItem = ({ icon: Icon, label, active = false, href = "#" }: SidebarItemProps) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
        active
          ? "bg-crypto-neon-purple/20 text-white"
          : "text-gray-400 hover:bg-crypto-neon-purple/10 hover:text-white"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </a>
  );
};

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-4rem)] py-6 px-3 border-r border-crypto-purple sticky top-16">
      <div className="space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </div>

      <div className="mt-auto">
        <div className="px-4 py-6">
          <p className="text-xs text-gray-400 mb-3">Supported Blockchains</p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-crypto-purple/30 border border-crypto-purple">
              <Coins size={14} className="text-blue-400" />
              <span>Ethereum</span>
            </div>
            <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-crypto-purple/30 border border-crypto-purple">
              <Bitcoin size={14} className="text-yellow-500" />
              <span>Bitcoin</span>
            </div>
            <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-crypto-purple/30 border border-crypto-purple">
              <svg width="14" height="14" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
                <path d="M64 0C28.7 0 0 28.7 0 64C0 99.3 28.7 128 64 128C99.3 128 128 99.3 128 64C128 28.7 99.3 0 64 0ZM92.3 55.9L77.2 92.6C77 93 76.5 93.2 76.1 93.1L56.4 88.3C56.1 88.2 55.9 88 55.7 87.8L43.7 74.1C43.5 73.9 43.5 73.6 43.5 73.3L50.1 46.5C50.2 46.1 50.5 45.8 50.9 45.8L90.9 54.7C91.5 54.9 91.8 55.4 92.3 55.9Z" fill="currentColor" />
              </svg>
              <span>Solana</span>
            </div>
            <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-crypto-purple/30 border border-crypto-purple">
              <Wallet size={14} className="text-green-400" />
              <span>Polygon</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
