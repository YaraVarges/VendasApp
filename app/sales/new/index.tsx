import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'expo-router';
import { products } from '../../data/products';

export default function NewSale() {
    const { items, addItem, removeItem, total } = useCart();
    const router = useRouter();


    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selecione os Produtos</Text>

            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            padding: 16,
                            borderBottomWidth: 1,
                            borderColor: '#ddd',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                        onPress={() => addItem(item)}
                    >
                        <Text>{item.nome}</Text>
                        <Text>R$ {item.preco.toFixed(2)}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18 }}>Total: R$ {total.toFixed(2)}</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#80F26D',
                        padding: 16,
                        borderRadius: 8,
                        marginTop: 16,
                        alignItems: 'center'
                    }}
                    onPress={() => router.push('/sales/confirm')}
                >
                    <Text style={{ color: '#191F26', fontWeight: 'bold' }}>Finalizar Venda</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}