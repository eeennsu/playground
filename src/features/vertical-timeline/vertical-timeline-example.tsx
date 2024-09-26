'use client'

import { MY_HISTORY } from '@/shared/constants/my-history'
import type { FC } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import { VerticalTimelineItem } from './vertical-timeline-item'

export const VerticalTimelineExample: FC = () => {
    return (
        <VerticalTimeline>
            {MY_HISTORY.map((history, idx) => (
                <VerticalTimelineItem
                    key={idx}
                    isCurrent={idx === 0}
                    {...history}
                />
            ))}
        </VerticalTimeline>
    )
}
