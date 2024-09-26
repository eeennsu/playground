import { MyHistory } from '@/shared/constants/my-history'
import { useMemo, type FC } from 'react'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import { CodeXml, GraduationCap, IdCard, User } from 'lucide-react'

interface Props extends MyHistory {
    isCurrent?: boolean
}

export const VerticalTimelineItem: FC<Props> = ({ isCurrent = false, title, sub, icon, date, description }) => {
    const Icon = useMemo<JSX.Element>(() => {
        switch (icon) {
            case 'code-xml':
                return <CodeXml />
            case 'id-card':
                return <IdCard />
            case 'graduation-cap':
                return <GraduationCap />
            default:
                return <User />
        }
    }, [icon])

    return (
        <VerticalTimelineElement
            visible
            className='vertical-timeline-element--work'
            date={date}
            dateClassName={`text-lg font-semibold mt-4 ${isCurrent ? 'text-blue-500' : 'text-gray-600'}`}
            contentStyle={{
                background: isCurrent ? 'rgb(33, 150, 243)' : 'rgb(245, 245, 245)',
                color: isCurrent ? '#fff' : '#333',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: isCurrent ? '0 8px 16px rgba(33, 150, 243, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
            }}
            iconStyle={{
                background: isCurrent ? 'rgb(33, 150, 243)' : 'rgb(245, 245, 245)',
                color: isCurrent ? '#fff' : 'rgb(33, 150, 243)',
                marginTop: '20px',
                border: isCurrent ? '4px solid rgb(33, 150, 243)' : '2px solid rgb(33, 150, 243)',
            }}
            contentArrowStyle={{
                marginTop: '16px',
                borderRight: '10px solid',
                borderRightColor: isCurrent ? 'rgb(33, 150, 243)' : 'rgb(245, 245, 245)',
                width: '16px',
                height: '16px',
            }}
            icon={Icon}>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                    <h3 className={`text-2xl font-bold ${isCurrent ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                    <sub className={`text-sm ${isCurrent ? 'text-blue-200' : 'text-gray-500'} mb-4`}>{sub}</sub>
                </div>

                {description && !!description?.length && (
                    <ul className='list-disc list-inside flex flex-col gap-1'>
                        {description?.map((desc, idx) => (
                            <li
                                key={idx}
                                className={`text-base leading-relaxed ${
                                    isCurrent ? 'text-blue-100' : 'text-gray-700'
                                }`}>
                                {desc}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </VerticalTimelineElement>
    )
}
