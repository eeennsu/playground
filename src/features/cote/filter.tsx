import type { FC } from 'react'

export const Filter: FC = () => {
    const answer = filter([1, 2, 3, 4, 5], (item) => item % 2 === 0)

    console.log(answer)

    return <div>Filter</div>
}

const filter = <T,>(arr: T[], callback?: (element: T, index: number, arr: T[]) => boolean) => {
    if (!arr?.length) return []

    if (!callback) return arr

    const result: T[] = []

    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result.push(arr[i])
        }
    }

    return result
}
