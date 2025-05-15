
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AppCard } from "./AppCard";

const trendingApps = [
  {
    title: "MetaMask Pro",
    description: "Enhanced crypto wallet with advanced security features and seamless integration with all major blockchains.",
    icon: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    category: "Finance",
    downloadUrl: "#",
    blockchain: "Multi-chain",
    isFeatured: true
  },
  {
    title: "CryptoTrader X",
    description: "Advanced trading platform with real-time market data, AI-powered insights, and zero-fee transactions.",
    icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.6,
    category: "Finance",
    downloadUrl: "#",
    blockchain: "Ethereum"
  },
  {
    title: "NFT Creator Studio",
    description: "Create, mint, and sell NFTs with an intuitive drag-and-drop interface. No coding required.",
    icon: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.2,
    category: "Art & Design",
    downloadUrl: "#",
    blockchain: "Solana"
  },
  {
    title: "DeFi Dashboard",
    description: "Monitor your DeFi investments, yield farms, and liquidity pools across multiple protocols.",
    icon: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.5,
    category: "Finance",
    downloadUrl: "#",
    blockchain: "Multi-chain"
  },
  {
    title: "BlockNews",
    description: "Stay updated with curated news and analysis about crypto markets, NFTs, and DeFi protocols.",
    icon: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.3,
    category: "News",
    downloadUrl: "#",
    blockchain: "Multi-chain"
  },
  {
    title: "OnChain Messenger",
    description: "Secure messaging app with end-to-end encryption backed by blockchain technology.",
    icon: "https://images.unsplash.com/photo-1611746869696-d09bce200020?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.7,
    category: "Communication",
    downloadUrl: "#", 
    blockchain: "Solana",
    isNew: true
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

const TrendingApps = () => {
  return (
    <section className="mb-12">
      <SectionHeader title="Trending Now" actionLink="#trending" />
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingApps.map((app, index) => (
            <AppCard 
              key={index} 
              {...app}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
};

export default TrendingApps;
