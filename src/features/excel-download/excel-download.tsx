'use client'

import { Button } from '@/lib/components/button'
import { FC, useState } from 'react'
import { saveAs } from 'file-saver'
import { Company } from '@/shared/excel'

export const ExcelDownload: FC = () => {
    const [isDownloading, setIsDownloading] = useState(false)

    const handleExcel = async () => {
        try {
            if (isDownloading) return
            setIsDownloading(true)

            const body = {
                users: dummyUsers,
                companies: dummyCompanies,
            }

            const response = await fetch('/api/excel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            const blob = await response.blob()

            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth() + 1

            saveAs(blob, `${year}년 ${month}월 유저 목록.xlsx`)
        } catch (error) {
            console.error(error)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <>
            <section className='flex flex-col gap-4 border rounded-sm'>
                {dummyUsers.map((user) => (
                    <div
                        key={user.id}
                        className='grid grid-cols-6'>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p>{user.address}</p>
                        <p>{user.city}</p>
                        <p>{user.state}</p>
                    </div>
                ))}
                <br />
                {dummyCompanies.map((company) => (
                    <div
                        key={company.id}
                        className='grid grid-cols-6'>
                        <h2>{company.name}</h2>
                        <p>{company.domain}</p>
                        <p>{company.phone}</p>
                        <p>{company.address}</p>
                        <p>{company.city}</p>
                        <p>{company.state}</p>
                    </div>
                ))}
            </section>
            <Button
                onClick={handleExcel}
                disabled={isDownloading}>
                {isDownloading ? '다운 중..' : '엑셀로 다운로드'}
            </Button>
        </>
    )
}

const dummyUsers = [
    {
        id: 1,
        name: 'Benjamin Warner',
        email: 'halelauren@yahoo.com',
        phone: '650.109.8366',
        address: '07041 Crystal Road',
        city: 'North Michaelfurt',
        state: 'Iowa',
    },
    {
        id: 2,
        name: 'Kevin Miller',
        email: 'alexanderbaker@yahoo.com',
        phone: '749-707-2260x1075',
        address: '144 Mary Cliff Suite 052',
        city: 'Brittanytown',
        state: 'Iowa',
    },
    {
        id: 3,
        name: 'Christopher Larson',
        email: 'harrisadam@preston.info',
        phone: '+1-867-932-9203x6267',
        address: '28791 Jennifer Unions Suite 834',
        city: 'Shawnaborough',
        state: 'Pennsylvania',
    },
    {
        id: 4,
        name: 'Beverly Crosby',
        email: 'bgarcia@fox.info',
        phone: '001-633-554-2551x73043',
        address: '4267 Lynch Orchard',
        city: 'West Rhonda',
        state: 'Maine',
    },
    {
        id: 5,
        name: 'Kristina Young',
        email: 'marquezrandy@hotmail.com',
        phone: '+1-665-340-0575x676',
        address: '638 Turner Loop Suite 859',
        city: 'North Anthony',
        state: 'Ohio',
    },
]

export const dummyCompanies: Company[] = [
    {
        id: 1,
        name: 'Tech Innovators Inc.',
        domain: 'techinnovators.com',
        phone: '555-1234',
        address: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
    },
    {
        id: 2,
        name: 'Global Solutions Ltd.',
        domain: 'globalsolutions.com',
        phone: '555-5678',
        address: '456 Market Road',
        city: 'New York',
        state: 'NY',
    },
    {
        id: 3,
        name: 'Creative Minds Co.',
        domain: 'creativeminds.co',
        phone: '555-8765',
        address: '789 Art Blvd',
        city: 'Los Angeles',
        state: 'CA',
    },
    {
        id: 4,
        name: 'Health First Corp.',
        domain: 'healthfirst.com',
        phone: '555-4321',
        address: '321 Wellness Avenue',
        city: 'Chicago',
        state: 'IL',
    },
    {
        id: 5,
        name: 'Eco Friendly LLC',
        domain: 'ecofriendly.com',
        phone: '555-6789',
        address: '654 Green Way',
        city: 'Seattle',
        state: 'WA',
    },
    {
        id: 6,
        name: 'Finance Experts Group',
        domain: 'financeexperts.com',
        phone: '555-9876',
        address: '987 Money Street',
        city: 'Boston',
        state: 'MA',
    },
    {
        id: 7,
        name: 'Retail Giants',
        domain: 'retailgiants.com',
        phone: '555-3456',
        address: '135 Shopping Plaza',
        city: 'Miami',
        state: 'FL',
    },
    {
        id: 8,
        name: 'Logistics Solutions',
        domain: 'logisticssolutions.com',
        phone: '555-6543',
        address: '246 Transport Lane',
        city: 'Dallas',
        state: 'TX',
    },
    {
        id: 9,
        name: 'Real Estate Pros',
        domain: 'realestatepros.com',
        phone: '555-7890',
        address: '369 Property Blvd',
        city: 'Denver',
        state: 'CO',
    },
    {
        id: 10,
        name: 'Education Masters',
        domain: 'educationmasters.edu',
        phone: '555-0123',
        address: '741 Learning Rd',
        city: 'Atlanta',
        state: 'GA',
    },
]
