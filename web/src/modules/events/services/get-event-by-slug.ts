import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Event } from '../types/event'

export interface GetEventBySlugServiceResponse {
  event: Event
}

export const GetEventBySlugService: unknown = (slug: string) => {
  return useQuery({
    queryKey: ['event-details', slug],
    queryFn: async () => {
      const response = await api.get<GetEventBySlugServiceResponse>(
        `/events/slug/${slug}`,
      )

      return response.data
    },
    enabled: Boolean(slug),
  })
}
