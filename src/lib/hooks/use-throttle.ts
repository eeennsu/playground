import { useRef } from 'react'

export const useThrottle = (callback: (...args: any[]) => void, limit: number) => {
    const lastCallRef = useRef<number | null>(null)

    return (...args: any[]) => {
        const now = Date.now()

        if (lastCallRef.current === null || now - lastCallRef.current > limit) {
            callback(...args)
            lastCallRef.current = now
        }
    }
}
