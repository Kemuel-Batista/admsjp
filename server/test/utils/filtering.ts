interface FilterCondition<T> {
  [key: string]:
    | T
    | {
        [operator: string]: T
      }
}

export function applyFilters<T>(
  items: T[],
  filters: FilterCondition<T>[],
): T[] {
  if (!filters || filters.length === 0) {
    return items
  }

  return items.filter((item) =>
    filters.every((filter) =>
      Object.keys(filter).every((key) => {
        const condition = filter[key]
        if (typeof condition === 'object') {
          const [operator, value] = Object.entries(condition)[0]
          switch (operator) {
            case 'equals':
              return item[key] === value
            case 'contains':
              return item[key].includes(value)
            default:
              return true
          }
        } else {
          return item[key] === condition
        }
      }),
    ),
  )
}
