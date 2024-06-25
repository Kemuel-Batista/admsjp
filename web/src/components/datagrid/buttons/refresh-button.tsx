import { RefreshCwIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useDatagrid } from '../index'

export const RefreshButton = () => {
  const { result } = useDatagrid()
  const { refetch, isFetching } = result

  return (
    <Button onClick={refetch} disabled={isFetching} variant="ghost">
      <RefreshCwIcon size={24} />
    </Button>
  )
}
