import { Link, Stack } from 'expo-router';
import { View, StyleSheet, Text, Button  } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops! Essa página ainda não existe" }} />
            <View style={styles.container}>
                <Text>Página não encontrada!</Text>
                <Link style={styles.text} href="/home">Volte a página Home</Link>
                
            </View> 
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191F26',
        padding: 16,
    },
    text: {
        color: '#fff',
    },
});
