
import { cn } from "@/lib/utils";

interface FooterLinkGroupProps {
  title: string;
  links: { label: string; href: string }[];
  titleColor?: string;
}

const FooterLinkGroup = ({ title, links, titleColor }: FooterLinkGroupProps) => (
  <div>
    <h4 className={cn("font-semibold mb-4", titleColor)}>{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <a 
            href={link.href} 
            className="text-sm text-gray-400 hover:text-crypto-neon-blue transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const companyLinks = [
    { label: "About", href: "#" },
    { label: "Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
  ];
  
  const resourceLinks = [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Support", href: "#" },
    { label: "Community", href: "#" },
  ];
  
  const legalLinks = [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Licenses", href: "#" },
  ];
  
  const developerLinks = [
    { label: "Submit App", href: "#" },
    { label: "Developer Portal", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "SDK Downloads", href: "#" },
  ];
  
  const socialLinks = [
    { label: "Twitter", href: "#", icon: "twitter" },
    { label: "Discord", href: "#", icon: "discord" },
    { label: "GitHub", href: "#", icon: "github" },
    { label: "Telegram", href: "#", icon: "telegram" },
  ];

  return (
    <footer className="border-t border-crypto-border mt-16 bg-crypto-dark-bg/50">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-crypto-neon-purple to-crypto-neon-blue"></div>
                <div className="absolute inset-0 blur-sm bg-gradient-to-tr from-crypto-neon-purple to-crypto-neon-blue opacity-70"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-crypto-neon-blue via-crypto-neon-purple to-crypto-neon-pink text-transparent bg-clip-text">
                CryptoStore.fun
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              The premier destination for discovering and downloading crypto games, 
              apps, and digital content for the Web3 generation.
            </p>
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-crypto-dark-card border border-crypto-border hover:border-crypto-neon-purple transition-colors"
                  aria-label={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>
          <FooterLinkGroup 
            title="Company" 
            links={companyLinks}
            titleColor="text-crypto-neon-blue"
          />
          <FooterLinkGroup 
            title="Resources" 
            links={resourceLinks}
            titleColor="text-crypto-neon-purple"
          />
          <FooterLinkGroup 
            title="Legal" 
            links={legalLinks}
            titleColor="text-crypto-neon-pink"
          />
          <FooterLinkGroup 
            title="Developers" 
            links={developerLinks}
            titleColor="text-crypto-neon-orange"
          />
        </div>
        
        <div className="pt-8 border-t border-crypto-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            © {currentYear} CryptoStore.fun. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs text-gray-400 hover:text-crypto-neon-blue">
              Status
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-crypto-neon-blue">
              Security
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-crypto-neon-blue">
              Pricing
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-crypto-neon-blue">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for social icons
const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'twitter':
      return (
        <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
      );
    case 'github':
      return (
        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
        </svg>
      );
    case 'discord':
      return (
        <svg className="h-4 w-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
        </svg>
      );
    case 'telegram':
      return (
        <svg className="h-4 w-4 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
        </svg>
      );
    default:
      return null;
  }
};

export default Footer;
