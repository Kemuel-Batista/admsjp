import { Badge } from '@/components/ui/badge'

import { EventPurchaseStatus } from '../enums/event-purchase-status'

interface PurchaseStatusBadgeProps {
  status: number
}

const statusMap: Record<EventPurchaseStatus, { text: string; color: string }> =
  {
    [EventPurchaseStatus.NEW]: { text: 'Novo', color: 'blue' },
    [EventPurchaseStatus.WAITING_CONFIRMATION]: {
      text: 'Aguardando confirmação',
      color: 'orange',
    },
    [EventPurchaseStatus.CONFIRMED]: { text: 'Confirmada', color: 'green' },
    [EventPurchaseStatus.CANCELED]: { text: 'Cancelada', color: 'red' },
    [EventPurchaseStatus.REFUNDED]: { text: 'Reembolsada', color: 'gray' },
  }

export function PurchaseStatusBadge({ status }: PurchaseStatusBadgeProps) {
  const { text, color } = statusMap[status as EventPurchaseStatus] || {
    text: 'Unknown',
    color: 'default',
  }

  return <Badge color={color}>{text}</Badge>
}
