// SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
import { useState, useEffect } from "react";
import GoogleFit, { Scopes } from 'react-native-google-fit'
import moment from 'moment';

import { Sizing } from '../../helpers/Sizing';


const OrangeBarColor = "#f5794b";
const BlueBarColor = "#00a8eb";


const MAIN_BORDER_RADIUS = Sizing(14)
const SUB_BORDER_RADIUS = Sizing(4);


export const useCalories = () => {

    const [chartData, setChartData] = useState(null);
    const [inActiveCals, setInactiveCals] = useState();
    const [workoutCals, setWorkoutCals] = useState();

    useEffect(() => {
        checkGoogleFitAvailability()
    }, [])


    const checkGoogleFitAvailability = async () => {
        await GoogleFit.checkIsAuthorized();

        const isAuthorized = GoogleFit.isAuthorized

        // console.log("isAuthorized", isAuthorized);

        if (isAuthorized) {
            getCaloriesData()

        } else {
            const result = await GoogleFit.authorize();
            // console.log(">>>>>> result", result)
            if (result?.success) {
                getCaloriesData()
            }
        }
    }

    const getCaloriesData = async () => {

        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ,
                Scopes.FITNESS_BODY_READ,
                Scopes.FITNESS_HEART_RATE_READ,
            ],
        }

        // GoogleFit.authorize(options)
        //     .then(authResult => {
        //         console.log("........ authResult", authResult)

        //         if (authResult.success) {

        //         } else {

        //         }
        //     })
        //     .catch((error) => {
        //         console.log("........error", error)
        //     })


        const from_date = moment().startOf('week');
        const to_date = moment().endOf('week');

        const startEnd = {
            startDate: from_date,
            endDate: to_date,
            basalCalculation: true
        }


        const cals = await GoogleFit.getDailyCalorieSamples(startEnd);
        // console.log(">>>>>> ", cals)




        const weekStart = moment().startOf('week');
        const createChartData = []

        let inActiveCalsCount = 0;
        let activeCalsCount = 0;

        for (let i = 1; i <= 7; i++) {


            const label = weekStart.format("ddd")
            const stacks = [];


            const activeCals = cals.find((item) => {
                return weekStart.isSame(moment(item.startDate), "date")
            })



            if (activeCals) {

                activeCalsCount = activeCalsCount + activeCals.calorie

                stacks.push(
                    {
                        value: activeCals.calorie,
                        color: BlueBarColor,



                        borderTopLeftRadius: MAIN_BORDER_RADIUS,
                        borderTopRightRadius: MAIN_BORDER_RADIUS,

                        borderBottomLeftRadius: SUB_BORDER_RADIUS,
                        borderBottomRightRadius: SUB_BORDER_RADIUS,

                        marginBottom: 4

                    }
                )

            } else {
                stacks.push(
                    {
                        value: 0,
                    }
                )
            }

            createChartData.push({
                stacks,
                label
            })

            weekStart.add(1, "day")

        }

        setChartData(createChartData);
        setInactiveCals(inActiveCalsCount);
        setWorkoutCals(activeCalsCount)

    }



    return [chartData, inActiveCals, workoutCals]


}