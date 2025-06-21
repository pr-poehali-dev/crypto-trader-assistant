import { useState } from "react";
import Hero from "@/components/Hero";
import CryptoPrices from "@/components/CryptoPrices";
import ChartsAnalytics from "@/components/ChartsAnalytics";
import News from "@/components/News";
import TradingTools from "@/components/TradingTools";
import Contact from "@/components/Contact";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onAuthClick={() => setShowAuthModal(true)} />
      <CryptoPrices />
      <ChartsAnalytics />
      <News />
      <TradingTools />
      <Contact />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Index;
