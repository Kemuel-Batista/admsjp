import { ColumnDef } from '@tanstack/react-table'

import { EventPurchaseStatus } from '../components/event-purchase-status'
import { EventPurchaseWithOrder } from '../types/event-purchase-with-order'

export const EventPurchasesColumns =
  (): ColumnDef<EventPurchaseWithOrder>[] => {
    return [
      {
        accessorKey: 'invoiceNumber',
        header: 'N° da compra',
      },
      {
        accessorKey: 'buyerName',
        header: 'Nome do comprador',
      },
      {
        accessorKey: 'buyerEmail',
        header: 'E-mail do comprador',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: EventPurchaseStatus,
      },
    ]
  }
