import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

export const ConfirmShirtPickupService = () => {
  return useMutation<Response, unknown, string>({
    mutationFn: async (eventTicketId: string) => {
      const response = await api.patch(
        `/events/tickets/shirt/confirm/${eventTicketId}`,
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
