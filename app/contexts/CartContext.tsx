import { createContext, useState, useContext } from 'react';

type Product = {
    id: string;
    nome: string;
    preco: number;
};

type Client = {
    id: string;
    razaosocial: string;
    fantasia: string;
    cnpjcpf: string;
    endereco?: string;
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
    setQuantity: (product: Product, quantity: number) => void;
    discountValue: number;
    discountPercentage: number;
    setDiscountValue: (value: number) => void;
    setDiscountPercentage: (percentage: number) => void;
    subtotal: number,
    total: number;
    clienteSelecionado: Client | null;
    setClienteSelecionado: (cliente: Client | null) => void;
};

const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => { },
    removeItem: () => { },
    clearCart: () => { },
    setQuantity: () => { },
    discountValue: 0,
    discountPercentage: 0,
    setDiscountValue: () => { },
    setDiscountPercentage: () => { },
    subtotal: 0,
    total: 0,
    clienteSelecionado: null,
    setClienteSelecionado: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [discountValueState, setDiscountValueState] = useState(0);
    const [discountPercentageState, setDiscountPercentageState] = useState(0);
    const [clienteSelecionado, setClienteSelecionado] = useState<Client | null>(null);

    const discountValue = discountValueState;
    const discountPercentage = discountPercentageState;

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

    const removeItem = (productId: string) => {
        setItems(prev =>
            prev
                .map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const setQuantity = (product: Product, quantity: number) => {
        setItems(prev => {
            if (quantity <= 0) {
                return prev.filter(item => item.product.id !== product.id);
            }

            const exists = prev.find(item => item.product.id === product.id);
            if (exists) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity }
                        : item
                );
            }

            return [...prev, { product, quantity }];
        });
    };

    const clearCart = () => {
        setItems([]);
        setDiscountValue(0);
        setDiscountPercentage(0);
        setClienteSelecionado(null);
    };

    const subtotal = items.reduce(
        (sum, item) => sum + item.product.preco * item.quantity,
        0
    );

    const setDiscountValue = (value: number) => {
        const safeValue = Math.min(value, subtotal);
        const roundedValue = Number(safeValue.toFixed(2));
        setDiscountValueState(roundedValue);
        setDiscountPercentageState(Number(((roundedValue / subtotal) * 100).toFixed(2)));
    };
    
    const setDiscountPercentage = (percentage: number) => {
        const safePercentage = Math.min(percentage, 100);
        const roundedPercentage = Number(safePercentage.toFixed(2));
        setDiscountPercentageState(roundedPercentage);
        setDiscountValueState(Number(((roundedPercentage / 100) * subtotal).toFixed(2)));
    };

    const discount = discountValue > 0
        ? discountValue
        : subtotal * (discountPercentage / 100);

    const total = subtotal - discount;

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                clearCart,
                setQuantity,
                discountValue,
                discountPercentage,
                setDiscountValue,
                setDiscountPercentage,
                subtotal,
                total,
                clienteSelecionado,
                setClienteSelecionado,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
