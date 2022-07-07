import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Dimensions,
    Text,
    ScrollView
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { BarChart } from "react-native-gifted-charts";
import Modal from "react-native-modal"

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
import AppButton from '../components/Buttons/AppButton';


const screenWidth = Dimensions.get("window").width - Sizing(32);
const NO_OF_SECTION = 4


export default function Home() {

    const { colors } = useTheme();

    const [chartData, inActiveCals, workoutCals, maxCals] = useCalories();
    const [apiData, setApiData] = React.useState();
    const [popupVisibility, setPopupVisibility] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const stepValue = Math.ceil(maxCals / (NO_OF_SECTION * 100)) * 100;

    const makeApiCall = async () => {
        setLoading(true)
        const data = await api.get('/get?foo1=bar1&foo2=bar2')
            .then(r => r.data)
            .catch(error => {
                console.log(">>>>> error", error)
            })

        setLoading(false)
        setApiData(data);
        setPopupVisibility(true);

    }

    const DataModal = () => {
        return (
            <Modal
                isVisible={popupVisibility}
                style={{ justifyContent: 'flex-end', margin: 0, }}
            >
                <View
                    style={{
                        flex: 0.5,
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        padding: Sizing(12)
                    }}
                >
                    <Text>
                        {JSON.stringify(apiData)}
                    </Text>

                    <AppButton
                        text="Close"
                        onPress={() => {
                            setPopupVisibility(false)
                        }}
                    />

                </View>

            </Modal>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} >
            <StatusBar barStyle={"default"} backgroundColor={colors.primary} />
            <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.background }} >
                <>
                    <Header screenTitle={global.cal_burned} />

                    <View
                        style={[
                            MasterStyles.masterContainer,
                            styles.container,
                        ]}
                    >

                        {
                            chartData ?
                                <>
                                    <BarChart
                                        width={screenWidth}
                                        stackData={chartData}
                                        barWidth={Sizing(18)}
                                        spacing={25}
                                        height={Sizing(300)}
                                        disableScroll={true}
                                        rulesColor={"#ddd"}
                                        xAxisColor={"#ddd"}
                                        yAxisColor={"#ddd"}
                                        dashGap={0}
                                        xAxisLabelTextStyle={styles.axisLabelStyle}
                                        yAxisTextStyle={styles.axisLabelStyle}

                                        noOfSections={NO_OF_SECTION}
                                        stepValue={stepValue}
                                        maxValue={stepValue * NO_OF_SECTION}


                                    />

                                    <Divider marginTop={Sizing(70)} />

                                    <Border />

                                    <Divider marginTop={Sizing(50)} />

                                    <Calories
                                        label={global.in_active_cals_burned}
                                        subLabel={`${Math.round(inActiveCals)} ${global.bpm}`}
                                        iconSrc={Images.inActive}
                                        onPress={makeApiCall}
                                        loading={loading}
                                    />

                                    <Divider marginTop={Sizing(14)} />

                                    <Calories
                                        label={global.workout_cals_burned}
                                        subLabel={`${Math.round(workoutCals)}`}
                                        iconSrc={Images.workout}
                                        onPress={makeApiCall}
                                        loading={loading}
                                        spinColor={colors.primary}
                                    />
                                </>
                                :
                                <Spinner />
                        }

                    </View>
                </>
            </ScrollView>

            {DataModal()}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    axisLabelStyle: { color: "#8d9397", fontSize: Sizing(11) }
})
