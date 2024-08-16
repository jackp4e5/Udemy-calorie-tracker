import { useMemo } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducer";

type activityLIstProps = {
    activities: Activity[]
    dispatch: React.Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: activityLIstProps) {

    const categoriName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities])
 

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center "> {'Comida y Actividades'}</h2>
            {activities.length === 0 ? <p className="text-center my-5">No hay actividades aún....</p> :
                activities.map(activity => (
                    <div className="px-5 py-10 bg-white mt-5 flex justify-between shadow" key={activity.id}>
                        <div className="space-y-2 relative">
                            <p className={`shadow absolute -top-8 -left-4 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}> {categoriName(+activity.category)}</p>
                            <p className="text-2xl f ont-bold pt-5 "> {activity.name}</p>
                            <p className="font-black text-4xl text-lime-500 "> {activity.calories} {' '}  <span>Calorias</span></p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}>
                                <PencilSquareIcon className="h-8 w-8 text-gray-800 hover:text-blue-500" />
                            </button>
                            <button onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}>
                                <XCircleIcon className="h-8 w-8 text-gray-800 hover:text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
        </>
    )
}