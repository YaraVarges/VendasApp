import { View, Text, Button } from 'react-native';
import { useCart } from '../contexts/CartContext';

export default function ConfirmSale() {
    const { items, total, clearCart } = useCart();

    const handleConfirm = () => {
        // Lógica para salvar a venda
        clearCart();
        alert('Venda registrada com sucesso!');
    };

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, marginBottom: 16 }}>Resumo da Venda</Text>

            {items.map(item => (
                <View key={item.product.id} style={{ marginBottom: 8 }}>
                    <Text>{item.product.nome} x {item.quantity}</Text>
                    <Text>R$ {(item.product.preco * item.quantity).toFixed(2)}</Text>
                </View>
            ))}

            <Text style={{ marginTop: 16, fontWeight: 'bold' }}>
                Total: R$ {total.toFixed(2)}
            </Text>

            <Button title="Confirmar Venda" onPress={handleConfirm} />
        </View>
    );
}