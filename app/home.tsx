import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from './contexts/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams, Link } from 'expo-router';
import PrecoFormatado from './components/PrecoFormat';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const { user, logout } = useAuth();
    const [totalVendas, setTotalVendas] = useState(0);
    const [quantidadeVendas, setQuantidadeVendas] = useState(0);
    const [progressoMeta, setProgressoMeta] = useState(0);
    const META_MENSAL = 400000; 

    useFocusEffect(
    React.useCallback(() => {
        const carregarTotais = async () => {
        try {
            const vendasJson = await AsyncStorage.getItem('@vendas');
            const vendas = vendasJson ? JSON.parse(vendasJson) : [];

            const total = vendas.reduce((soma: number, venda: any) => soma + venda.total, 0);
            setTotalVendas(total);
            setQuantidadeVendas(vendas.length);

            const progresso = (total / META_MENSAL) * 100;
            setProgressoMeta(progresso > 100 ? 100 : progresso); 
            
        } catch (error) {
            console.error('Erro ao carregar vendas:', error);
        }
        };

        carregarTotais();
    }, [])
    );

    function getMesAnoAtual() {
        const agora = new Date();
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const mes = meses[agora.getMonth()];
        const ano = agora.getFullYear();
        return `${mes}, ${ano}`;
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Distribuidora Tech</Text>
                <Text style={styles.headerSubtitle}>Bem vindo(a), {user?.name}!</Text>
            </View>

            <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/sales/clients')}>
                <Ionicons name="cart" size={24} color="#212E40" style={{ marginRight: 10 }} />
                <Text style={styles.mainButtonText}>Novo Pedido</Text>
            </TouchableOpacity>

            <View style={styles.grid}>
                <TouchableOpacity style={styles.gridButton} onPress={() => router.push('/clients')}>
                    <Text style={styles.gridButtonText}>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridButton} onPress={() => router.push('/products')}>
                    <Text style={styles.gridButtonText}>Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridButton} onPress={() => {}}>
                    <Text style={styles.gridButtonText}>Sincronizar Dados</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridButton} onPress={() => router.push('/sales/historico')}>
                    <Text style={styles.gridButtonText}>Histórico de Vendas</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Total em Vendas</Text>
                    <Text style={styles.statValue}>
                        R$ {totalVendas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Quant. de Vendas</Text>
                    <Text style={styles.statValue}>{quantidadeVendas}</Text>
                </View>
            </View>

            <View style={styles.goalContainer}>
                <Text style={styles.statLabel}>Meta Mensal: <PrecoFormatado valor={META_MENSAL}></PrecoFormatado></Text>
                <Text style={styles.statLabel}>Ticket Médio: <PrecoFormatado valor={totalVendas/quantidadeVendas}></PrecoFormatado></Text>

                <Text style={styles.statLabel}>{getMesAnoAtual()}</Text>

                <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progressoMeta}%` }]} />
                </View>
                <Text style={styles.progressLabel}>{Math.round(progressoMeta)}%</Text>

                
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Sair</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#191F26',
        flexGrow: 1,
    },
    header: {
        backgroundColor: '#212E40',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'white',
        marginTop: 5,
    },
    mainButton: {
        flexDirection: 'row',
        backgroundColor: '#80F26D',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    mainButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212E40',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
        
    },
    gridButton: {
        backgroundColor: '#80F26D',
        width: '48%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    gridButtonText: {
        fontSize: 16,
        color: '#212E40',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        backgroundColor: '#212E40',
        width: '48%',
        padding: 15,
        borderRadius: 10,
        borderColor:'#80F26D',
        borderWidth: 1,
    },
    statLabel: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
        
    },
    statValue: {
        color: '#80F26D',
        fontSize: 18,
        fontWeight: 'bold',
    },
    goalContainer: {
        backgroundColor: '#212E40',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderColor:'#80F26D',
        borderWidth: 1,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#444',
        borderRadius: 5,
        marginVertical: 10,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#89BF80',
    },
    progressLabel: {
        color: '#89BF80',
        fontSize: 12,
        textAlign: 'right',
    },
    logoutButton: {
        backgroundColor: '#80F26D',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
