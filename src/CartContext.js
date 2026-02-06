import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    console.log("addToCart called:", product, quantity);
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.folderName === product["Folder Name"]
      );
      if (existing) {
        return prev.map((item) =>
          item.folderName === product["Folder Name"]
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          folderName: product["Folder Name"],
          name: product["Product Name"],
          price: parseInt(product["Price"]) || 0,
          category: product["Category"],
          language: product["Language(s)"] || "",
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (folderName) => {
    setCartItems((prev) => prev.filter((item) => item.folderName !== folderName));
  };

  const updateQuantity = (folderName, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.folderName === folderName ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
