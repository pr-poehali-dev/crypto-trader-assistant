import { useState } from "react";
import Hero from "@/components/Hero";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onAuthClick={() => setShowAuthModal(true)} />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Index;
