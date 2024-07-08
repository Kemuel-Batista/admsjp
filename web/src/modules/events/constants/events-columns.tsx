import { ColumnDef } from '@tanstack/react-table'

import { dateTimeColumn } from '@/components/datagrid/columns/date-time-column'

import { Event } from '../types/event'

export const EventsColumns = (): ColumnDef<Event>[] => {
  return [
    {
      accessorKey: 'title',
      header: 'Titulo',
    },
    {
      accessorKey: 'slug',
      header: 'Abreviação',
    },
    {
      accessorKey: 'createdAt',
      header: 'Criado em',
      ...dateTimeColumn,
    },
  ]
}
