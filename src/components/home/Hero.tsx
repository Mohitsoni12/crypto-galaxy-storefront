
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSlideProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

const slides = [
  {
    title: "Explore The Next Generation of Crypto Gaming",
    subtitle: "Discover thousands of blockchain games with play-to-earn mechanics",
    image: "https://images.unsplash.com/photo-1616031036718-23ddc4d7f8b4?q=80&w=1920&auto=format&fit=crop",
    buttonText: "Explore Games",
    buttonLink: "#games"
  },
  {
    title: "The Future of DeFi Applications",
    subtitle: "Access powerful decentralized finance tools in one place",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1920&auto=format&fit=crop",
    buttonText: "Browse DeFi Apps",
    buttonLink: "#defi"
  },
  {
    title: "Exclusive NFT Collections",
    subtitle: "Get early access to limited digital collectibles",
    image: "https://images.unsplash.com/photo-1645171986726-80195e55d02b?q=80&w=1920&auto=format&fit=crop",
    buttonText: "View Collections",
    buttonLink: "#nft"
  }
];

const HeroSlide = ({ title, subtitle, image, buttonText, buttonLink, isActive }: HeroSlideProps) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 flex items-center transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-crypto-dark-bg/90 via-crypto-dark-bg/70 to-transparent" />
      
      <div className="container relative z-10 mx-auto px-4 lg:px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-crypto-neon-blue to-crypto-neon-purple text-transparent bg-clip-text">
              {title}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {subtitle}
          </p>
          <Button 
            size="lg" 
            className="bg-crypto-neon-purple hover:bg-crypto-neon-purple/80 text-white group"
            asChild
          >
            <a href={buttonLink}>
              <Sparkles className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span>{buttonText}</span>
              <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] lg:h-[600px] mb-12 overflow-hidden rounded-2xl">
      {slides.map((slide, idx) => (
        <HeroSlide 
          key={idx} 
          {...slide} 
          isActive={activeSlide === idx} 
        />
      ))}
      
      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveSlide(idx)}
            className={cn(
              "h-2 rounded-full transition-all",
              activeSlide === idx 
                ? "w-8 bg-crypto-neon-purple" 
                : "w-2 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
