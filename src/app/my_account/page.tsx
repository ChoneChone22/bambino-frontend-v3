import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { Suspense } from "react";
import RegisterContent from "@/components/RegisterContent";

export default function RegisterPage() {
  return (
    <CartProvider>
      <main className="min-h-screen bg-background">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <RegisterContent />
        <Footer />
      </main>
    </CartProvider>
  );
}
