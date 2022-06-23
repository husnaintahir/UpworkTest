import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native'
import { fonts, fontWeights } from '../../helpers/FontNames'

import { Sizing } from '../../helpers/Sizing'
import Spinner from '../Spinner'

export default function Calories({
    label,
    subLabel,
    iconSrc,
    onPress,
    loading = false,
    spinColor = "#f5794b"
}) {
    return (
        <TouchableOpacity
            style={styles.btn}
            disabled={onPress ? false : true}
            onPress={onPress}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
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
            </View>


            {
                loading
                &&
                <Spinner color={spinColor} size="large" />
            }


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
        alignItems: "center",
        justifyContent: "space-between"
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
