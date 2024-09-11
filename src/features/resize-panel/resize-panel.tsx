'use client'

import { ResizablePanel, ResizablePanelGroup } from '@/lib/components/resizable'
import type { FC } from 'react'
import { CustomResizableHandle } from './custom-resizable-handle'

export const ResizePanel: FC = () => {
    return (
        <div className='flex-grow'>
            <ResizablePanelGroup
                direction='horizontal'
                tagName='section'>
                <ResizablePanel
                    className='py-6 pl-6'
                    defaultSize={50}
                    minSize={20}
                    onResize={(size) => {
                        console.log(size)
                    }}>
                    <section className='rounded-xl mr-6 bg-slate-400 flex flex-col h-full items-center justify-center text-2xl'>
                        1
                    </section>
                </ResizablePanel>
                <CustomResizableHandle direction='horizontal' />
                <ResizablePanel
                    className='py-6 pr-6'
                    defaultSize={50}
                    minSize={20}>
                    <ResizablePanelGroup direction='vertical'>
                        <ResizablePanel
                            className='px-6 pb-6'
                            defaultSize={50}
                            minSize={26}>
                            <section className='rounded-xl bg-slate-400 flex flex-col h-full items-center justify-center text-2xl'>
                                2
                            </section>
                        </ResizablePanel>
                        <CustomResizableHandle direction='vertical' />
                        <ResizablePanel
                            className='px-6 pt-6'
                            defaultSize={50}
                            minSize={26}>
                            <section className='rounded-xl bg-slate-400 flex flex-col h-full items-center justify-center text-2xl'>
                                3
                            </section>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
