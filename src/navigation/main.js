import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import { DARK_COLORS, DEFAULT_COLORS } from '../helpers/Colors';



import Home from "../pages/Home"


const Stack = createNativeStackNavigator();


const MainNavigator = () => {

    const defaultTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            ...DEFAULT_COLORS,
        },
    };

    // const darkTheme = {
    //     ...DarkTheme,
    //     colors: {
    //         ...DarkTheme.colors,
    //         ...DARK_COLORS,
    //     },
    // };


    // const theme = state.theme.isDarkMode ? darkTheme : defaultTheme;
    const theme = defaultTheme;

    return (
        <NavigationContainer theme={theme}  >
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">

                <Stack.Screen name="Home" component={Home} />


            </Stack.Navigator>
        </NavigationContainer>
    );

};

export default MainNavigator;