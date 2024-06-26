import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { CompleteEventTicketInfoFormData } from '../schemas/complete-ticket-info-schema'

export const CompleteEventTicketInfoService = () => {
  return useMutation<Response, unknown, CompleteEventTicketInfoFormData>({
    mutationFn: async (data) => {
      const response = await api.post('/events/tickets/info', data)

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['event-purchases', 'event-tickets'],
      })
    },
  })
}
