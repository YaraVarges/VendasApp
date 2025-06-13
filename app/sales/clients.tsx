// app/sales/clients.tsx
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clients } from '../data/clients';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ClientsList() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#80F26D" />
            </TouchableOpacity>

            <Text style={styles.title}>Selecionar Cliente</Text>

            <FlatList
                data={clients}
                keyExtractor={item => item.id}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push({
                            pathname: '/sales/new',
                            params: { clientId: item.id }
                        })}
                    >
                        <View>
                            <Text style={styles.label}>Fantasia: <Text style={styles.value}>{item.fantasia}</Text></Text>
                            <Text style={styles.label}>Razão Social: <Text style={styles.value}>{item.razaosocial}</Text></Text>
                            <Text style={styles.label}>CNPJ/CPF: <Text style={styles.value}>{item.cnpjcpf}</Text></Text>
                        </View>
                        <Ionicons name="checkmark-circle" size={28} color="#80F26D" />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191F26',
        padding: 16,
    },
    backButton: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#80F26D',
        textAlign: 'center',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#212E40',
        borderColor: '#80F26D',
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 4,
    },
    value: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
