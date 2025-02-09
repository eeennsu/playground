'use client'

import { MY_HISTORY } from '@/shared/constants/my-history'
import type { FC } from 'react'
import { VerticalTimeline, VerticalTimelineProps } from 'react-vertical-timeline-component'
import { VerticalTimelineItem } from './vertical-timeline-item'

interface Props extends VerticalTimelineProps {}

export const VerticalTimelineExample: FC<Props> = ({ ...props }) => {
    return (
        <VerticalTimeline {...props}>
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
