
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AppCard } from "./AppCard";

const featuredApps = [
  {
    title: "CryptoRaiders",
    description: "Battle in the most immersive blockchain-powered RPG ever created. Collect unique NFT heroes, weapons and join epic raids with friends.",
    icon: "https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    category: "RPG",
    downloadUrl: "#",
    blockchain: "Ethereum",
    isFeatured: true
  },
  {
    title: "MetaChain Runners",
    description: "Parkour through procedurally generated cityscapes while earning tokens. Physics-defying gameplay meets play-to-earn mechanics.",
    icon: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    category: "Action",
    downloadUrl: "#",
    blockchain: "Polygon",
    isNew: true
  },
  {
    title: "DeFi Kingdom",
    description: "The ultimate crypto gaming experience combining DeFi protocols with a fantasy RPG world and tokenized assets.",
    icon: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    category: "Strategy",
    downloadUrl: "#",
    blockchain: "Solana"
  },
  {
    title: "NFT Galaxy",
    description: "Explore a vast universe of digital collectibles, trade with other players, and showcase your collection in virtual galleries.",
    icon: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    category: "Collectibles",
    downloadUrl: "#",
    blockchain: "Multi-chain"
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

const FeaturedGrid = () => {
  return (
    <section className="mb-12">
      <SectionHeader title="Featured Apps" actionLink="#featured" />
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredApps.map((app, index) => (
            <AppCard 
              key={index} 
              {...app} 
              layout="featured"
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
};

export default FeaturedGrid;
