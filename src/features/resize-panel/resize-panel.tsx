'use client'

import { ResizablePanel, ResizablePanelGroup } from '@/lib/components/resizable'
import { RefObject, useRef, useState, useCallback, type FC } from 'react'
import { CustomResizableHandle } from './custom-resizable-handle'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { useThrottle } from '@/lib/hooks/use-throttle'
import { DescriptionPanelContent } from './description-panel-content'
import { CodeEditorPanelContent } from './code-editor-panel-content'
import { OutputPanelContent } from './output-panel-content'

export const panelDefaultSize = 50
export const leftPanelMinSize = 5
export const rightPanelMinSize = 8

const defaultPanelState = {
    isDescriptionCollapsed: false,
    descriptionPanelSize: panelDefaultSize,
    isCodeEditorCollapsed: false,
    codeEditorPanelSize: panelDefaultSize,
    isOutputCollapsed: false,
    outputPanelSize: panelDefaultSize,
}

export type PanelState = typeof defaultPanelState

export const ResizePanel: FC = () => {
    const descriptionPanelRef = useRef<ImperativePanelHandle>(null)
    const codeEditorPanelRef = useRef<ImperativePanelHandle>(null)
    const outputPanelRef = useRef<ImperativePanelHandle>(null)

    const [panelState, setPanelState] = useState(defaultPanelState)

    const handleExpand = useCallback(
        (panelRef: RefObject<ImperativePanelHandle>, panelKey: keyof PanelState, defaultSize: number) => {
            const panel = panelRef.current
            if (!panel) return

            if (panel.getSize() <= defaultSize) {
                panel.resize(defaultSize)
                setPanelState((prev) => ({
                    ...prev,
                    [panelKey]: false,
                    [`${panelKey}Size`]: defaultSize,
                }))
            }
        },
        []
    )

    const handleCollapse = useCallback(
        (panelRef: RefObject<ImperativePanelHandle>, panelKey: keyof PanelState, minSize: number) => {
            const panel = panelRef.current
            if (!panel) return

            if (panel.getSize() > minSize) {
                panel.resize(minSize)
                setPanelState((prev) => ({
                    ...prev,
                    [panelKey]: true,
                    [`${panelKey}Size`]: minSize,
                }))
            }
        },
        []
    )

    const throttledDescriptionPanelResize = useThrottle((size: number) => {
        setPanelState((prev) => ({
            ...prev,
            descriptionPanelSize: size,
            isDescriptionCollapsed: size <= leftPanelMinSize,
        }))
    }, 10)

    const throttledCodeEditorPanelResize = useThrottle((size: number) => {
        setPanelState((prev) => ({
            ...prev,
            codeEditorPanelSize: size,
            isCodeEditorCollapsed: size <= rightPanelMinSize,
        }))
    }, 10)

    const throttledOutputPanelResize = useThrottle((size: number) => {
        setPanelState((prev) => ({
            ...prev,
            outputPanelSize: size,
            isOutputCollapsed: size <= rightPanelMinSize,
        }))
    }, 10)

    return (
        <div className='flex-grow'>
            <ResizablePanelGroup
                direction='horizontal'
                tagName='section'>
                <ResizablePanel
                    ref={descriptionPanelRef}
                    className='py-6 pl-6 max-h-dvh'
                    minSize={leftPanelMinSize}
                    maxSize={100 - 6.5}
                    defaultSize={panelDefaultSize}
                    collapsedSize={leftPanelMinSize}
                    onResize={(size) => throttledDescriptionPanelResize(size)}
                    collapsible>
                    <DescriptionPanelContent
                        ref={descriptionPanelRef}
                        panelState={panelState}
                        handleExpand={handleExpand}
                        handleCollapse={handleCollapse}
                    />
                </ResizablePanel>
                <CustomResizableHandle direction='horizontal' />
                <ResizablePanel
                    className='py-6 pr-6'
                    defaultSize={panelDefaultSize}>
                    <ResizablePanelGroup direction='vertical'>
                        <ResizablePanel
                            ref={codeEditorPanelRef}
                            className='px-6 pb-6 max-h-dvh'
                            defaultSize={panelDefaultSize}
                            minSize={rightPanelMinSize}
                            collapsedSize={rightPanelMinSize}
                            onResize={(size) => throttledCodeEditorPanelResize(size)}
                            collapsible>
                            <CodeEditorPanelContent
                                ref={codeEditorPanelRef}
                                panelState={panelState}
                                handleExpand={handleExpand}
                                handleCollapse={handleCollapse}
                            />
                        </ResizablePanel>
                        <CustomResizableHandle direction='vertical' />
                        <ResizablePanel
                            ref={outputPanelRef}
                            className='px-6 pt-6 max-h-dvh'
                            defaultSize={panelDefaultSize}
                            minSize={rightPanelMinSize}
                            collapsedSize={rightPanelMinSize}
                            onResize={(size) => throttledOutputPanelResize(size)}
                            collapsible>
                            <OutputPanelContent
                                ref={outputPanelRef}
                                panelState={panelState}
                                handleExpand={handleExpand}
                                handleCollapse={handleCollapse}
                            />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
