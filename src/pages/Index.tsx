
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/home/FeaturedSection";
import AppGrid from "@/components/home/AppGrid";
import CategoryGrid from "@/components/home/CategoryBadge";

// Sample data
const topApps = [
  {
    title: "MetaMask Pro",
    description: "Enhanced crypto wallet with advanced security features and seamless integration with all major blockchains.",
    icon: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.8,
    category: "Finance",
    downloadUrl: "#",
    blockchain: "Multi-chain",
    isFeatured: true
  },
  {
    title: "CryptoTrader X",
    description: "Advanced trading platform with real-time market data, AI-powered insights, and zero-fee transactions.",
    icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.6,
    category: "Finance",
    downloadUrl: "#",
    blockchain: "Ethereum"
  },
  {
    title: "NFT Creator Studio",
    description: "Create, mint, and sell NFTs with an intuitive drag-and-drop interface. No coding required.",
    icon: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.2,
    category: "Art & Design",
    downloadUrl: "#",
    blockchain: "Solana"
  },
  {
    title: "DeFi Dashboard",
    description: "Monitor your DeFi investments, yield farms, and liquidity pools across multiple protocols.",
    icon: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    category: "Finance",
    downloadUrl: "#",
    blockchain: "Multi-chain"
  }
];

const newGames = [
  {
    title: "Chain Champions",
    description: "Build your dream team of fighters, train them with unique abilities, and battle in the blockchain arena.",
    icon: "https://images.unsplash.com/photo-1633957897986-70e83293b3cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.1,
    category: "Fighting",
    downloadUrl: "#",
    blockchain: "Ethereum",
    isNew: true
  },
  {
    title: "Galactic Miners",
    description: "Explore the universe, mine rare cosmic resources, and build your space empire in this blockchain-based MMO.",
    icon: "https://images.unsplash.com/photo-1548391350-968f58dedaed?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.7,
    category: "Strategy",
    downloadUrl: "#",
    blockchain: "Solana",
    isNew: true
  },
  {
    title: "Crypto Karts",
    description: "Race against other players with NFT vehicles that you can upgrade, customize and trade.",
    icon: "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.4,
    category: "Racing",
    downloadUrl: "#",
    blockchain: "Polygon",
    isNew: true
  },
  {
    title: "Blockchain Battlers",
    description: "Collect, train, and battle with blockchain monsters. Each has unique stats and abilities.",
    icon: "https://images.unsplash.com/photo-1590955256716-d7676e3efbf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.3,
    category: "RPG",
    downloadUrl: "#",
    blockchain: "Ethereum",
    isNew: true
  }
];

const latestOffers = [
  {
    title: "CryptoPunk #9999",
    description: "Limited-time offer: Get this rare CryptoPunk NFT at a 20% discount for the next 24 hours only!",
    icon: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.9,
    category: "NFT",
    downloadUrl: "#",
    blockchain: "Ethereum"
  },
  {
    title: "NFT Starter Pack",
    description: "Get 5 random NFTs from top collections plus 100 tokens to kickstart your Web3 journey.",
    icon: "https://images.unsplash.com/photo-1659535824233-dbb2ff58d8c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    category: "Bundle",
    downloadUrl: "#",
    blockchain: "Multi-chain"
  },
  {
    title: "DeFi Yield Booster",
    description: "Double your staking rewards for the first month when you stake through our platform.",
    icon: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.6,
    category: "DeFi",
    downloadUrl: "#",
    blockchain: "Solana"
  },
  {
    title: "GameFi Premium",
    description: "Get exclusive access to 10 premium blockchain games with special in-game bonuses.",
    icon: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.7,
    category: "Gaming",
    downloadUrl: "#",
    blockchain: "Multi-chain"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          <FeaturedSection />
          
          <AppGrid 
            title="Top Dapps" 
            subtitle="Most popular decentralized applications" 
            apps={topApps}
            viewAllLink="#apps"
          />
          
          <CategoryGrid />
          
          <AppGrid 
            title="Latest Games" 
            subtitle="Fresh blockchain gaming experiences" 
            apps={newGames}
            viewAllLink="#games"
          />
          
          <AppGrid 
            title="Special Offers" 
            subtitle="Limited-time deals and rewards" 
            apps={latestOffers}
            viewAllLink="#offers"
          />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
