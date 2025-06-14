import { useLocalSearchParams, Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { clients } from '../data/clients';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesCliente() {
    const { id } = useLocalSearchParams();
    const cliente = clients.find(c => c.id === id);
    const router = useRouter();

    if (!cliente) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cliente não encontrado</Text>
                <Link href="/clients" style={styles.backLink}>
                    <Text style={styles.backLinkText}>Voltar</Text>
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#80F26D" />
                </TouchableOpacity>
                <Text style={styles.title}>Detalhes do Cliente</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.titleMin}>Identificação</Text>
                <Text style={styles.label}>Fantasia: <Text style={styles.value}>{cliente.fantasia}</Text></Text>
                <Text style={styles.label}>Razão Social: <Text style={styles.value}>{cliente.razaosocial}</Text></Text>
                <Text style={styles.label}>CNPJ/CPF: <Text style={styles.value}>{cliente.cnpjcpf}</Text></Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.titleMin}>Endereço</Text>
                <Text style={styles.label}>Logradouro: <Text style={styles.value}>{cliente.endereco}</Text></Text>
                <Text style={styles.label}>Bairro: <Text style={styles.value}>{cliente.bairro}</Text></Text>
                <Text style={styles.label}>Cidade: <Text style={styles.value}>{cliente.cidade}</Text></Text>
                <Text style={styles.label}>Estado: <Text style={styles.value}>{cliente.estado}</Text></Text>
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
    titleMin: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#80F26D',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#212E40',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#80F26D',
        borderWidth: 1,
    },
    label: {
        fontSize: 16,
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
