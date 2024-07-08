'use client'

import { Eye, Plus } from 'lucide-react'

import { Datagrid, Lineaction } from '@/components/datagrid'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/modules/admin/components/sidebar'

import { EventTicketsSheet } from '../../purchase/components/event-purchases-sheet'
import { EventViewSheet } from '../components/event-view-sheet'
import { EventsColumns } from '../constants/events-columns'
import { ListEventService } from '../services/list-events'

export function ListAdminEventsView() {
  const lineactions: Lineaction[] = [
    {
      label: 'Visualizar',
      icon: Eye,
      component: EventViewSheet,
    },
    {
      label: 'Inscrições',
      icon: Eye,
      component: EventTicketsSheet,
    },
  ]

  return (
    <main className="gap-4 space-y-4">
      <Sidebar />
      <div className="flex flex-col mx-5 mt-24 sm:ml-[300px] sm:mt-3 gap-5">
        <Header title="Eventos" />

        <Button size="sm" className="gap-2 max-w-fit">
          <Plus />
          Criar novo evento
        </Button>

        <Datagrid
          title="Eventos"
          columns={EventsColumns()}
          service={ListEventService}
          lineactions={lineactions}
          massactions={[]}
          source="/event"
          module="events"
        />
      </div>
    </main>
  )
}
