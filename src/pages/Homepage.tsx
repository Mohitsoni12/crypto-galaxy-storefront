
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import TrendingApps from "@/components/home/TrendingApps";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import NewReleases from "@/components/home/NewReleases";
import EarlyAccess from "@/components/home/EarlyAccess";
import MainLayout from "@/components/layout/MainLayout";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-crypto-dark-bg">
      <Navbar />
      <MainLayout>
        <Hero />
        <FeaturedGrid />
        <TrendingApps />
        <CategoryShowcase />
        <NewReleases />
        <EarlyAccess />
      </MainLayout>
      <Footer />
    </div>
  );
};

export default Homepage;
