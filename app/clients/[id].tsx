import { useLocalSearchParams, Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { clients } from '../data/clients';

export default function DetalhesCliente() {
    const { id } = useLocalSearchParams();
    const cliente = clients.find(c => c.id === id);

    if (!cliente) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cliente não encontrado</Text>
                <Link href="/clients"><Text>Voltar</Text></Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Cliente</Text>
            <Text style={styles.text}>ID: {id}</Text>
            <Text style={styles.text}>Fantasia: {cliente.fantasia}</Text>
            <Text style={styles.text}>Razão Social: {cliente.razaosocial}</Text>
            <Text style={styles.text}>CNPJ/CPF: {cliente.cnpjcpf}</Text>
            <Text style={styles.text}>Endereço: {cliente.endereco}</Text>



            <Link href="/clients" style={styles.backLink}>
                <Text>Voltar para Clientes</Text>
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
