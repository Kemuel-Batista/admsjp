import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { CreateEventPurchaseFormData } from '../schemas/create-validation-schema'

export const CreateEventPurchaseService = () => {
  return useMutation<Response, unknown, CreateEventPurchaseFormData>({
    mutationFn: async (data) => {
      const response = await api.post('/events/purchases', data)

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['event-purchases'],
      })
    },
  })
}
