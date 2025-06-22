export type DataUpdateType = 'added' | 'deleted' | 'modified'

interface IParsedDelta {
    path: string
    type: DataUpdateType
    from?: any
    to?: any
}

const toPathStr = (pathArr: string[]) => {
    return pathArr
        .map((segment) => (/^\d+$/.test(segment) ? `[${segment}]` : `.${segment}`))
        .join('')
        .replace(/^\./, '')
}

const formatValue = (val: any, indent = 0): string => {
    const pad = '    '.repeat(indent)

    if (val === null || val === undefined) return '없음'
    if (typeof val === 'string') return val === '' ? `''` : val
    if (typeof val !== 'object') return String(val)

    if (Array.isArray(val)) {
        if (val.length === 0) return '[]'

        return `[\n${val.map((v) => `${pad}  ${formatValue(v, indent + 1)}`).join(',\n')}\n${pad}]`
    }

    const keys = Object.keys(val).filter((key) => key !== '_t')
    if (keys.length === 0) return '{}'

    const lines = keys.map((key) => {
        const valueStr = formatValue(val[key], indent + 1)
        return `${pad}    ${key}: ${valueStr}`
    })

    return `{\n${lines.join(',\n')}\n${pad}}`
}

export const parseDelta = (delta: any, path: string[] = []): IParsedDelta[] => {
    const changes: any[] = []

    for (const key in delta) {
        if (key === '_t') continue

        const value = delta[key]
        const currentPath = [...path, key]
        const pathStr = toPathStr(currentPath)

        if (Array.isArray(value)) {
            if (value.length === 2 && typeof value[1] !== 'object') {
                changes.push({ path: pathStr, type: 'modified', from: value[0], to: value[1] })
            } else if (value.length === 3 && value[1] === 0 && value[2] === 0) {
                changes.push({ path: pathStr, type: 'deleted', from: value[0] })
            } else if (value.length === 2 && value[0] === 0) {
                changes.push({ path: pathStr, type: 'added', to: value[1] })
            }
        } else if (typeof value === 'object' && value._t === 'a') {
            for (const idx in value) {
                if (idx === '_t') continue
                const item = value[idx]
                const indexPath = `${pathStr}[${idx.replace('_', '')}]`
                if (Array.isArray(item)) {
                    if (item.length === 1) {
                        changes.push({ path: indexPath, type: 'added', to: item[0] })
                    } else if (item.length === 3 && item[1] === 0 && item[2] === 0) {
                        changes.push({ path: indexPath, type: 'deleted', from: item[0] })
                    } else if (item.length === 2) {
                        changes.push({ path: indexPath, type: 'modified', from: item[0], to: item[1] })
                    }
                }
            }
        } else if (typeof value === 'object') {
            changes.push(...parseDelta(value, currentPath))
        }
    }

    const formattedChanges = changes.map((change) => {
        return {
            ...change,
            from: formatValue(change.from),
            to: formatValue(change.to),
        }
    })

    return formattedChanges
}
