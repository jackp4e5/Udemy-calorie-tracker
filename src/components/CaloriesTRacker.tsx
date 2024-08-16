import { useMemo } from "react"
import { Activity } from "../types"
import CaloryDisplay from "./CaloryDisplay"

export type CaloriTrakerProps = {
    activities: Activity[]
}

export default function CaloriesTraker({ activities }: CaloriTrakerProps) {

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>

            <div className="flex flex-col md:flex-row md:justify-between gap-5 mt-5 items-center">

                <CaloryDisplay
                    calories={caloriesConsumed}
                    text={'Consumidas'}
                />
                <CaloryDisplay
                    calories={caloriesBurned}
                    text={'Ejercicio'}
                />
                <CaloryDisplay
                    calories={netCalories}
                    text={'Diferencia'}
                />

            </div>

        </>
    )
}
