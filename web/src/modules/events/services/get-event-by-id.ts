import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Event } from '../types/event'

export interface GetEventByIdServiceResponse {
  event: Event
}

export const GetEventByIdService: unknown = (id: number) => {
  return useQuery({
    queryKey: ['event-details', id],
    queryFn: async () => {
      const response = await api.get<GetEventByIdServiceResponse>(
        `/events/${id}`,
      )

      return response.data
    },
    enabled: Boolean(id),
  })
}
