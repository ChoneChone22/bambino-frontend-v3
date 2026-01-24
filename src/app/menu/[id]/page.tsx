import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import SingleMenu from "@/components/SingleMenu";

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("mmsid", id);

  return (
    <html>
      <body>
        <div
          style={{
            padding: "20px",
            background: "red",
            color: "white",
            minHeight: "100vh",
          }}
        >
          <h1>TEST PAGE WORKS!</h1>
          <p>ID: {id}</p>
        </div>
      </body>
    </html>
  );
}
