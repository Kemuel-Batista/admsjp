import { Row } from '@tanstack/react-table'
import { useState } from 'react'
import { toast } from 'sonner'

import { Lineaction } from '@/components/datagrid'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ConfirmShirtPickupService } from '../services/confirm-shirt-pickup'
import { EventTicket } from '../types/event-ticket'

export function ConfirmShirtPickup({
  lineaction,
  row,
}: {
  lineaction: Lineaction
  row: Row<EventTicket>
}) {
  const [open, setOpen] = useState(false)

  const { icon: Icon } = lineaction

  const { original: ticket } = row

  const { mutateAsync } = ConfirmShirtPickupService()

  async function handleConfirmShirtPickup() {
    await mutateAsync(ticket.id, {
      onSuccess() {
        toast.success('Camisa retirada com sucesso!')
        setOpen(!open)
      },
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 px-2 py-1.5 text-sm">
        {Icon ? (
          <Icon
            style={{
              width: 16,
              height: 16,
            }}
          />
        ) : undefined}
        {lineaction.label}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar retirada da camisa?</DialogTitle>
          <DialogDescription>Essa ação não pode ser desfeita</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mobile:gap-2">
          <Button onClick={() => setOpen(!open)} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmShirtPickup}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
