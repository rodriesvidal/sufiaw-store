"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialProducts, type Product } from "@/lib/products";

type CartLine = { productId: string; quantity: number };

type StoreContextValue = {
  products: Product[];
  cart: CartLine[];
  cartCount: number;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  addToCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const PRODUCT_KEY = "sufiaw-products-v1";
const CART_KEY = "sufiaw-cart-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProductsState] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartLine[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedProducts = window.localStorage.getItem(PRODUCT_KEY);
        const savedCart = window.localStorage.getItem(CART_KEY);
        if (savedProducts) setProductsState(JSON.parse(savedProducts));
        if (savedCart) setCart(JSON.parse(savedCart));
      } catch {
        // Keep the starter catalog if browser storage is unavailable.
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setProducts = (next: Product[]) => {
    setProductsState(next);
    window.localStorage.setItem(PRODUCT_KEY, JSON.stringify(next));
  };

  const persistCart = (next: CartLine[]) => {
    setCart(next);
    window.localStorage.setItem(CART_KEY, JSON.stringify(next));
  };

  const value = useMemo<StoreContextValue>(
    () => ({
      products,
      cart,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      setProducts,
      addProduct: (product) => setProducts([product, ...products]),
      removeProduct: (id) => setProducts(products.filter((item) => item.id !== id)),
      addToCart: (productId) => {
        const found = cart.find((line) => line.productId === productId);
        persistCart(
          found
            ? cart.map((line) =>
                line.productId === productId
                  ? { ...line, quantity: line.quantity + 1 }
                  : line,
              )
            : [...cart, { productId, quantity: 1 }],
        );
      },
      setQuantity: (productId, quantity) =>
        persistCart(
          quantity <= 0
            ? cart.filter((line) => line.productId !== productId)
            : cart.map((line) =>
                line.productId === productId ? { ...line, quantity } : line,
              ),
        ),
      clearCart: () => persistCart([]),
    }),
    [products, cart],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
