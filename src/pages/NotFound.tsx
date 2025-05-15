
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-pink text-transparent bg-clip-text neon-glow mb-6">
            404
          </h1>
          <div className="neon-border w-24 h-1 mx-auto mb-6"></div>
          <p className="text-xl mb-8">
            The crypto asset you're looking for has vanished into the blockchain
          </p>
          <Button 
            className="bg-crypto-neon-purple hover:bg-crypto-neon-purple/80"
            asChild
          >
            <a href="/">Return to CryptoStore</a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
