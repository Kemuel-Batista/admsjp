import { MoveLeft, MoveRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const Expander = ({ row }: { row: any }) => {
  if (row.getRowCanExpand) return '-'

  return (
    <Button
      onClick={row.getToggleExpandedHandler()}
      variant={row.getIsExpanded() ? 'default' : 'ghost'}
      size="sm"
      className="hover:bg-gray-100"
    >
      {row.getIsExpanded() ? (
        <MoveRight size={18} color="blue-500" />
      ) : (
        <MoveLeft size={18} />
      )}
    </Button>
  )
}
