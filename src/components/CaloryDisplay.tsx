export type CaloryDisplay = {
    calories: number,
    text: string
}

export default function CaloryDisplay({ calories, text }: CaloryDisplay) {
    return (
        <>
            <p className="text-white font-bolb rounded-full grid grid-cols-1 gap-3 text-center ">
                <span className="font-black text-6xl">
                    {calories}
                </span>
                {text}
            </p>

        </>
    )
}