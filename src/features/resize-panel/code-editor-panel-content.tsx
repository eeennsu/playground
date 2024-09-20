'use client'

import { forwardRef, RefObject } from 'react'
import { Button } from '@/lib/components/button'
import { ExpandIcon, ListCollapseIcon } from 'lucide-react'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { panelDefaultSize, PanelState, rightPanelMinSize } from './resize-panel'

interface Props {
    panelState: PanelState
    handleExpand: (panelRef: RefObject<ImperativePanelHandle>, panelKey: keyof PanelState, defaultSize: number) => void
    handleCollapse: (panelRef: RefObject<ImperativePanelHandle>, panelKey: keyof PanelState, minSize: number) => void
}

export const CodeEditorPanelContent = forwardRef<ImperativePanelHandle, Props>(
    ({ panelState, handleExpand, handleCollapse }, ref) => {
        return (
            <article className='rounded-xl bg-slate-400 flex flex-col h-full p-4 text-2xl'>
                <section className='flex justify-end'>
                    {panelState.isCodeEditorCollapsed || panelState.codeEditorPanelSize <= rightPanelMinSize ? (
                        <Button
                            size='icon'
                            onClick={() =>
                                handleExpand(
                                    ref as RefObject<ImperativePanelHandle>,
                                    'isCodeEditorCollapsed',
                                    panelDefaultSize
                                )
                            }>
                            <ExpandIcon className='size-4' />
                        </Button>
                    ) : (
                        <Button
                            size='icon'
                            onClick={() =>
                                handleCollapse(
                                    ref as RefObject<ImperativePanelHandle>,
                                    'isCodeEditorCollapsed',
                                    rightPanelMinSize
                                )
                            }>
                            <ListCollapseIcon className='size-4' />
                        </Button>
                    )}
                </section>
                <section className='bg-red-200 max-h-full overflow-y-auto'>
                    Lorem1000 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, aspernatur, debitis
                    aliquam dolore labore tempore necessitatibus consequuntur perspiciatis voluptatibus earum nemo minus
                    excepturi exercitationem fugiat minus mol estiae dignissimos, eos eum, laborum repellat. Numquam
                    ipsam ab quae, eligendi corrupti magni eum. Lorem1000 Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Corporis, aspernatur, debitis aliquam dolore labore tempore necessitatibus
                    corrupti magni eum.pturi exercitationem fugiat minus mol estiae dignissimos, eos eum, laborum
                    repellat. Numquam ipsam ab quae, eligendi corrupti magni eum. Lorem1000 Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis, aspernatur, debitis aliquam dolore labore tempore
                    necessitatibuspturi exercitationem fugiat minus mol estiae dignissimos, eos eum, laborum repellat.
                    Numquam ipsam ab quae, eligendi corrupti magni eum. Lorem1000 Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis, aspernatur, debitis aliquam dolore labore tempore
                    necessitatibuspturi exercitationem fugiat minus mol estiae dignissimos, eos eum, laborum repellat.
                    Numquam ipsam ab quae, eligendi corrupti magni eum. Lorem1000 Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis, aspernatur, debitis aliquam dolore labore tempore
                    necessitatibuspturi exercitationem fugiat minus mol estiae dignissimos, eos eum, laborum repellat.
                    Numquam ipsam ab quae, eligendi corrupti magni eum. Lorem1000 Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis, aspernatur, debitis aliquam dolore labore tempore
                    necessitatibuspturi exercitationem fugiat minus mol estiae dignissimos, eos eum, laborum repellat.
                    Numquam ipsam ab quae, eligendi corrupti magni eum. Lorem1000 Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis, aspernatur, debitis aliquam dolore labore tempore
                    necessitatibuspturi exercitationem fugiat minus mol estiae dignissimos, eos eum, laborum repellat.
                    Numquam ipsam ab quae, eligendi corrupti magni eum. Lorem1000 Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis, aspernatur, debitis aliquam dolore labore tempore
                    necessitatibuspturi exercitationem fugiat minus mol estiae dignissimos, eos eum, laborum repellat.
                    Numquam ipsam ab quae, eligendi corrupti magni eum. Lorem1000 Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Corporis, aspernatur, debitis aliquam dolore labore tempore
                    necessitatibus
                </section>
            </article>
        )
    }
)

CodeEditorPanelContent.displayName = 'CodeEditorPanelContent'
