import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from './contexts/AuthContext';
import { router } from 'expo-router';

export default function Home() {
    const { user, logout } = useAuth();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#191F26', }}>
            <Text style={{ fontSize: 20, marginBottom: 10, color: 'white' }}>
                Bem-vindo(a), {user?.name}!
            </Text>
            <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/clients')} >
                    <Text style={styles.buttonText}>Clientes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/products')} >
                    <Text style={styles.buttonText}>Produtos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/sales/clients')} >
                    <Text style={styles.buttonText}>Novo Pedido</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/sales/historico')} >
                    <Text style={styles.buttonText}>Pedidos Realizados</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.button} onPress={logout} >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
    button: { backgroundColor: '#80F26D', padding: 15, borderRadius: 10 },
    buttonText: { color: '#212E40', fontSize: 18 },
});