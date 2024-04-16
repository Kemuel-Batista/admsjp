import { Prisma } from 'Prisma'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { WhereInput } from '@/core/types/whereInput'

function buildSearchFilter<T extends Prisma.WhereInput>(
  searchParams: ISearchParamDTO[] = [],
): WhereInput<T> {
  if (searchParams.length > 0) {
    const searchFilter = searchParams.reduce((filterObj, param) => {
      const { field, condition, value } = param

      switch (condition) {
        case 'equals':
          filterObj[field] = { equals: value }
          break
        case 'contains':
          filterObj[field] = { contains: value }
          break
        case 'startsWith':
          filterObj[field] = { startsWith: value }
          break
        case 'endsWith':
          filterObj[field] = { endsWith: value }
          break
        case 'lt':
          filterObj[field] = { ...filterObj[field], lt: value }
          break
        case 'lte':
          filterObj[field] = { ...filterObj[field], lte: value }
          break
        case 'gt':
          filterObj[field] = { ...filterObj[field], gt: value }
          break
        case 'gte':
          filterObj[field] = { ...filterObj[field], gte: value }
          break
        case 'in':
          filterObj[field] = {
            in: String(value).split(',').map(Number),
          }
          break
        case 'notIn':
          filterObj[field] = { notIn: value }
          break
        case 'not':
          filterObj[field] = { not: value }
          break
        case 'isNull':
          filterObj[field] = { equals: null }
          break
        case 'isNotNull':
          filterObj[field] = { not: null }
          break
        default:
          break
      }

      return filterObj
    }, {})

    return searchFilter
  }

  return {}
}

export { buildSearchFilter }
