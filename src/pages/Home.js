import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Dimensions
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { BarChart } from "react-native-gifted-charts";

import Header from '../components/Header';
import { Divider } from '../components/Divider';
import { Border } from '../components/Border';
import Spinner from "../components/Spinner"
import Calories from "../components/Buttons/Calories";

import { useCalories } from '../hooks/Calories/useCalories';

import { Sizing } from "../helpers/Sizing";
import { api } from "../helpers/ApiManager";


import { MasterStyles } from '../styles/MasterStyle';

import { global } from "../constants/strings.json"
import { Images } from '../../assets/images/icons';


const screenWidth = Dimensions.get("window").width - Sizing(32);



export default function Home() {

    const { colors } = useTheme();

    const [chartData, inActiveCals, workoutCals] = useCalories();


    const makeApiCall = async () => {
        const data = await api.post('/login', {
            login: "1244",
            password: "password"
        })
            .then(r => r.data)
            .catch(error => {
                console.log(">>>>> error", error)
            })

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} >
            <StatusBar barStyle={"default"} backgroundColor={colors.primary} />

            <Header screenTitle={global.cal_burned} />

            <View style={[
                MasterStyles.masterContainer,
                styles.container,
                { backgroundColor: colors.background }
            ]} >


                {
                    chartData ?
                        <>
                            <BarChart
                                width={screenWidth}
                                noOfSections={4}
                                stackData={chartData}
                                barWidth={30}
                                spacing={15}
                                height={300}
                            />

                            <Divider marginTop={70} />

                            <Border />

                            <Divider marginTop={50} />

                            <Calories
                                label={global.in_active_cals_burned}
                                subLabel={`${Math.round(inActiveCals)} ${global.bpm}`}
                                iconSrc={Images.inActive}
                            />

                            <Divider marginTop={14} />

                            <Calories
                                label={global.workout_cals_burned}
                                subLabel={`${Math.round(workoutCals)}`}
                                iconSrc={Images.workout}
                                onPress={makeApiCall}
                            />
                        </>
                        :
                        <Spinner />
                }

            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
