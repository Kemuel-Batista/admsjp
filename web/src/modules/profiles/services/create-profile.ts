import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { CreateProfileFormData } from '../schemas/create-validation-schema'

export const CreateProfileService = () => {
  return useMutation<Response, unknown, CreateProfileFormData>({
    mutationFn: async (data) => {
      const response = await api.post('/profile', {
        data,
      })

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['profiles'],
      })
    },
  })
}
