import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { EditEventFormData } from '../schemas/edit-validation-schema'

export const EditEventService = () => {
  return useMutation<Response, unknown, EditEventFormData>({
    mutationFn: async (data) => {
      const response = await api.put(`/events/${data.id}`, {
        data,
      })

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
