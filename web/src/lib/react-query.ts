import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => {
      if (error.code === 'ERR_NETWORK' && !error.response.data) {
        toast.error(error.message)
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      if (error.code === 'ERR_NETWORK' && !error.response.data) {
        toast.error(error.message)
      }
    },
  }),
})
