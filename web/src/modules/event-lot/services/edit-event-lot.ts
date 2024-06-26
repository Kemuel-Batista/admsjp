import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { EditEventLotFormData } from '../schemas/edit-validation-schema'

export const EditEventLotService = () => {
  return useMutation<Response, unknown, EditEventLotFormData>({
    mutationFn: async (data) => {
      const response = await api.put('/events/lot', {
        data,
      })

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['event-lots'] })
    },
  })
}
