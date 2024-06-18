import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export type PaginateParams = {
  pageIndex?: number
}

export const usePaginateQuery = <T>(
  queryKey: string | unknown[],
  endpoint: string,
  params: PaginateParams,
): UseQueryResult<T> => {
  const { pageIndex = 0 } = params

  const result = useQuery<T>({
    queryKey: [queryKey, { pageIndex }],
    queryFn: async () => {
      const response = await api.get(endpoint, {
        params: { page: pageIndex + 1 },
      })

      return response.data as T
    },
  })

  return result
}
