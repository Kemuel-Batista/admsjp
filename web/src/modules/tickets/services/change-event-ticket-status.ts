import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { ChangeEventTicketStatusFormData } from '../schemas/change-event-ticket-status-schema'

export const ChangeEventTicketStatusService = () => {
  return useMutation<Response, unknown, ChangeEventTicketStatusFormData>({
    mutationFn: async (data) => {
      const response = await api.patch(
        `/events/tickets/change/status/${data.id}`,
        data,
      )

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['event-tickets'],
      })
    },
  })
}
