import { IListOptions } from '@/core/repositories/list-options'

interface ICalcPaginationReturn {
  skip: number | undefined
  take: number | undefined
}

export function calcPagination(
  options: IListOptions = {},
): ICalcPaginationReturn {
  let { page = 1, pageSize = 30, allRecords = false } = options

  if (allRecords !== null) {
    return { skip: undefined, take: undefined }
  }

  const maxResultsPerPage = 20

  pageSize = Math.min(pageSize, maxResultsPerPage)

  const skip = (page - 1) * pageSize
  const take = pageSize

  return { skip, take }
}
