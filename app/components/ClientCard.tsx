import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ClientCard({
    client,
    onPress,
    showEmail = true,
    showPhone = true,
    customStyle = {}
}) {
    return (
        <TouchableOpacity onPress={() => onPress?.(client)}>
            <View style={[styles.card, customStyle]}>
                <Text style={styles.name}>{client.nome}</Text>
                {showEmail && <Text style={styles.email}>📧 {client.email}</Text>}
                {showPhone && client.telefone && (
                    <Text style={styles.phone}>📞 {client.telefone}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333333',
    },
    email: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 2,
    },
    phone: {
        fontSize: 14,
        color: '#666666',
    },
});