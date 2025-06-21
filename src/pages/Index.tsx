import Hero from "@/components/Hero";
import CryptoPrices from "@/components/CryptoPrices";
import ChartsAnalytics from "@/components/ChartsAnalytics";
import News from "@/components/News";
import TradingTools from "@/components/TradingTools";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CryptoPrices />
      <ChartsAnalytics />
      <News />
      <TradingTools />
      <Contact />
    </div>
  );
};

export default Index;
