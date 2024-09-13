'use client'

import { RefObject, type FC } from 'react'
import { Button } from '@/lib/components/button'
import { ExpandIcon, ListCollapseIcon } from 'lucide-react'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { leftPanelMinSize, panelDefaultSize, PanelState } from './resize-panel'

interface Props {
    descriptionPanelRef: RefObject<ImperativePanelHandle>
    panelState: PanelState
    handleExpand: (panelRef: RefObject<ImperativePanelHandle>, panelKey: keyof PanelState, defaultSize: number) => void
    handleCollapse: (panelRef: RefObject<ImperativePanelHandle>, panelKey: keyof PanelState, minSize: number) => void
}

export const DescriptionPanelContent: FC<Props> = ({
    descriptionPanelRef,
    panelState,
    handleExpand,
    handleCollapse,
}) => {
    return (
        <section className='rounded-xl mr-6 bg-slate-400 p-4 flex flex-col h-full text-2xl'>
            <div className={cn('flex', panelState.isDescriptionCollapsed ? 'justify-center' : 'justify-end')}>
                {panelState.isDescriptionCollapsed || panelState.descriptionPanelSize <= leftPanelMinSize ? (
                    <Button
                        size='icon'
                        onClick={() => handleExpand(descriptionPanelRef, 'isDescriptionCollapsed', panelDefaultSize)}>
                        <ExpandIcon className='size-4' />
                    </Button>
                ) : (
                    <Button
                        size='icon'
                        onClick={() => handleCollapse(descriptionPanelRef, 'isDescriptionCollapsed', leftPanelMinSize)}>
                        <ListCollapseIcon className='size-4' />
                    </Button>
                )}
            </div>
        </section>
    )
}
