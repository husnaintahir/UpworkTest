import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';

import { Sizing } from "../helpers/Sizing"
import { fonts, fontWeights } from "../helpers/FontNames"

import { Images } from "../../assets/images/icons"

const Header = ({ screenTitle = "" }) => {

    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <View style={[
            { backgroundColor: colors.primary },
            styles.header
        ]} >
            <TouchableOpacity
                onPress={() => {
                    if (navigation?.canGoBack?.()) {
                        navigation?.goBack?.()
                    }
                }}
            >
                <Image
                    source={Images.navBack}
                    style={styles.backIcon}
                />

            </TouchableOpacity>
            <Text style={styles.headerTitle} >{screenTitle}</Text>

            <View style={styles.backIcon} />
        </View>
    )
}

export default Header;


const styles = StyleSheet.create({
    header: {
        height: Sizing(64),
        paddingHorizontal: Sizing(8),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    backIcon: {
        tintColor: "#fff",
        width: Sizing(21),
    },
    headerTitle: {
        fontSize: Sizing(17),
        color: "#fff",
        // fontFamily: fonts.SFProRegular,
        fontWeight: fontWeights.SFProDisplayWeight700
    },
})