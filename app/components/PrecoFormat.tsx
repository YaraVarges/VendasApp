import React from 'react';
import { Text } from 'react-native';

interface Props {
    valor: number;
}

export default function PrecoFormatado({ valor }: Props) {
    const precoFormatado = valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return <Text>{precoFormatado}</Text>;
}
