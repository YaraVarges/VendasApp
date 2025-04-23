import { View, Text, Button, TextInput, } from 'react-native';
import { useCart } from '../contexts/CartContext';
import PrecoFormatado from '../components/PrecoFormat';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

//FUNÇÃO DE CONFIRMAÇÃO DA VENDA
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
        //Inserir função de salvar venda
        try {
            const venda = {
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

            const vendasExistentes = await AsyncStorage.getItem('@vendas');
            const vendas = vendasExistentes ? JSON.parse(vendasExistentes) : [];
            vendas.push(venda);
            await AsyncStorage.setItem('@vendas', JSON.stringify(vendas));

            alert('Venda registrada com sucesso!');

            router.push('/home');

            clearCart();
        } catch (error) {
            console.error('Erro ao salvar venda:', error);
            alert('Erro ao registrar a venda');
        }
        /*clearCart();
        alert('Venda registrada com sucesso!');

        router.push('/home');
        */
    };

    const handleSharePDF = async () => {
        const html = `
        <html>
            <head>
            <style>
                body {
                font-family: Arial, sans-serif;
                padding: 20px;
                }
                h1 {
                text-align: center;
                margin-bottom: 24px;
                }
                table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 24px;
                }
                th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
                }
                th {
                background-color: #f0f0f0;
                }
                .total {
                font-weight: bold;
                text-align: right;
                }
            </style>
            </head>
            <body>
            <h1>Resumo da Venda</h1>
            <h3>Dados do Cliente:</h3>
            <h4>Nome Fantasia: ${clienteSelecionado?.fantasia}</h4>
            <h4>Razão Social: ${clienteSelecionado?.razaosocial}</h4>
            <h4>CNPJ/CPF: ${clienteSelecionado?.cnpjcpf}</h4>
            <h4>Endereço: ${clienteSelecionado?.endereco}</h4>
            <table>
                <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço Unit.</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                ${items.map(item => `
                    <tr>
                    <td>${item.product.nome}</td>
                    <td>${item.quantity}</td>
                    <td>R$ ${item.product.preco.toFixed(2)}</td>
                    <td>R$ ${(item.product.preco * item.quantity).toFixed(2)}</td>
                    </tr>
                `).join('')}
                </tbody>
            </table>

            <p class="total">Subtotal: R$ ${subtotal.toFixed(2)}</p>
            <p class="total">Desconto R$: ${discountValue.toFixed(2)} (${discountPercentage.toFixed(1)}%)</p>
            <p class="total"><strong>Total Final: R$ ${total.toFixed(2)}</strong></p>
            </body>
        </html>
        `;

        try {
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
    }

    return (
        <View style={{ padding: 16 }}>
            <Text>Cliente: {clienteSelecionado?.fantasia || clienteSelecionado?.razaosocial}</Text>


            <Text style={{ fontSize: 20, marginBottom: 16 }}>Resumo da Venda</Text>

            {items.map(item => (
                <View key={item.product.id} style={{ marginBottom: 8 }}>
                    <Text>{item.product.nome} x {item.quantity}</Text>
                    <Text>R$ <PrecoFormatado valor={item.product.preco * item.quantity}>RS</PrecoFormatado></Text>
                </View>
            ))}

            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 10 }}>Sub Total: R$ {subtotal.toFixed(2)}</Text>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
                <View>
                    <Text style={{ fontSize: 18 }}>Desconto R$</Text>
                    <TextInput
                        placeholder="R$"
                        keyboardType="numeric"
                        value={discountValue.toString()}
                        onChangeText={text => setDiscountValue(Number(text.replace(',', '.')))}
                        style={{ borderWidth: 1, padding: 8, marginBottom: 20, }}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 18 }}>Desconto %</Text>
                    <TextInput
                        placeholder="%"
                        keyboardType="numeric"
                        value={discountPercentage.toString()}
                        onChangeText={text => setDiscountPercentage(Number(text.replace(',', '.')))}
                        style={{ borderWidth: 1, padding: 8, marginBottom: 20 }}
                    />
                </View>
            </View>

            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>Total Final: R$ {total.toFixed(2)}</Text>

            <Button title="Compartilhar em PDF" onPress={handleSharePDF} />
            <View style={{ paddingBottom: 10 }}></View>
            <Button title="Confirmar Venda" onPress={handleConfirm} />
        </View>
    );
}