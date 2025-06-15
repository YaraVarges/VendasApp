import { useState } from 'react';
import { View, TextInput, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { SafeContainer } from '../components/SafeContainer';
import { router } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const success = await login(email, password);
            if (success) {
                router.replace('/home');
            } else {
                Alert.alert('Usuário e/ou senha errado!', 'Credenciais inválidas.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha no login');
        }
    };
    /*
        useEffect(() => {
            if (user) {
                router.replace('/home');
            }
        }, [user]);
    */
    return (
        <SafeContainer>
            <View style={styles.container}>
                <Text style={styles.title}>Vendas App</Text>
                <Text style={styles.subtitle}>Acesse sua conta</Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <View style={styles.divider} />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
                />

                <View style={styles.divider} />
                <TouchableOpacity style={styles.button} onPress={handleLogin} >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </SafeContainer>

    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#191F26',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#FFFFFF',
    },
    divider: {
        height: 1,
        backgroundColor: '#191F26',
        marginVertical: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#FFFFFF',
    },
    input: {
        borderWidth: 1,
        borderColor: '#89BF80',
        color: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#212E40',
    },
    button: {
        backgroundColor: '#80F26D',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#212E40',
        fontSize: 24,
        fontWeight: 'bold',
    },
});