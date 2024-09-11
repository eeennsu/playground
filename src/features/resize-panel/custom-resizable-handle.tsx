import { ResizableHandle } from '@/lib/components/resizable'
import { cn } from '@/lib/shadcn/shadcn-utils'
import type { FC } from 'react'

interface Props {
    direction: 'horizontal' | 'vertical'
}

export const CustomResizableHandle: FC<Props> = ({ direction }) => {
    return (
        <ResizableHandle
            withHandle
            className={cn(
                'rounded-sm border-2 border-dashed border-gray-900',
                direction === 'horizontal' ? 'w-3' : ' min-h-3'
            )}
            withHandleClassName={cn('bg-gray-500 h-[80px] min-w-[22px]', direction === 'vertical' && 'rotate-90')}
        />
    )
}
