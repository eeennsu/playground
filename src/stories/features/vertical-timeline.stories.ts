import { VerticalTimelineExample } from '@/features/vertical-timeline/vertical-timeline-example'
import { Meta, StoryObj } from '@storybook/react'
import 'react-vertical-timeline-component/style.min.css'

const meta = {
    title: 'features/vertical-timeline',
    component: VerticalTimelineExample,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof VerticalTimelineExample>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        className: 'bg-gray-600',
    },
}


'123'.padEnd