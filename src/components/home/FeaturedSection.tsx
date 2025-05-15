
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface FeaturedItemProps {
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaUrl: string;
  badge?: string;
}

const featuredItems: FeaturedItemProps[] = [
  {
    title: "CryptoRaiders",
    description: "Battle in the most immersive blockchain-powered RPG ever created. Collect unique NFT heroes, weapons and join epic raids.",
    image: "https://images.unsplash.com/photo-1558481795-7f0a7c906f5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    ctaLabel: "Play Now",
    ctaUrl: "#",
    badge: "Featured"
  },
  {
    title: "MetaChain Runners",
    description: "Parkour through procedurally generated cityscapes while earning tokens. Physics-defying gameplay meets play-to-earn.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    ctaLabel: "Download",
    ctaUrl: "#",
    badge: "New"
  },
  {
    title: "DeFi Kingdom",
    description: "The ultimate crypto gaming experience combining DeFi protocols with a fantasy RPG world and tokenized assets.",
    image: "https://images.unsplash.com/photo-1628527304948-06157ee3c8a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    ctaLabel: "Explore",
    ctaUrl: "#",
  }
];

const FeaturedItem = ({ title, description, image, ctaLabel, ctaUrl, badge }: FeaturedItemProps) => (
  <div className="relative h-[500px] w-full flex-shrink-0 overflow-hidden rounded-2xl">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    
    {badge && (
      <span className="absolute top-4 right-4 px-3 py-1 bg-crypto-neon-purple/80 text-white text-xs font-semibold rounded-full animate-pulse-glow">
        {badge}
      </span>
    )}
    
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">{title}</h2>
      <p className="text-lg text-gray-200 mb-6 max-w-2xl">{description}</p>
      <Button 
        size="lg" 
        className="bg-crypto-neon-purple hover:bg-crypto-neon-purple/80 text-white"
        asChild
      >
        <a href={ctaUrl}>{ctaLabel}</a>
      </Button>
    </div>
  </div>
);

const FeaturedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const newIndex = Math.max(0, Math.min(index, featuredItems.length - 1));
      setCurrentIndex(newIndex);
      scrollContainerRef.current.scrollTo({
        left: newIndex * scrollContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  return (
    <section className="relative mb-16">
      <div 
        className="flex overflow-x-hidden snap-x snap-mandatory" 
        ref={scrollContainerRef}
      >
        {featuredItems.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 snap-center">
            <FeaturedItem {...item} />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button 
          variant="outline"
          size="icon"
          className="rounded-full bg-black/50 border-crypto-purple hover:bg-crypto-purple/30 hover:border-crypto-neon-purple"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline"
          size="icon" 
          className="rounded-full bg-black/50 border-crypto-purple hover:bg-crypto-purple/30 hover:border-crypto-neon-purple"
          onClick={handleNext}
          disabled={currentIndex === featuredItems.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredItems.map((_, index) => (
          <button 
            key={index} 
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "w-8 bg-crypto-neon-purple" 
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
