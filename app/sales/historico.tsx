import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HistoricoVendas() {
    const [vendas, setVendas] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const carregarVendas = async () => {
            try {
                const vendasJSON = await AsyncStorage.getItem('@vendas');
                if (vendasJSON) {
                    setVendas(JSON.parse(vendasJSON));
                }
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
            }
        };

        carregarVendas();
    }, []);

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <View style={styles.card}>
            <Text style={styles.title}>Pedido #{index + 1}</Text>
            <Text style={styles.label}>Cliente: <Text style={styles.value}>{item.cliente?.fantasia || 'Não informado'}</Text></Text>
            <Text style={styles.label}>Razão Social: <Text style={styles.value}>{item.cliente?.razaosocial || 'Não informado'}</Text></Text>

            {item.produtos.map((prod: any, i: number) => (
                <Text key={i} style={styles.produto}>
                    - {prod.nome} x {prod.quantidade} = R$ {prod.total.toFixed(2)}
                </Text>
            ))}

            <Text style={styles.subtotal}>Subtotal: R$ {item.subtotal.toFixed(2)}</Text>
            <Text style={styles.desconto}>Desconto: R$ {item.desconto.toFixed(2)}</Text>
            <Text style={styles.total}>Total: R$ {item.total.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#80F26D" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Histórico de Vendas</Text>
            </View>

            <FlatList
                data={vendas}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191F26',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    backButton: {
        zIndex: 1,
    },
    headerTitle: {
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#80F26D',
    },
    card: {
        backgroundColor: '#212E40',
        borderColor: '#80F26D',
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    title: {
        color: '#80F26D',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    label: {
        color: '#ccc',
        fontSize: 14,
    },
    value: {
        color: '#fff',
        fontWeight: 'bold',
    },
    produto: {
        color: '#fff',
        fontSize: 14,
        marginTop: 4,
    },
    subtotal: {
        marginTop: 8,
        color: '#ccc',
    },
    desconto: {
        color: '#ccc',
    },
    total: {
        marginTop: 4,
        fontWeight: 'bold',
        color: '#80F26D',
    },
});
