import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { CancelEventTicketsFormData } from '../schemas/cancel-tickets-schema'

export const CancelEventTicketsService = () => {
  return useMutation<Response, unknown, CancelEventTicketsFormData>({
    mutationFn: async (data) => {
      const response = await api.delete('/events/tickets/cancel', {
        data,
      })

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['event-lots'],
      })
    },
  })
}
