
import { Link } from "react-router-dom";
import { Search, Wallet, Globe, Bell, Menu } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/UserProfile";

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { toast } = useToast();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast({
      title: `${theme === "dark" ? "Light" : "Dark"} mode activated`,
      description: "Your theme preference has been updated.",
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-crypto-dark-bg/90 border-b border-crypto-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-crypto-neon-purple to-crypto-neon-blue"></div>
              <div className="absolute inset-0 blur-sm bg-gradient-to-tr from-crypto-neon-purple to-crypto-neon-blue opacity-70"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-crypto-neon-blue via-crypto-neon-purple to-crypto-neon-pink text-transparent bg-clip-text">
              Game Portal
            </span>
          </Link>
        </div>

        {/* Nav Links - Desktop only */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Games
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
              Upload Game
            </Link>
          )}
        </div>

        {/* User Nav */}
        <div className="flex items-center space-x-3">
          {user ? (
            <UserProfile />
          ) : (
            <Button 
              className="bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-purple text-white rounded-full hover:opacity-90"
              asChild
            >
              <Link to="/auth">
                Login / Register
              </Link>
            </Button>
          )}
          
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
