import Header from "@/components/Header";
import MyAccountHeroSection from "@/components/MyAccountHeroSection";
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { Suspense } from "react";

export default function AccountPage() {
  return (
    <CartProvider>
      <main className="min-h-screen bg-background">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <div className="pt-16">
          <MyAccountHeroSection />
          <AuthForm/>
        </div>
        <Footer />
      </main>
    </CartProvider>
  );
}
