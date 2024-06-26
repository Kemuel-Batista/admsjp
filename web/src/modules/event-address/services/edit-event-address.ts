import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { EditEventAddressFormData } from '../schemas/edit-validation-schema'

export const EditEventAddressService = () => {
  return useMutation<Response, unknown, EditEventAddressFormData>({
    mutationFn: async (data) => {
      const response = await api.put(`/events/address/${data.id}`, {
        data,
      })

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['event-address'] })
    },
  })
}
