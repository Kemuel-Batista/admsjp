import { Badge } from '@/components/ui/badge'

import { EnumEventTicketStatus } from '../enums/event-ticket-status'

export function EventTicketStatus(value: any) {
  const status = value.getValue()

  switch (status) {
    case EnumEventTicketStatus.NEW:
      return <Badge>Novo</Badge>
    case EnumEventTicketStatus.IN_SEPARATION:
      return <Badge>Em separação</Badge>
    case EnumEventTicketStatus.SEPARATED:
      return <Badge>Separado</Badge>
    case EnumEventTicketStatus.DELIVERED:
      return <Badge>Entregue</Badge>
    case EnumEventTicketStatus.USED:
      return <Badge>Usado</Badge>
    case EnumEventTicketStatus.CANCELED:
      return <Badge>Cancelado</Badge>
    default:
      break
  }
}
