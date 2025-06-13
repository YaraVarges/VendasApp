// app/sales/new.tsx
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { products } from '../../data/products';
import PrecoFormatado from '@/app/components/PrecoFormat';
import { clients } from '../../data/clients';
import { useEffect } from 'react';

export default function NewSale() {
    const { items, addItem, removeItem, setQuantity, total, setClienteSelecionado } = useCart();
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
        <View style={styles.container}>
            {clienteSelecionado && (
                <View style={styles.clienteBox}>
                    <Text style={styles.clienteTitle}>Cliente selecionado:</Text>
                    <Text style={styles.clienteText}>{clienteSelecionado.razaosocial}</Text>
                    <Text style={styles.clienteText}>{clienteSelecionado.cnpjcpf}</Text>
                    <TouchableOpacity onPress={() => router.replace('/sales/clients')} style={styles.trocarBotao}>
                        <Text style={styles.trocarTexto}>Trocar</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.titulo}>Selecione os Produtos</Text>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => {
                        const quantity = getQuantity(item.id);

                        return (
                            <View style={styles.produtoCard}>
                                <View style={[styles.produtoInfo, { maxWidth: width50 }]}>
                                    <Text style={styles.produtoNome}>{item.id} - {item.nome}</Text>
                                    <Text style={styles.produtoLabel}>Estoque: {item.estoque}</Text>
                                    <Text style={styles.produtoLabel}>Preço: <PrecoFormatado valor={item.preco} /></Text>
                                </View>

                                <View style={styles.quantidadeBox}>
                                    <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.botaoAlterar}>
                                        <Text style={styles.botaoTexto}>-</Text>
                                    </TouchableOpacity>

                                    <TextInput
                                        style={styles.inputQuantidade}
                                        keyboardType="numeric"
                                        value={String(quantity)}
                                        onChangeText={(text) => {
                                            const number = parseInt(text);
                                            if (!isNaN(number)) {
                                                setQuantity(item, number);
                                            }
                                        }}
                                    />

                                    <TouchableOpacity onPress={() => addItem(item)} style={styles.botaoAlterar}>
                                        <Text style={styles.botaoTexto}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
            </KeyboardAvoidingView>

            <View style={styles.totalContainer}>
                <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2)}</Text>
                <TouchableOpacity style={styles.finalizarBotao} onPress={() => router.push('/sales/confirm')}>
                    <Text style={styles.finalizarTexto}>Finalizar Venda</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#191F26',
    },
    clienteBox: {
        backgroundColor: '#212E40',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        borderColor: '#80F26D',
        borderWidth: 1,
    },
    clienteTitle: {
        fontWeight: 'bold',
        color: '#80F26D',
        marginBottom: 4,
    },
    clienteText: {
        color: '#fff',
    },
    trocarBotao: {
        marginTop: 10,
        backgroundColor: '#80F26D',
        padding: 8,
        borderRadius: 6,
        alignSelf: 'flex-start'
    },
    trocarTexto: {
        color: '#212E40',
        fontWeight: 'bold',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#80F26D',
        marginBottom: 10,
    },
    produtoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#80F26D',
    },
    produtoInfo: {
        flexDirection: 'column',
    },
    produtoNome: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    produtoLabel: {
        color: '#ccc',
    },
    quantidadeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    botaoAlterar: {
        backgroundColor: '#80F26D',
        padding: 10,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    botaoTexto: {
        color: '#212E40',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputQuantidade: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        width: 50,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    totalContainer: {
        marginTop: 20,
    },
    totalTexto: {
        fontSize: 18,
        color: '#fff',
    },
    finalizarBotao: {
        backgroundColor: '#80F26D',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center'
    },
    finalizarTexto: {
        color: '#191F26',
        fontWeight: 'bold',
    },
});
