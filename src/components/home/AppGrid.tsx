
import { AppCard, AppCardProps } from "./AppCard";

interface AppGridProps {
  title: string;
  subtitle?: string;
  apps: AppCardProps[];
  viewAllLink?: string;
}

const AppGrid = ({ title, subtitle, apps, viewAllLink }: AppGridProps) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <a
            href={viewAllLink}
            className="text-crypto-neon-purple hover:text-crypto-neon-pink transition-colors"
          >
            View all
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apps.map((app, index) => (
          <AppCard key={index} {...app} />
        ))}
      </div>
    </section>
  );
};

export default AppGrid;
