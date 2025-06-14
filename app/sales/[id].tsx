import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesPedido() {
    const { id } = useLocalSearchParams(); // pega o id da venda
    const router = useRouter();
    const [venda, setVenda] = useState<any>(null);


useEffect(() => {
    const carregarVenda = async () => {
    const vendasStr = await AsyncStorage.getItem('@vendas');
    console.log('Todas vendas:', vendasStr); 
    if (vendasStr) {
        const vendas = JSON.parse(vendasStr);
        console.log('Procurando ID:', id); 
        const vendaEncontrada = vendas.find((v: any) => String(v.id) === String(id));
        console.log('Venda encontrada:', vendaEncontrada); 
        setVenda(vendaEncontrada);
    }
};

carregarVenda();
}, [id]);

  const handleSharePDF = async () => {
    if (!venda) return;

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            th { background-color: #f0f0f0; }
            .total { text-align: right; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Pedido ${venda.id}</h1>
          <h3>Cliente</h3>
          <p><strong>Fantasia:</strong> ${venda.cliente.fantasia}</p>
          <p><strong>Razão Social:</strong> ${venda.cliente.razaosocial}</p>
          <p><strong>CNPJ/CPF:</strong> ${venda.cliente.cnpjcpf}</p>
          <p><strong>Endereço:</strong> ${venda.cliente.endereco}</p>

          <h3>Produtos</h3>
          <table>
            <tr><th>Produto</th><th>Qtd</th><th>Preço</th><th>Total</th></tr>
            ${venda.produtos.map((p: any) => `
              <tr>
                <td>${p.nome}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td>R$ ${(p.quantidade * p.preco).toFixed(2)}</td>
              </tr>`).join('')}
          </table>

          <p class="total">Subtotal: R$ ${venda.subtotal.toFixed(2)}</p>
          <p class="total">Desconto: R$ ${venda.desconto.toFixed(2)}</p>
          <p class="total"><strong>Total: R$ ${venda.total.toFixed(2)}</strong></p>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      alert('Compartilhamento não disponível neste dispositivo');
    }
  };

  if (!venda) return <Text style={styles.loading}>Carregando detalhes...</Text>;

  return (
    <View contentContainerStyle={styles.scrollContent} style={styles.scroll}>
      
      <View style={styles.header}>
        <View style={styles.side}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#80F26D" />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>Detalhes do Pedido #{venda.id}</Text>
        </View>
        <View style={styles.side} />
      </View>

    
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scroll}>
 
      <View style={styles.section}>
        <Text style={styles.label}>Fantasia: <Text style={styles.value}>{venda.cliente.fantasia}</Text></Text>
        <Text style={styles.label}>Razão Social: <Text style={styles.value}>{venda.cliente.razaosocial}</Text></Text>
        <Text style={styles.label}>CNPJ/CPF: <Text style={styles.value}>{venda.cliente.cnpjcpf}</Text></Text>
        <Text style={styles.label}>Endereço: <Text style={styles.value}>{venda.cliente.endereco}</Text></Text>
      </View>

      <View style={styles.section}>
        {venda.produtos.map((p: any, i: number) => (
          <Text key={i} style={styles.produto}>
            - {p.nome} x {p.quantidade} = R$ {(p.preco * p.quantidade).toFixed(2)}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.total}>Subtotal: R$ {venda.subtotal.toFixed(2)}</Text>
        <Text style={styles.total}>Desconto: R$ {venda.desconto.toFixed(2)}</Text>
        <Text style={[styles.total, { color: '#80F26D' }]}>Total: R$ {venda.total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSharePDF}>
        <Text style={styles.buttonText}>Compartilhar em PDF</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#191F26',
    flex: 1, 
  },
  scroll: {
    flex: 1,
    backgroundColor: '#191F26',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  loading: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  marginTop: 20,
  marginBottom: 10,
},
side: {
  width: 32, 
  alignItems: 'center',
  justifyContent: 'center',
},
center: {
  flex: 1,
  alignItems: 'center',
},
title: {
  color: '#80F26D',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
},
  backButton: {
    marginBottom: 20,
    zIndex: 1,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontWeight: 'bold',
  },
  produto: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 2,
  },
  total: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#80F26D',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#212E40',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
