import sanitize from 'sanitize-filename'

export function cleanString(str: string) {
    return sanitize(str.toLocaleLowerCase())
}
