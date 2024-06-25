import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

export const CancelEventPurchaseByExpiredTimeService = () => {
  return useMutation({
    mutationFn: async (purchaseId: string) => {
      await api.delete(`/events/purchases/expired-time/${purchaseId}`)
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['event-purchases'],
      })
    },
  })
}
