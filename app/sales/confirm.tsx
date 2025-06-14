// app/sales/confirm.tsx
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '../contexts/CartContext';
import PrecoFormatado from '../components/PrecoFormat';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfirmSale() {
    const {
        items,
        subtotal,
        total,
        clearCart,
        discountValue,
        discountPercentage,
        setDiscountValue,
        setDiscountPercentage,
        clienteSelecionado,
    } = useCart();

    const router = useRouter();

    const handleConfirm = async () => {
        try {
        const vendasExistentes = await AsyncStorage.getItem('@vendas');
    const vendas = vendasExistentes ? JSON.parse(vendasExistentes) : [];

    const novaVendaId = vendas.length + 1; 


    const venda = {
        id: novaVendaId,
        cliente: {
                id: clienteSelecionado?.id,
                razaosocial: clienteSelecionado?.razaosocial,
                fantasia: clienteSelecionado?.fantasia,
                cnpjcpf: clienteSelecionado?.cnpjcpf,
                endereco: clienteSelecionado?.endereco,
            },
            produtos: items.map(item => ({
                nome: item.product.nome,
                preco: item.product.preco,
                quantidade: item.quantity,
                total: item.product.preco * item.quantity
            })),
            subtotal,
            desconto: discountValue,
            total
    };

    vendas.push(venda);
    await AsyncStorage.setItem('@vendas', JSON.stringify(vendas));
    alert('Venda registrada com sucesso!');
        clearCart();
        router.push('/home'); 
        clearCart();
    } catch (error) {
        console.error('Erro ao salvar venda:', error);
        alert('Erro ao registrar a venda');
    }
    };

    const handleSharePDF = async () => {
    try {
        const vendasJSON = await AsyncStorage.getItem('@vendas');
        const vendas = vendasJSON ? JSON.parse(vendasJSON) : [];
        const numeroPedido = vendas.length + 1;

        const html = `
        <html><head><style>
            body { font-family: Arial; padding: 20px; }
            h1 { text-align: center; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
            .total { font-weight: bold; text-align: right; }
        </style></head><body>
        <h1>Pedido Nº ${numeroPedido}</h1>
        <h3>Dados do Cliente:</h3>
        <h4>Nome Fantasia: ${clienteSelecionado?.fantasia}</h4>
        <h4>Razão Social: ${clienteSelecionado?.razaosocial}</h4>
        <h4>CNPJ/CPF: ${clienteSelecionado?.cnpjcpf}</h4>
        <h4>Endereço: ${clienteSelecionado?.endereco}</h4>
        <table><thead><tr>
            <th>Produto</th><th>Quantidade</th><th>Preço Unit.</th><th>Total</th>
        </tr></thead><tbody>
        ${items.map(item => `
            <tr><td>${item.product.nome}</td><td>${item.quantity}</td><td>R$ ${item.product.preco.toFixed(2)}</td><td>R$ ${(item.product.preco * item.quantity).toFixed(2)}</td></tr>
        `).join('')}
        </tbody></table>
        <p class="total">Subtotal: R$ ${subtotal.toFixed(2)}</p>
        <p class="total">Desconto R$: ${discountValue.toFixed(2)} (${discountPercentage.toFixed(1)}%)</p>
        <p class="total"><strong>Total Final: R$ ${total.toFixed(2)}</strong></p>
        </body></html>`;

        const { uri } = await Print.printToFileAsync({ html });

        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
            await Sharing.shareAsync(uri, {
                mimeType: 'application/pdf',
                dialogTitle: 'Compartilhar PDF',
            });
        } else {
            alert('Compartilhamento não disponível neste dispositivo');
        }
    } catch (error) {
        console.error('Erro ao gerar/compartilhar PDF:', error);
    }
    };


    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#191F26' }}
            contentContainerStyle={styles.container}
        >
            <Text style={styles.clienteNome}>Cliente: {clienteSelecionado?.fantasia || clienteSelecionado?.razaosocial}</Text>

            <Text style={styles.titulo}>Resumo da Venda</Text>

            {items.map(item => (
                <View key={item.product.id} style={styles.itemBox}>
                    <Text style={styles.itemText}>{item.product.nome} x {item.quantity}</Text>
                    <Text style={styles.itemValor}><PrecoFormatado valor={item.product.preco * item.quantity} /></Text>
                </View>
            ))}

            <Text style={styles.subtotal}>Sub Total: R$ {subtotal.toFixed(2)}</Text>

            <View style={styles.descontoContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Desconto R$</Text>
                    <TextInput
                        placeholder="R$"
                        keyboardType="numeric"
                        value={discountValue.toString()}
                        onChangeText={text => setDiscountValue(Number(text.replace(',', '.')))}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Desconto %</Text>
                    <TextInput
                        placeholder="%"
                        keyboardType="numeric"
                        value={discountPercentage.toString()}
                        onChangeText={text => setDiscountPercentage(Number(text.replace(',', '.')))}
                        style={styles.input}
                    />
                </View>
            </View>

            <Text style={styles.total}>Total Final: R$ {total.toFixed(2)}</Text>

            <TouchableOpacity style={styles.botao} onPress={handleSharePDF}>
                <Text style={styles.botaoTexto}>Compartilhar em PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={handleConfirm}>
                <Text style={styles.botaoTexto}>Confirmar Venda</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    clienteNome: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 12,
    },
    titulo: {
        fontSize: 20,
        color: '#80F26D',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemBox: {
        marginBottom: 8,
    },
    itemText: {
        color: '#fff',
    },
    itemValor: {
        color: '#ccc',
    },
    subtotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    descontoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    inputGroup: {
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 6,
        width: 100,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#80F26D',
        marginBottom: 20,
        textAlign: 'center',
    },
    botao: {
        backgroundColor: '#80F26D',
        padding: 14,
        borderRadius: 8,
        marginBottom: 12,
        alignItems: 'center',
    },
    botaoTexto: {
        fontWeight: 'bold',
        color: '#191F26',
    },
});
