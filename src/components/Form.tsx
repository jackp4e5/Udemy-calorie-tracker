import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}
const initialState: Activity = {
    id: uuidv4(),
    category: 0,
    name: "",
    calories: 0,
}

export default function Form({ dispatch, state }: FormProps) {
    const [activity, setactivity] = useState<Activity>(
        initialState
    );

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(activity => activity.id === state.activeId)[0]
            setactivity(selectedActivity)
        }
    }, [state.activeId])

    const handleOnchange = (e: ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setactivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    };

    const isValidActivity = () => {
        const { category, name, calories } = activity
        return name.trim() !== '' && calories > 0 && category > 0
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setactivity({
            ...initialState,
            id: uuidv4()
        }

        )

    }
    return (
        <form onSubmit={handleSubmit} className=" space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Categoria:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    name="category"
                    id="category"
                    value={activity.category}
                    onChange={handleOnchange}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name">Actividad:</label>
                <input
                    type="text"
                    id="name"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej: Comida, Jugo de naranja, ensalada, Ejercicio, pesas, bicicleta"
                    value={activity.name}
                    onChange={handleOnchange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories">Calorias:</label>
                <input
                    type="number"
                    id="calories"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias, Ej: 200"
                    value={activity.calories}
                    onChange={handleOnchange}
                />
            </div>
            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
                disabled={!isValidActivity()}

            />
        </form>
    );
}
