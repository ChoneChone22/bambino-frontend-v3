"use client";

import MyAccountHeroSection from "@/components/MyAccountHeroSection";
import RegisterGate from "@/components/RegisterGate";
import { useUser } from "@/components/UserContext";

export default function RegisterContent() {
  const { user } = useUser();

  return (
    <div className="pt-16">
      {!user && <MyAccountHeroSection />}
      <RegisterGate />
    </div>
  );
}
