import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { fonts, fontWeights } from '../../helpers/FontNames'

import { Sizing } from '../../helpers/Sizing'

export default function Calories({ label, subLabel, iconSrc, onPress }) {
    return (
        <TouchableOpacity
            style={styles.btn}
            disabled={onPress ? false : true}
            onPress={onPress}
        >

            <Image
                source={iconSrc}
                style={styles.icon}
                resizeMode="contain"
            />
            <Text
                style={styles.label}
            >
                {label}
                <Text style={styles.subLabel} >{`\n${subLabel}`}</Text>

            </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderColor: "#CBD5E0",
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: Sizing(8),
        paddingHorizontal: Sizing(15),
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        width: Sizing(40),
        height: Sizing(40),
        marginRight: Sizing(12)
    },
    label: {
        color: "#6a6f73",
        fontSize: Sizing(14),
        alignSelf: 'center',
        marginVertical: Sizing(10),
    },
    subLabel: {
        fontSize: 22,
        fontWeight: fontWeights.SFProDisplayWeight600,
        color: "#000a"
    }
})
