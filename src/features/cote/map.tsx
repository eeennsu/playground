import type { FC } from 'react'

export const Map: FC = () => {
    const customMap = map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    console.log(customMap)

    return <div>map</div>
}

const map = <T,>(arr: T[], callback?: (element: T, index: number, arr: T[]) => T) => {
    if (!arr?.length) {
        return []
    }

    if (!callback) return arr

    const result = []

    for (let i = 0; i < arr.length; i++) {
        const element = callback(arr[i], i, arr)

        result.push(element)
    }

    return result
}
