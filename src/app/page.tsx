'use client'

import { create } from 'jsondiffpatch'

import { parseDelta } from '@/lib/utils/jsondiffpatch'
import { useState } from 'react'
import { Button } from '@/lib/components/button'

const jsondiffpatch = create()

const before = {
    user: {
        id: 123,
        name: 'Tom',
        age: 30,
        email: 'tom@example.com',
        isActive: true,
        settings: {
            theme: 'light',
            language: 'en',
            notifications: {
                email: true,
                sms: false,
            },
        },
        roles: ['user'],
        profile: {
            bio: '',
            image: null,
        },
        lastLogin: '2024-06-01T12:00:00Z',
    },
    activity: [
        { id: 1, action: 'login', at: '2024-06-01T12:00:00Z' },
        { id: 2, action: 'update-profile', at: '2024-06-01T13:00:00Z' },
    ],
    preferences: {
        itemsPerPage: 20,
        favorites: ['dashboard', 'reports'],
    },
}
const after = {
    user: {
        id: 123,
        name: 'Tommy', // 이름 변경
        age: 31, // 나이 증가
        email: null, // 이메일 삭제됨
        isActive: false, // 비활성화
        settings: {
            theme: 'dark', // 테마 변경
            language: 'ko', // 언어 변경
            notifications: {
                email: false, // 이메일 알림 끔
                sms: true, // SMS 알림 켬
                push: true, // 새 알림 추가됨
            },
        },
        roles: ['user', 'admin'], // 역할 추가됨
        profile: {
            bio: 'Developer from Korea', // 소개 업데이트
            image: 'https://example.com/image.jpg', // 이미지 추가
        },
        lastLogin: '2025-06-19T10:00:00Z', // 로그인 갱신
    },
    activity: [
        { id: 1, action: 'login', at: '2024-06-01T12:00:00Z' },
        { id: 2, action: 'update-profile', at: '2024-06-01T13:00:00Z' },
        {
            id: 3,
            action: 'change-password',
            at: '2024-06-02T15:00:00Z',
            special: {
                tool: 'GOOGLE',
            },
        }, // 새 활동 추가
    ],
    preferences: {
        itemsPerPage: 50, // 페이지 크기 변경
        favorites: ['dashboard'], // 'reports' 제거됨
        darkMode: true, // 새 설정 추가됨
    },
    system: {
        version: '1.2.0',
        lastUpdated: '2025-06-01T00:00:00Z',
    },
}

const delta = jsondiffpatch.diff(before, after)
const changes = parseDelta(delta)

type DataUpdateType = 'added' | 'deleted' | 'modified'

const badgeStyle: Record<DataUpdateType, string> = {
    added: 'border-green-400 bg-green-50/40',
    deleted: 'border-red-400 bg-red-50/40',
    modified: 'border-blue-400 bg-blue-50/40',
}

const badgeLabel: Record<DataUpdateType, string> = {
    added: '추가',
    deleted: '삭제',
    modified: '수정',
}

const badgeIcon: Record<DataUpdateType, string> = {
    added: '+',
    deleted: '–',
    modified: '~',
}

export function Badge({ type }: { type: DataUpdateType }) {
    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${badgeStyle[type]} text-gray-700 bg-white`}
            style={{ fontFamily: 'monospace' }}>
            <span>{badgeIcon[type]}</span>
            {badgeLabel[type]}
        </span>
    )
}

export default function Home() {
    const [viewMode, setViewMode] = useState<'diff' | 'json'>('diff')
    return (
        <main className='p-4 flex items-start justify-between'>
            <ul className='text-sm text-gray-800 space-y-1 whitespace-pre-wrap'>
                {viewMode === 'diff' &&
                    changes.map((change, index) => {
                        switch (change.type) {
                            case 'modified':
                                return (
                                    <li key={index}>
                                        <Badge type='modified' /> <strong>{change.path}</strong>:{' '}
                                        <span className='text-red-600'>{change.from}</span> →{' '}
                                        <span className='text-green-600'>{change.to}</span>
                                    </li>
                                )
                            case 'added':
                                return (
                                    <li key={index}>
                                        <Badge type='added' /> <strong>{change.path}</strong>:{' '}
                                        <span className='text-green-600'>{change.to}</span>
                                    </li>
                                )
                            case 'deleted':
                                return (
                                    <li key={index}>
                                        <Badge type='deleted' /> <strong>{change.path}</strong>:{' '}
                                        <span className='text-red-600'>{change.from}</span>
                                    </li>
                                )
                            default:
                                return null
                        }
                    })}

                {viewMode === 'json' && <pre className='whitespace-pre-wrap'>{JSON.stringify(delta, null, 2)}</pre>}
            </ul>
            <section className='flex items-center justify-end'>
                <div className='flex items-center gap-2'>
                    <Button onClick={() => setViewMode('diff')}>변경사항 보기</Button>
                    <Button onClick={() => setViewMode('json')}>JSON 보기</Button>
                </div>
            </section>
        </main>
    )
}
