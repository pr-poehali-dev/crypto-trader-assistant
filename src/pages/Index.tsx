import { useState } from "react";
import Hero from "@/components/Hero";
import ServiceDescription from "@/components/ServiceDescription";
import Advantages from "@/components/Advantages";
import CallToAction from "@/components/CallToAction";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onAuthClick={() => setShowAuthModal(true)} />
      <ServiceDescription />
      <Advantages />
      <CallToAction />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Index;
