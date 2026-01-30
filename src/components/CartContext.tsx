"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  CartItemFromBackend,
  SelectedOptionDisplay,
  CartItem,
} from "@/types/api/cart";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateOptions: (id: string, options: SelectedOptionDisplay) => void;
  clearCart: () => void;
  viewCart: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      let token;
      const storedValue = localStorage.getItem("token");

      if (!storedValue) return;

      try {
        token = JSON.parse(storedValue);
      } catch (error) {
        token = storedValue;
      }

      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/cart?guestToken=${token}`, {
          headers: {
            "X-Guest-Token": token,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) return;

        const { data } = await res.json();
        console.log("fetchCart", data);

        const mappedItems: CartItem[] = data.items.map(
          (item: CartItemFromBackend) => ({
            id: item.id,
            productId: item.productId,
            title: item.name,
            description: item.description ?? "",
            price: item.price,
            quantity: item.quantity,
            selectedOptions: item.selectedOptionsDisplay,
            image: item.imageUrls[0],
            thaiName: item.thaiName ?? "",
            subtotal: item.subtotal,
          }),
        );

        setItems(mappedItems);
        setTotalItems(data.totalItems);
        setTotalPrice(data.totalPrice);
      } catch (err) {
        console.error("Failed to restore cart", err);
      }
    };

    fetchCart();
  }, []);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, newItem as CartItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item,
      ),
    );
  };

  const updateOptions = (id: string, options: SelectedOptions) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selectedOptions: options } : item,
      ),
    );
  };

  const viewCart = () => {
    setOpen(true);
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateOptions,
        clearCart,
        viewCart,
        open,
        setOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
