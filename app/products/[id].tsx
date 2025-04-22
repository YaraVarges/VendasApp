import { useLocalSearchParams, Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { products } from '../data/products';
import PrecoFormatado from '../components/PrecoFormat';


export default function DetalhesProduto() {
    const { id } = useLocalSearchParams();
    const produto = products.find(c => c.id === id);

    if (!produto) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>produto não encontrado</Text>
                <Link href="/products"><Text>Voltar</Text></Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do produto</Text>
            <Text style={styles.text}>ID: {id}</Text>
            <Text style={styles.text}>Nome: {produto.nome}</Text>
            <Text style={styles.text}>Descrição: {produto.descricao}</Text>
            <Text style={styles.text}>Categoria: {produto.categoria}</Text>
            <Text style={styles.text}>Código de Barras: {produto.codigoEAN}</Text>
            <Text style={styles.text}>Preço: <PrecoFormatado valor={produto.preco}></PrecoFormatado></Text>
            <Text style={styles.text}>Estoque: {produto.estoque}</Text>
            {/* Aqui você pode buscar mais dados do produto com base no ID */}


            <Link href="/products" style={styles.backLink}>
                <Text>Voltar para produtos</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
    },
    backLink: {
        marginTop: 20,
        color: '#0066cc',
        textAlign: 'center'
    },
});
