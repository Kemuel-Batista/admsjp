import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export type PaginateParams = {
  pageIndex?: number
  pageSize?: number
  changeAllRecords?: boolean
  id?: string
}

export const usePaginateQuery = <T>(
  queryKey: string | unknown[],
  endpoint: string,
  params: PaginateParams,
  allRecords = false,
): UseQueryResult<T> => {
  const { pageIndex = 0, pageSize = 30, changeAllRecords = false } = params

  allRecords = changeAllRecords

  const result = useQuery<T>({
    queryKey: [queryKey, { pageIndex, pageSize, allRecords }],
    queryFn: async () => {
      const response = await api.get(endpoint, {
        params: { page: pageIndex + 1, pageSize, allRecords },
      })

      return response.data as T
    },
  })

  return result
}
