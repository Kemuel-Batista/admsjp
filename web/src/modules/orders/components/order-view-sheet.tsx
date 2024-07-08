import { Row } from '@tanstack/react-table'
import Image from 'next/image'

import { Lineaction } from '@/components/datagrid'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { env } from '@/env'
import { EventPurchaseWithOrder } from '@/modules/purchase/types/event-purchase-with-order'

export function OrderViewSheet({
  lineaction,
  row,
}: {
  lineaction: Lineaction
  row: Row<EventPurchaseWithOrder>
}) {
  const { icon: Icon } = lineaction

  const { original: purchase } = row

  return (
    <Sheet>
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
        <Image
          src={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${purchase?.order?.attachment}`}
          className="w-full"
          alt="Comprovante"
          unoptimized
          width={300}
          height={24}
        />
        <Button>Validar inscrição</Button>
      </SheetContent>
    </Sheet>
  )
}
