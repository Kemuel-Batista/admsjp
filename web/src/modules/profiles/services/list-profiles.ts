import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { Profile } from '../types/profile'

export interface ListProfileServiceResponse {
  profiles: Profile
}

export const ListProfileService = (params: PaginateParams) => {
  return usePaginateQuery<ListProfileServiceResponse>(
    'profiles',
    '/profile',
    params,
  )
}
