export function getLastInsertedId<T extends { id: number | null }>(
  items: T[],
): number {
  if (items.length === 0 || items[items.length - 1].id === null) {
    return 1
  } else {
    const lastId = items[items.length - 1].id as number
    return lastId + 1
  }
}
