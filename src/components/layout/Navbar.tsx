
import { Link } from "react-router-dom";
import { Gamepad, Menu, User, LogOut, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { user, isAdmin, signOut } = useAuth();
  
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
              <div className="flex items-center">
                <Upload className="h-4 w-4 mr-1" />
                Admin Dashboard
              </div>
            </Link>
          )}
        </div>

        {/* User Nav */}
        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0">
                  <Avatar>
                    <AvatarFallback className="bg-crypto-neon-purple/20 text-crypto-neon-purple">
                      {user.email?.[0].toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="font-medium truncate max-w-[200px]">{user.email}</div>
                  {isAdmin && <div className="text-xs text-muted-foreground">Admin</div>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/" className="cursor-pointer">
                    <Gamepad className="mr-2 h-4 w-4" />
                    <span>Games</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              className="bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-purple text-white rounded-full hover:opacity-90"
              asChild
            >
              <Link to="/auth">
                <User className="mr-2 h-4 w-4" />
                Login / Register
              </Link>
            </Button>
          )}
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 py-4">
                  <Link 
                    to="/" 
                    className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                  >
                    <Gamepad className="mr-2 h-5 w-5" />
                    Games
                  </Link>
                  
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Admin Dashboard
                    </Link>
                  )}
                  
                  {!user && (
                    <Link 
                      to="/auth" 
                      className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md mt-4"
                    >
                      <User className="mr-2 h-5 w-5" />
                      Login / Register
                    </Link>
                  )}
                  
                  {user && (
                    <Button 
                      variant="destructive" 
                      className="mt-4"
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
