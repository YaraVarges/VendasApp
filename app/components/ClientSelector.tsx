import { FlatList, TouchableOpacity, Text, Modal, View, TextInput } from 'react-native';
import { useState } from 'react';
import { clients } from '../data/clients';

export default function ClientSelector({ onSelect, selectedClient }) {
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState('');

    const filteredClients = clients.filter(client =>
        client.razaosocial.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    padding: 16,
                    borderRadius: 8,
                }}
                onPress={() => setIsVisible(true)}
            >
                <Text>
                    {selectedClient ? selectedClient.nome : 'Selecione um cliente...'}
                </Text>
            </TouchableOpacity>

            <Modal visible={isVisible} animationType="slide">
                <View style={{ flex: 1, padding: 16 }}>
                    <TextInput
                        placeholder="Buscar cliente..."
                        value={search}
                        onChangeText={setSearch}
                        style={{
                            borderWidth: 1,
                            borderColor: '#ddd',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 16,
                        }}
                    />

                    <FlatList
                        data={filteredClients}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}
                                onPress={() => {
                                    onSelect(item);
                                    setIsVisible(false);
                                }}
                            >
                                <Text>{item.razaosocial}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity
                        style={{ padding: 16, alignItems: 'center' }}
                        onPress={() => setIsVisible(false)}
                    >
                        <Text style={{ color: 'red' }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}