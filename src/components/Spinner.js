import { useTheme } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function Spinner({ size = "small", color }) {

    const { colors } = useTheme();

    return (
        <ActivityIndicator color={color || colors.primary} size={size} />
    )
}