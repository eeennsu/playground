export type User = {
    id: number
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
}

export type Company = {
    id: number
    name: string
    domain: string
    phone: string
    address: string
    city: string
    state: string
}
function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 1; i < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }

    return []
}
