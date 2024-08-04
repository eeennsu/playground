import { buildCancelableFetch } from '@/lib/utils/promise'
import type { FC } from 'react'

export const AbortController: FC = () => {
    const ret = buildCancelableFetch(async (signal) => {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/todos/1',
            {
                signal
            }
        )
        return response.json()
    })

    ;(async () => {
        try {
            const value = await ret.run()
            console.log('🚀  value:', value)
        } catch (error) {
            console.error(error)
        }
    })()

    setTimeout(() => {
        ret.cancel()
    }, 500)

    return <div>AbortController</div>
}
