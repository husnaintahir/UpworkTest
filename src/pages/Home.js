import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';


import { Sizing } from "../helpers/Sizing"
import { fonts, fontWeights } from "../helpers/FontNames"

import { Images } from "../assets/images"

import { MasterStyles } from '../styles/MasterStyle';

import { global } from "../constants/strings.json"

export default function Home() {

    const { colors } = useTheme();
    const navigation = useNavigation();



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} >
            <StatusBar barStyle={"default"} backgroundColor={colors.background} />

            <View style={MasterStyles.masterContainer} >



            </View>



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: Sizing(294),
        height: Sizing(69),
        alignSelf: 'center',
        marginTop: Sizing(60),
        marginBottom: Sizing(25),
    },
    title: {
        fontSize: Sizing(16),
        alignSelf: 'center',
        fontFamily: fonts.SFProRegular,
        marginVertical: Sizing(10)
    }
})
