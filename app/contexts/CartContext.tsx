import { createContext, useState, useContext } from 'react';

type Product = {
    id: string;
    nome: string;
    preco: number;
};

type CartItem = {
    product: Product;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    total: number;
};

const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => { },
    removeItem: () => { },
    clearCart: () => { },
    total: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product) => {
        setItems(prev => {
            const existingItem = prev.find(item => item.product.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };


    

    const total = items.reduce(
        (sum, item) => sum + item.product.preco * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem: (productId) => setItems(prev => prev.filter(item => item.product.id !== productId)),
                clearCart: () => setItems([]),
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);