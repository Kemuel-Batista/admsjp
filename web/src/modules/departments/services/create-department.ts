import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { CreateDepartmentFormData } from '../schemas/create-validation-schema'

export const CreateDepartmentService = () => {
  return useMutation<Response, unknown, CreateDepartmentFormData>({
    mutationFn: async (data) => {
      const response = await api.post('/departments', {
        data,
      })

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      })
    },
  })
}
