export function createId(): number {
  return Number(`${Date.now()}${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')}`)
}

export function formatDateTime(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const hours = `${date.getHours()}`.padStart(2, '0')
  const minutes = `${date.getMinutes()}`.padStart(2, '0')
  const seconds = `${date.getSeconds()}`.padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function normalizeText(value?: string | null): string {
  return (value ?? '').trim().toLowerCase()
}

export function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

export function downloadTextFile(fileName: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}
