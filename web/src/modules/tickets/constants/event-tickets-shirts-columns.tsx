import { ColumnDef } from '@tanstack/react-table'

import { EventTicketStatus } from '../components/event-ticket-status'
import { EventTicket } from '../types/event-ticket'

export const EventTicketsShirtsColumns = (): ColumnDef<EventTicket>[] => {
  return [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'phone',
      header: 'Telefone',
    },
    {
      accessorKey: 'email',
      header: 'E-mail',
    },
    {
      accessorKey: 'shirtSize',
      header: 'Tamanho da Camisa',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: EventTicketStatus,
    },
  ]
}
