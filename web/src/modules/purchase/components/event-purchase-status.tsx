import { Badge } from '@/components/ui/badge'

export function EventPurchaseStatus(value: any) {
  const status = value.getValue()

  switch (status) {
    case 0:
      return <Badge>Novo</Badge>
    case 1:
      return <Badge>Aguardando confirmação</Badge>
    case 10:
      return <Badge>Confirmado</Badge>
    case 90:
      return <Badge>Cancelado</Badge>
    case 91:
      return <Badge>Reembolsado</Badge>
    default:
      break
  }
}
