import { MenuItemWithUserSelections } from "@/types/api/menuItem";
import { useCart } from "@/components/CartContext";
import { ShoppingCart } from "lucide-react";

export default function QuantityControls({
  item,
}: {
  item: MenuItemWithUserSelections;
}) {
  const { items, addItem, viewCart } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = async () => {
    const firstOpt = item.productOptions?.[0];
    const firstValue = firstOpt?.option?.optionLists?.[0];

    const payload: {
      productId: string;
      quantity: number;
      selectedOptions?: Record<string, string>;
    } = {
      productId: item.id,
      quantity: item.quantity ?? 1,
    };

    if (item.selectedOptions) {
      payload.selectedOptions = {
        [item.selectedOptions.id]: item.selectedOptions.value,
      };
    } else if (firstOpt?.optionId && firstValue) {
      payload.selectedOptions = {
        [firstOpt.optionId]: firstValue,
      };
    }


    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("Failed to add item");

      const data = await res.json();
      
      localStorage.setItem("token", JSON.stringify(data.data.guestToken));

      addItem({
        id: item.id,
        title: item.name,
        description: item.description,
        price: item.price,
        quantity: payload.quantity,
        selectedOptions: item.selectedOptions,
        thaiName: item.thaiName,
        image: item.imageUrls[0],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {quantity === 0 ? (
        <button
          onClick={handleAdd}
          className="flex items-center text-xs gap-2 p-1 lg:p-2 secondary_btn border border_border rounded-3xl tracking-wider transition-colors"
          aria-label={`Add ${item.name} to cart`}
        >
          <ShoppingCart className="w-4 h-4" />
          Add To Cart
        </button>
      ) : (
        <div className="flex items-center gap-1">
          <button
            onClick={viewCart}
            className="flex items-center gap-2 p-2 secondary_btn border border_border rounded-3xl text-xs tracking-wider transition-colors"
            aria-label={`Add ${item.name} to cart`}
          >
            {/* <ShoppingCart className="w-4 h-4" /> */}
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
