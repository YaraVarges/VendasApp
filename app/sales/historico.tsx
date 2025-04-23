import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoricoVendas() {
    const [vendas, setVendas] = useState<any[]>([]);

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
            <Text>Cliente Nome: {item.cliente?.fantasia || 'Não informado'}</Text>
            <Text>Cliente Razão Social: {item.cliente?.razaosocial || 'Não informado'}</Text>

            {item.produtos.map((prod: any, i: number) => (
                <Text key={i}>
                    - {prod.nome} x {prod.quantidade} = R$ {(prod.total).toFixed(2)}
                </Text>
            ))}

            <Text style={styles.total}>Subtotal: R$ {item.subtotal.toFixed(2)}</Text>
            <Text style={styles.total}>Desconto: R$ {item.desconto.toFixed(2)}</Text>
            <Text style={styles.total}>Total: R$ {item.total.toFixed(2)}</Text>
        </View>
    );

    return (
        <FlatList
            data={vendas}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 16,
    },
    total: {
        marginTop: 4,
        fontWeight: '600',
    },
});
