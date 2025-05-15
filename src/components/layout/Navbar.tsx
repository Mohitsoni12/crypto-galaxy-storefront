
import { Search, Wallet, Globe, Sun, Moon, UserRound, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { toast } = useToast();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast({
      title: `${theme === "dark" ? "Light" : "Dark"} mode activated`,
      description: "Your theme preference has been updated.",
    });
  };

  const handleConnectWallet = () => {
    toast({
      title: "Connect your wallet",
      description: "Please connect your crypto wallet to continue.",
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-crypto-dark-bg/90 border-b border-crypto-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-crypto-neon-purple to-crypto-neon-blue"></div>
              <div className="absolute inset-0 blur-sm bg-gradient-to-tr from-crypto-neon-purple to-crypto-neon-blue opacity-70"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-crypto-neon-blue via-crypto-neon-purple to-crypto-neon-pink text-transparent bg-clip-text">
              CryptoStore.fun
            </span>
          </a>
        </div>

        {/* Search - Desktop only */}
        <div className="hidden lg:flex relative flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for apps, games, and more..." 
              className="pl-10 bg-crypto-dark-card border-crypto-border focus:border-crypto-neon-blue transition-all pr-20"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
              Ctrl + K
            </span>
          </div>
        </div>

        {/* User Nav */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full border-crypto-border bg-transparent hover:bg-crypto-neon-blue/10 hover:border-crypto-neon-blue"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-300" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-300" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-crypto-border bg-transparent hover:bg-crypto-neon-purple/10 hover:border-crypto-neon-purple"
              >
                <Globe className="h-5 w-5 text-gray-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-crypto-dark-card border-crypto-border">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Spanish</DropdownMenuItem>
              <DropdownMenuItem>Japanese</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full border-crypto-border bg-transparent hover:bg-crypto-neon-pink/10 hover:border-crypto-neon-pink"
          >
            <Bell className="h-5 w-5 text-crypto-neon-pink" />
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-purple text-white rounded-full hover:opacity-90"
            onClick={handleConnectWallet}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
