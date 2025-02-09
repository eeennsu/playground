import { useCallback, useEffect, useRef, useState, type FC } from 'react'

export const Reduce: FC = () => {
    const answer = [1, 2, 3, 4, 5].reduce<number[]>((prev, next, i) => {
        console.log('i', i)
        console.log('prev', prev)
        console.log('next', next)

        return [...prev, next]
    }, [])

    console.log('answer', answer)

    return <div>reduce</div>
}

const deepClone = (value: any): any => {
    if (typeof value !== 'object') return value

    if (Array.isArray(value)) {
        return value.map((item) => deepClone(item))
    } else {
        let output = {} as Record<string, any>

        for (const key in value) {
            if (typeof value[key] === 'object' && value[key] !== null) {
                output[key] = deepClone(value[key])
            } else {
                output[key] = value[key]
            }
        }

        return output
    }
}
