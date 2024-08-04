export const sleep = (ms: number = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const buildCancelablePromise = <T>(asyncFunction: () => Promise<T>) => {
    let rejected = false
    const { promise, resolve, reject } = Promise.withResolvers<T>()

    const run = () => {
        if (!rejected) {
            asyncFunction().then(resolve).catch(reject)
        }

        return promise
    }

    const cancel = () => {
        rejected = true
        reject(new Error('Promise canceled'))
    }

    return { run, cancel }
}

export const buildCancelableFetch = <T>(
    asyncFunction: (signal?: AbortSignal) => Promise<T>,
) => {
    const controller = new AbortController()

    const run = () => {
        return new Promise<T>((resolve, reject) => {
            const cancelTask = () => reject(new Error('Task canceled'))

            if (controller.signal.aborted) {
                cancelTask()
            }

            asyncFunction().then(resolve).catch(reject)

            controller.signal.addEventListener('abort', cancelTask)
        })
    }

    const cancel = () => {
        controller.abort()
    }

    return { run, cancel }
}
