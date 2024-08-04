'use client'

import { buildCancelablePromise, sleep } from '@/lib/utils/promise'
import type { FC } from 'react'

export const PromiseWithResolver: FC = () => {
    const testAsync = async () => {
        await sleep(1000)
        return 'hello'
    }

    const result = buildCancelablePromise<string>(testAsync)

    ;(async () => {
        try {
            const value = await result.run()
            console.log('🚀  value:', value)
        } catch (error) {
            console.error(error)
        }
    })()

    setTimeout(() => {
        result.cancel()
    }, 500)

    return <div>PromiseWithResolver</div>
}
