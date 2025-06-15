import { Slot, useRouter } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

export default function RootLayout() {
    return (
        <>
            <StatusBar 
            backgroundColor="#191F26" 
            barStyle="light-content" 
            />
            <SafeAreaProvider>
                <AuthProvider>
                    <CartProvider>
                        <LayoutContent />
                    </CartProvider>
                </AuthProvider>
            </SafeAreaProvider>
        </>
    );
}
/*
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
           /*router.replace('/home');
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
*/

function LayoutContent() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsReady(true), 100); // Aumente ligeiramente o timeout
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!isLoading && isReady) {
            if (!user) {
                router.replace('/(auth)/login');
            } else {
                router.replace('/home');
            }
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