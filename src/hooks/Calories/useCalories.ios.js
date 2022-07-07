import { useState, useEffect } from "react";

import moment from 'moment';

import HealthKit, {
    HKQuantityTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import { Sizing } from "../../helpers/Sizing";



const OrangeBarColor = "#f5794b";
const BlueBarColor = "#00a8eb";


const MAIN_BORDER_RADIUS = Sizing(14)
const SUB_BORDER_RADIUS = Sizing(4);

export const useCalories = () => {

    const [chartData, setChartData] = useState(null);
    const [inActiveCals, setInactiveCals] = useState();
    const [workoutCals, setWorkoutCals] = useState();
    const [maxCals, setMaxCals] = useState(0);

    useEffect(() => {
        checkHealthKitAvailability()
    }, [])



    const checkHealthKitAvailability = async () => {

        const isAvailable = await HealthKit.isHealthDataAvailable();
        if (isAvailable) {
            const permission = await HealthKit.requestAuthorization([
                HKQuantityTypeIdentifier.activeEnergyBurned,
                HKQuantityTypeIdentifier.basalEnergyBurned,

            ]);

            if (!permission) {
                alert("You do not have permissions to access the HealthKit, Please enable it from Settings")
                return
            }


            const from_date = moment().startOf('week');
            const to_date = moment().endOf('week');


            const activeEnergyBurned = await HealthKit.queryQuantitySamples(HKQuantityTypeIdentifier.activeEnergyBurned, {
                from: from_date,
                to: to_date,
            })

            const basalEnergyBurned = await HealthKit.queryQuantitySamples(HKQuantityTypeIdentifier.basalEnergyBurned, {
                from: from_date,
                to: to_date,
            })

            const weekStart = moment().startOf('week');


            const createChartData = []

            let inActiveCalsCount = 0;
            let activeCalsCount = 0;
            let maxCalCount = 0;

            for (let i = 1; i <= 7; i++) {


                let _maxCals = 0;

                const label = weekStart.format("ddd")
                const stacks = [];


                const availableActive = activeEnergyBurned.find((item) => {
                    return weekStart.isSame(moment(item.startDate), "date")
                })


                const availableBasal = basalEnergyBurned.find((item) => {
                    return weekStart.isSame(moment(item.startDate), "date")
                })

                if (availableBasal) {

                    _maxCals = _maxCals + availableBasal.quantity;

                    inActiveCalsCount = inActiveCalsCount + availableBasal.quantity

                    stacks.push(
                        {
                            value: availableBasal.quantity,
                            color: OrangeBarColor,


                            borderBottomLeftRadius: MAIN_BORDER_RADIUS,
                            borderBottomRightRadius: MAIN_BORDER_RADIUS,

                            borderTopLeftRadius: SUB_BORDER_RADIUS,
                            borderTopRightRadius: SUB_BORDER_RADIUS,

                        }
                    )
                } else {
                    stacks.push(
                        {
                            value: 0

                        }
                    )
                }

                if (availableActive) {

                    _maxCals = _maxCals + availableActive.quantity;

                    activeCalsCount = activeCalsCount + availableActive.quantity

                    stacks.push(
                        {
                            value: availableActive.quantity,
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
                if (_maxCals > maxCalCount) {
                    maxCalCount = _maxCals
                }

            }

            setChartData(createChartData);
            setInactiveCals(inActiveCalsCount);
            setWorkoutCals(activeCalsCount)
            setMaxCals(maxCalCount);
        }
    }

    return [chartData, inActiveCals, workoutCals, maxCals];
};