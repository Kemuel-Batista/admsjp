import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

import { CreateManualPaymentFormData } from '../schemas/create-manual-payment-schema'

export const CreateManualPaymentService = () => {
  return useMutation<Response, unknown, CreateManualPaymentFormData>({
    mutationFn: async (data) => {
      const order = new FormData()

      order.append('file', data.image !== null ? data.image : '')

      const response = await api.post(
        `/order/manual/${data.transactionId}`,
        order,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      )

      return response.data
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['event-purchases'],
      })
    },
  })
}
