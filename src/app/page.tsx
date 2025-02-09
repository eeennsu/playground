import { ResizePanel } from '@/features/resize-panel/resize-panel'
import { VerticalTimelineExample } from '@/features/vertical-timeline/vertical-timeline-example'
import { Chunk } from '@/features/cote/chunk'
import { Map } from '@/features/cote/map'
import { Filter } from '@/features/cote/filter'
import { Reduce } from '@/features/cote/reduce'

export default function Home() {
    return (
        <main className='min-h-dvh w-full flex bg-slate-200'>
            <VerticalTimelineExample />
        </main>
    )
}
