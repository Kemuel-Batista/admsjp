import { Row } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { Lineaction } from '@/components/datagrid'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { env } from '@/env'
import { EventPurchaseStatus } from '@/modules/purchase/enums/event-purchase-status'
import { ConfirmEventPurchaseService } from '@/modules/purchase/services/confirm-event-purchase'
import { EventPurchaseWithOrder } from '@/modules/purchase/types/event-purchase-with-order'

export function OrderViewSheet({
  lineaction,
  row,
}: {
  lineaction: Lineaction
  row: Row<EventPurchaseWithOrder>
}) {
  const [open, setOpen] = useState(false)

  const { icon: Icon } = lineaction

  const { original: purchase } = row

  const attachment = purchase?.order?.attachment
  const isPdf = attachment?.toLowerCase().endsWith('.pdf')

  const { mutateAsync, isPending } = ConfirmEventPurchaseService()

  async function handleConfirmEventPurchase() {
    await mutateAsync(purchase.id, {
      onSuccess: () => {
        toast.success('Inscrição confirmada com sucesso!')
        setOpen(!open)
      },
    })
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className="flex items-center gap-2 px-2 py-1.5 text-sm">
        {Icon ? (
          <Icon
            style={{
              width: 16,
              height: 16,
            }}
          />
        ) : undefined}
        {lineaction.label}
      </SheetTrigger>
      <SheetContent className="grid gap-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Comprovante de pagamento da compra</SheetTitle>
          <SheetDescription>
            Segue abaixo os detalhes do pagamento da compra realizada
          </SheetDescription>
        </SheetHeader>
        {isPdf ? (
          <div className="flex flex-col gap-2">
            <Label>
              Este é um PDF. Por favor, clique abaixo para ver o arquivo
            </Label>
            <Button>
              <a
                href={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${attachment}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Clique aqui para ver o arquivo
              </a>
            </Button>
          </div>
        ) : (
          <Image
            src={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${attachment}`}
            className="w-full"
            alt="Comprovante"
            unoptimized
            width={300}
            height={24}
          />
        )}
        {purchase.status === EventPurchaseStatus.WAITING_CONFIRMATION && (
          <Button onClick={handleConfirmEventPurchase} disabled={isPending}>
            {isPending ? <Icons.spinner /> : 'Validar inscrição'}
          </Button>
        )}
      </SheetContent>
    </Sheet>
  )
}
