// contexts/SalesContext.tsx
import { createContext, useState, useContext } from 'react';

type Sale = {
    id: string;
    client: { id: string; nome: string };
    items: Array<{
        product: { id: string; nome: string; preco: number };
        quantity: number;
    }>;
    total: number;
    observation?: string;
    date: string;
};

type SalesContextType = {
    sales: Sale[];
    addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
};

const SalesContext = createContext<SalesContextType>({
    sales: [],
    addSale: () => { },
});

export function SalesProvider({ children }: { children: React.ReactNode }) {
    const [sales, setSales] = useState<Sale[]>([]);

    const addSale = (sale: Omit<Sale, 'id' | 'date'>) => {
        const newSale = {
            ...sale,
            id: Math.random().toString(36).substring(2, 9),
            date: new Date().toISOString(),
        };
        setSales(prev => [...prev, newSale]);
    };

    return (
        <SalesContext.Provider value={{ sales, addSale }}>
            {children}
        </SalesContext.Provider>
    );
}

export const useSales = () => useContext(SalesContext);