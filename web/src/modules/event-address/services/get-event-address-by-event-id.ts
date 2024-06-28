import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { EventAddress } from '../types/event-address'

export interface GetEventAddressByEventIdServiceResponse {
  eventAddress: EventAddress
}

export const GetEventAddressByEventIdService = (id?: string) => {
  return useQuery({
    queryKey: ['event-details', id],
    queryFn: async () => {
      const response = await api.get<GetEventAddressByEventIdServiceResponse>(
        `/events/address/event/${id}`,
      )

      return response.data
    },
    enabled: Boolean(id),
  })
}
