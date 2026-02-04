import UserDataForm from "@/components/UserDataForm";
import { Suspense } from "react";
import Header from "@/components/Header";

export default function FormPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <div className="max-w-4xl mx-auto py-18 md:py-20 px-6 md:px-12 lg:px-20">
        <UserDataForm />
      </div>
    </div>
  );
}
