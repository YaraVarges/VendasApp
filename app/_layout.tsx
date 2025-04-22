import { Slot, useRouter, useNavigationContainerRef } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthProvider from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

export default function RootLayout() {
    return (
        <AuthProvider>
                <CartProvider>
                    <LayoutContent />
                </CartProvider>
        </AuthProvider>
    );
}

function LayoutContent() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsReady(true), 0);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!isLoading && isReady && !user && router.canGoBack()) {
            router.replace('/(auth)/login');
        }
    }, [isLoading, isReady, user]);

    if (isLoading || !isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <Slot />;
}