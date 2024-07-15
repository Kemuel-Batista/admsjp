import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

export const ConfirmEventPurchaseService = () => {
  return useMutation({
    mutationFn: async (purchaseId: string) => {
      await api.patch(`/events/purchases/confirm/${purchaseId}`)
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['event-purchases', 'event-purchases-by-event'],
      })
    },
  })
}
