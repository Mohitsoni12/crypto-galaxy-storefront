
import { AppCard } from "./AppCard";

const newReleases = [
  {
    title: "Chain Champions",
    description: "Build your dream team of fighters, train them with unique abilities, and battle in the blockchain arena.",
    icon: "https://images.unsplash.com/photo-1633957897986-70e83293b3cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.1,
    category: "Fighting",
    downloadUrl: "#",
    blockchain: "Ethereum",
    isNew: true
  },
  {
    title: "Galactic Miners",
    description: "Explore the universe, mine rare cosmic resources, and build your space empire in this blockchain-based MMO.",
    icon: "https://images.unsplash.com/photo-1548391350-968f58dedaed?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.7,
    category: "Strategy",
    downloadUrl: "#",
    blockchain: "Solana",
    isNew: true
  },
  {
    title: "Crypto Karts",
    description: "Race against other players with NFT vehicles that you can upgrade, customize and trade.",
    icon: "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.4,
    category: "Racing",
    downloadUrl: "#",
    blockchain: "Polygon",
    isNew: true
  },
  {
    title: "WalletGuard Pro",
    description: "Advanced security solution for crypto wallets with real-time monitoring and threat detection.",
    icon: "https://images.unsplash.com/photo-1633158829875-e5316a358c6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    category: "Security",
    downloadUrl: "#",
    blockchain: "Multi-chain",
    isNew: true
  },
  {
    title: "DefiPulse",
    description: "Track and analyze DeFi protocols with real-time data and personalized dashboards.",
    icon: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.5,
    category: "Finance",
    downloadUrl: "#",
    blockchain: "Ethereum",
    isNew: true
  },
  {
    title: "MetaChat",
    description: "Metaverse social platform where you can meet, chat and collaborate using customizable NFT avatars.",
    icon: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.3,
    category: "Social",
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

const NewReleases = () => {
  return (
    <section className="mb-12">
      <SectionHeader title="New Releases" actionLink="#new" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newReleases.map((app, index) => (
          <AppCard 
            key={index} 
            {...app}
          />
        ))}
      </div>
    </section>
  );
};

export default NewReleases;
