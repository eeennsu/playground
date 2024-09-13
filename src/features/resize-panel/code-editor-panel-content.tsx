'use client'

import { RefObject, type FC } from 'react'
import { Button } from '@/lib/components/button'
import { ExpandIcon, ListCollapseIcon } from 'lucide-react'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { panelDefaultSize, PanelState, rightPanelMinSize } from './resize-panel'

interface Props {
    codeEditorPanelRef: RefObject<ImperativePanelHandle>
    panelState: PanelState
    handleExpand: (panelRef: RefObject<ImperativePanelHandle>, panelKey: keyof PanelState, defaultSize: number) => void
    handleCollapse: (panelRef: RefObject<ImperativePanelHandle>, panelKey: keyof PanelState, minSize: number) => void
}

export const CodeEditorPanelContent: FC<Props> = ({ codeEditorPanelRef, panelState, handleExpand, handleCollapse }) => {
    return (
        <section className='rounded-xl bg-slate-400 flex flex-col h-full p-4 text-2xl'>
            <div className='flex justify-end'>
                {panelState.isCodeEditorCollapsed || panelState.codeEditorPanelSize <= rightPanelMinSize ? (
                    <Button
                        size='icon'
                        onClick={() => handleExpand(codeEditorPanelRef, 'isCodeEditorCollapsed', panelDefaultSize)}>
                        <ExpandIcon className='size-4' />
                    </Button>
                ) : (
                    <Button
                        size='icon'
                        onClick={() => handleCollapse(codeEditorPanelRef, 'isCodeEditorCollapsed', rightPanelMinSize)}>
                        <ListCollapseIcon className='size-4' />
                    </Button>
                )}
            </div>
        </section>
    )
}
