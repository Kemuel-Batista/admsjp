import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { CreateEventFormData } from '../schemas/create-validation-schema'

export const CreateEventService = () => {
  return useMutation<Response, unknown, CreateEventFormData>({
    mutationFn: async (data) => {
      const response = await api.post('/events', {
        data,
      })

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
      })
    },
  })
}
