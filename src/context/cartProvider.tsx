import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";

// TypeScript interface for cart items
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartLoading: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string | number) => void;
  removeQuantityFromItem: (itemId: string | number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);

  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    Cookies.set("userCart", JSON.stringify(updatedCart), {
      expires: 7,
      path: "/",
    });
  };

  useEffect(() => {
    const cartCookie = Cookies.get("userCart");
    if (cartCookie) {
      try {
        setCart(JSON.parse(cartCookie));
      } catch {
        console.error("Failed to parse cart cookie.");
      }
    }
    setIsCartLoading(false);
  }, []);

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      saveCart(updatedCart);
    } else {
      saveCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId: string | number) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    saveCart(updatedCart);
  };

  const removeQuantityFromItem = (itemId: string | number) => {
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartLoading,
        addToCart,
        removeFromCart,
        removeQuantityFromItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
