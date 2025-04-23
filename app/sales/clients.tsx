// app/sales/clients.tsx
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { clients } from '../data/clients';
import { useRouter } from 'expo-router';

export default function ClientsList() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Selecione o Cliente</Text>

            <FlatList
                data={clients}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            padding: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc'
                        }}
                        onPress={() => router.push({
                            pathname: '/sales/new',
                            params: { clientId: item.id }
                        })}
                    >
                        <Text style={{ fontSize: 16 }}>{item.razaosocial}</Text>
                        <Text style={{ color: '#666' }}>{item.cnpjcpf}</Text>
                    </TouchableOpacity>

                    
                )}
            />
        </View>
    );
}
