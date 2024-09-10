import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import { Company, User } from '@/shared/excel'

export const POST = async (request: NextRequest) => {
    let { users, companies } = (await request.json()) as { users: User[]; companies: Company[] }

    const wb = new ExcelJS.Workbook()

    const ws1 = wb.addWorksheet('유저 목록', {
        pageSetup: {
            paperSize: 9,
            orientation: 'landscape',
            horizontalCentered: true,
        },
        headerFooter: {
            firstHeader: 'Hello ExcelJS Header',
            firstFooter: 'Hello ExcelJS Footer',
        },
        properties: {
            tabColor: {
                argb: '',
            },
        },
        views: [
            {
                showGridLines: false,
            },
            {
                state: 'frozen',
                xSplit: 1,
                ySplit: 1,
            },
        ],
    })

    ws1.pageSetup.margins = {
        left: 0.25,
        right: 0.25,
        top: 0.75,
        bottom: 0.75,
        header: 0.3,
        footer: 0.3,
    }

    let rowIndex1 = 1

    ws1.eachRow(() => {
        rowIndex1++
    })

    ws1.pageSetup.printArea = `A1:G${rowIndex1}`

    ws1.columns = [
        {
            header: 'ID',
            key: 'id',
            width: 6,
        },
        {
            header: '이름',
            key: 'name',
            width: 14,
        },
        {
            header: '이메일',
            key: 'email',
            width: 36,
        },
        {
            header: '전화번호',
            key: 'phone',
            width: 36,
        },
        {
            header: '주소',
            key: 'address',
            width: 36,
        },
        {
            header: '도시',
            key: 'city',
            width: 22,
        },
        {
            header: '주',
            key: 'state',
            width: 18,
        },
    ]

    users.forEach((user) => {
        ws1.addRow(user)
    })

    ws1.getRow(1).font = { bold: true, color: { argb: '0000FF' }, size: 12, family: 1 }
    ws1.getRow(1).border = {
        bottom: { style: 'medium', color: { argb: '000000' } },
    }
    ws1.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    ws1.getRow(1).height = 28

    ws1.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' }
    ws1.getColumn(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e6f0fe' } }

    setCellWidth({ ws: ws1 })

    const ws2 = wb.addWorksheet('회사 목록', {
        pageSetup: {
            paperSize: 9,
            orientation: 'landscape',
            horizontalCentered: true,
        },
    })

    ws2.columns = [
        { header: 'ID', key: 'id', width: 6 },
        { header: '이름', key: 'name' },
        { header: '도메인', key: 'domain' },
        { header: '전화번호', key: 'phone' },
        { header: '주소', key: 'address' },
        { header: '도시', key: 'city' },
        { header: '주', key: 'state' },
    ]

    companies.forEach((company) => {
        ws2.addRow(company)
    })

    ws2.getRow(1).font = { bold: true, color: { argb: '0000FF' }, size: 12, family: 1 }
    ws2.getRow(1).border = {
        bottom: { style: 'medium', color: { argb: '000000' } },
    }

    ws2.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    ws2.getRow(1).height = 28

    ws2.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' }
    ws2.getColumn(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e6f0fe' } }

    setCellWidth({ ws: ws2 })

    let lowIndex2 = 1

    ws2.eachRow(() => {
        lowIndex2++
    })

    ws2.pageSetup.printArea = `A1:G${lowIndex2}`

    const buffer = await wb.xlsx.writeBuffer()

    return new NextResponse(buffer, {
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="users.xlsx"',
        },
    })
}

export const setCellWidth = ({
    ws,
    ignoreIndex = 0,
    minLength = 10,
    paddingX = 4,
}: {
    ws: ExcelJS.Worksheet
    ignoreIndex?: number
    minLength?: number
    paddingX?: number
}) => {
    ws.columns.forEach((column, i) => {
        let maxLength = 0

        column.eachCell?.({ includeEmpty: true }, (cell) => {
            const columnLength = cell.value?.toString().length || minLength

            if (columnLength > maxLength) {
                maxLength = columnLength
            }
        })

        if (i !== ignoreIndex) {
            column.width = Math.max(minLength, maxLength + paddingX)
        }
    })
}
