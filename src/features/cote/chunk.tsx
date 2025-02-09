import type { FC } from 'react'

export const Chunk: FC = () => {
    const answer = chunk([1, 2, 3, 4, 5], 3)

    console.log(answer)

    return <div>Chunk</div>
}

const chunk = <T,>(arr: T[], size = 1) => {
    if (!arr.length || size < 1) {
        return []
    }

    const chunks: T[][] = []

    for (let i = 0; i < arr.length; i += size) {
        console.log('i', i)
        const element = arr.slice(i, i + size)

        chunks.push(element)
    }

    return chunks
}
