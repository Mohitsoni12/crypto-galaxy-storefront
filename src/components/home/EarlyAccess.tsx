
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppCard } from "./AppCard";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const earlyAccessApps = [
  {
    title: "ChainVerse",
    description: "The most ambitious open-world metaverse with fully tokenized economy and player-owned assets.",
    icon: "https://images.unsplash.com/photo-1633259584604-afdc243122ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.2,
    category: "Metaverse",
    downloadUrl: "#",
    blockchain: "Multi-chain",
    isEarlyAccess: true
  },
  {
    title: "CryptoBounty",
    description: "Revolutionary bounty platform connecting developers with projects through smart contracts.",
    icon: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.0,
    category: "Development",
    downloadUrl: "#",
    blockchain: "Ethereum",
    isEarlyAccess: true
  },
  {
    title: "BlockHealth",
    description: "Secure, private health data management powered by blockchain technology.",
    icon: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.3,
    category: "Health",
    downloadUrl: "#",
    blockchain: "Solana",
    isEarlyAccess: true
  },
  {
    title: "NanoMiner 2.0",
    description: "Next-gen crypto mining software with AI optimization for maximum efficiency.",
    icon: "https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 3.9,
    category: "Utility",
    downloadUrl: "#",
    blockchain: "Bitcoin",
    isEarlyAccess: true
  }
];

const SectionHeader = ({ title, actionLink }: { title: string; actionLink?: string }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-crypto-neon-orange to-crypto-neon-pink text-transparent bg-clip-text">
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

const EarlyAccess = () => {
  return (
    <section className="mb-12">
      <div className="relative overflow-hidden rounded-2xl border border-crypto-border bg-gradient-to-b from-crypto-dark-card to-crypto-dark-bg">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-crypto-neon-orange/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-crypto-neon-purple/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <span className="inline-block px-3 py-1 bg-crypto-neon-orange/20 text-crypto-neon-orange text-xs font-medium rounded-full mb-3">
                Beta Program
              </span>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-crypto-neon-orange to-crypto-neon-pink text-transparent bg-clip-text mb-2">
                Early Access
              </h2>
              <p className="text-gray-400 max-w-xl">
                Be among the first to try these cutting-edge blockchain applications before they're officially released.
              </p>
            </div>
            
            <Button 
              className="mt-4 md:mt-0 bg-gradient-to-r from-crypto-neon-orange to-crypto-neon-pink text-white hover:opacity-90 group"
              asChild
            >
              <a href="#early-access">
                Join Beta Program
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          
          <ScrollArea className="w-full pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {earlyAccessApps.map((app, index) => (
                <AppCard 
                  key={index} 
                  {...app}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
