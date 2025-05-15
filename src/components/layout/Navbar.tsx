
import { Search, UserRound, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-crypto-purple-dark/80 border-b border-crypto-purple">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-pink text-transparent bg-clip-text neon-glow">
              CryptoStore.fun
            </span>
          </a>
        </div>

        {/* Search */}
        <div className="hidden md:flex relative flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for apps, games, and more..." 
              className="pl-10 bg-crypto-purple-dark border-crypto-purple hover:border-crypto-neon-purple focus:border-crypto-neon-purple transition-all"
            />
          </div>
        </div>

        {/* User Nav */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Wallet className="h-5 w-5 text-crypto-neon-blue" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserRound className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
