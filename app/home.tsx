import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import { useAuth } from './contexts/AuthContext';
import { router } from 'expo-router';

export default function Home() {
    const { user, logout } = useAuth();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#191F26', }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Bem-vindo(a), {user?.name}!
            </Text>

            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <Button title="Clientes" onPress={() => router.push('/clients')} />
                <Button title="Produtos" onPress={() => router.push('/products')} />
            </View>

            <Button
                title="Nova Venda"
                onPress={() => router.push('/sales/new')}
            />
            <View style={{ marginTop: 20 }}>
                <Button title="Sair" onPress={logout} />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
    button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10 },
    buttonText: { color: 'white', fontSize: 18 },
});