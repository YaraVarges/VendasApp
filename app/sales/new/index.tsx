import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { products } from '../../data/products';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import PrecoFormatado from '@/app/components/PrecoFormat';
import { clients } from '../../data/clients';
import { useEffect } from 'react';

//FUNCAO DE NOVA VENDA
export default function NewSale() {
    const { items, addItem, removeItem, setQuantity, total, setClienteSelecionado  } = useCart();
    const router = useRouter();

    const screenWidth = Dimensions.get('window').width;
    const width50 = screenWidth * 0.50;

    const getQuantity = (productId: string) => {
        const item = items.find(i => i.product.id === productId);
        return item ? item.quantity : 0;
    };

    const { clientId } = useLocalSearchParams();
    const clienteSelecionado = clients.find(c => c.id === clientId);

    useEffect(() => {
        if (clienteSelecionado) {
            setClienteSelecionado(clienteSelecionado);
        }
    }, [clienteSelecionado]);

    return (



        <View style={{ flex: 1, padding: 16 }}>
            {clienteSelecionado && (
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Cliente:</Text>
                    <Text>{clienteSelecionado.razaosocial}</Text>
                    <Text>{clienteSelecionado.cnpjcpf}</Text>
                </View>
            )}

            <TouchableOpacity
                onPress={() => router.replace('/sales/clients')}
                style={{ backgroundColor: '#eee', padding: 8, borderRadius: 8 }}
            >
                <Text style={{ color: '#333' }}>Trocar</Text>
            </TouchableOpacity>


            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selecione os Produtos</Text>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        const quantity = getQuantity(item.id);

                        return (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 16,
                                    borderBottomWidth: 1,
                                    borderColor: '#80F26D',
                                }}
                            >
                                <View style={{ flexDirection: 'column', justifyContent: 'space-between', maxWidth: width50, }}>
                                    <Text>{item.id} - {item.nome}</Text>
                                    <Text>Estoque: {item.estoque}</Text>
                                    <Text>Preço: <PrecoFormatado valor={item.preco}>RS</PrecoFormatado></Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => removeItem(item.id)}
                                        style={{
                                            backgroundColor: '#80F26D',
                                            padding: 10,
                                            borderRadius: 4,
                                            marginRight: 10
                                        }}
                                    >
                                        <Text>-</Text>
                                    </TouchableOpacity>

                                    <TextInput
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            padding: 5,
                                            width: 50,
                                            textAlign: 'center',
                                            marginRight: 10
                                        }}
                                        keyboardType="numeric"
                                        value={String(quantity)}
                                        onChangeText={(text) => {
                                            const number = parseInt(text);
                                            if (!isNaN(number)) {
                                                setQuantity(item, number);
                                            }
                                        }}
                                    />

                                    <TouchableOpacity
                                        onPress={() => addItem(item)}
                                        style={{
                                            backgroundColor: '#80F26D',
                                            padding: 10,
                                            borderRadius: 4,
                                        }}
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
            </KeyboardAvoidingView>


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
