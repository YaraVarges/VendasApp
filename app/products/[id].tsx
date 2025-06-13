import { useLocalSearchParams, Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { products } from '../data/products';
import PrecoFormatado from '../components/PrecoFormat';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesProduto() {
    const { id } = useLocalSearchParams();
    const produto = products.find(c => c.id === id);
    const router = useRouter();

    if (!produto) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Produto não encontrado</Text>
                <Link href="/products"><Text style={styles.backLink}>Voltar</Text></Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#80F26D" />
                </TouchableOpacity>
                <Text style={styles.title}>Detalhes do Produto</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>ID: <Text style={styles.value}>{produto.id}</Text></Text>
                <Text style={styles.labelMax}><Text style={styles.value}>{produto.nome}</Text></Text>
                <Text style={styles.labelMax}>Preço: <Text style={styles.value}><PrecoFormatado valor={produto.preco} /></Text></Text>
                <Text style={styles.labelMax}>Estoque: <Text style={styles.value}>{produto.estoque} un</Text></Text>
                <Text style={styles.label}>Descrição: <Text style={styles.value}>{produto.descricao}</Text></Text>
                <Text style={styles.label}>Categoria: <Text style={styles.value}>{produto.categoria}</Text></Text>
                <Text style={styles.label}>Código de Barras: <Text style={styles.value}>{produto.codigoEAN}</Text></Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191F26',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#80F26D',
        marginLeft: 10,
    },
    card: {
        backgroundColor: '#212E40',
        padding: 20,
        borderRadius: 10,
        borderColor: '#80F26D',
        borderWidth: 1,
    },
    label: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 6,
    },
    labelMax: {
        fontSize: 20,
        color: '#ccc',
        marginBottom: 6,
    },
    value: {
        color: '#fff',
        fontWeight: 'bold',
    },
    backLink: {
        marginTop: 20,
        alignSelf: 'center',
    },
    backLinkText: {
        color: '#80F26D',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
