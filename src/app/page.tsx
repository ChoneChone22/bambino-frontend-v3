import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import AboutUs from "@/components/AboutUs";
import { CartProvider } from "@/components/CartContext";
import MenuSection from "@/components/MenuSection";
import FranchiseSection from "@/components/FranchiseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FAQSection";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <CartProvider>
      <main className="min-h-screen bg-background">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <HeroSection />
        {/* <PhilosophySection /> */}
        <AboutUs/>
        <MenuSection />
        <FranchiseSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactUs />
        <Footer />
      </main>
    </CartProvider>
  );
}
