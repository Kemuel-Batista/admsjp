import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { CreateEventTicketFormData } from '../schemas/create-validation-schema'

export const CreateEventTicketService = () => {
  return useMutation<Response, unknown, CreateEventTicketFormData>({
    mutationFn: async (data) => {
      const response = await api.post('/events/tickets', {
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
