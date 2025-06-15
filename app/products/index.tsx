import { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { products } from '../data/products';
import PrecoFormatado from '../components/PrecoFormat';


export default function ListaProducts() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    //console.log("ROUTER:", router);
    const filteredProducts = products.filter(product =>
        product.nome.toLowerCase().includes(search.toLowerCase()) ||
        product.categoria.toLowerCase().includes(search.toLowerCase()) ||
        product.codigoEAN.toString().includes(search)
    );


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#80F26D" />
                </TouchableOpacity>
                <Text style={styles.title}>Produtos</Text>
            </View>

            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Produto"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/products/${item.id}`)}
                        style={styles.card}
                    >
                        <Text style={styles.cardTitle}>{item.nome}</Text>
                        <Text style={styles.cardText}>EAN: {item.codigoEAN}</Text>
                        <Text style={styles.cardText}>Preço: <PrecoFormatado valor={item.preco}></PrecoFormatado></Text>
                        <Text style={styles.cardText}>Estoque: {item.estoque}</Text>
                    </Pressable>
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#191F26',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        marginBottom: 16,
        position: 'relative',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#80F26D",
    },
    clientItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    card: {
        backgroundColor: '#212E40',
        borderRadius: 10,
        borderWidth: 2, 
        borderStyle: 'solid',
        borderColor: '#89BF80',
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFF',
    },
    cardText: {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 3,
    },
    list: {
        paddingBottom: 20,
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
});