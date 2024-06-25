import { Clock, Eye } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { env } from '@/env'
import { Nav } from '@/modules/public/components/nav'
import { dateFormat } from '@/utils/date-format'

import { PurchaseDetailsDialog } from '../components/purchase-details-dialog'
import { ListMyEventPurchases } from '../services/list-my-event-purchases'

export function MyPurchasesView() {
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false)

  const { data } = ListMyEventPurchases({
    allRecords: true,
  })
  const purchases = data?.eventPurchases

  return (
    <main className="flex min-h-screen w-full flex-col gap-2">
      <Nav />
      <div className="flex flex-col p-6 px-36 gap-4 mobile:px-6">
        <Label className="text-3xl font-semibold mobile:text-xl">
          Ingressos
        </Label>

        <Separator />

        <div className="grid grid-cols-3 gap-10 mobile:grid-cols-1">
          {purchases?.map((purchase) => {
            const imageURL = `${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${purchase.event?.imagePath}`

            return (
              <Card key={purchase.id}>
                <Image
                  src={imageURL}
                  alt="Banner evento"
                  width={300}
                  height={50}
                  className="rounded-lg w-full"
                />
                <CardContent className="p-0 flex flex-col">
                  <div className="flex flex-col justify-center items-start p-4">
                    <Label className="text-base">{purchase.event.title}</Label>
                  </div>

                  <Separator />

                  <div className="flex flex-col justify-center items-start p-4">
                    <div className="flex flex-row gap-1 items-center">
                      <Clock size={16} />
                      <Label className="text-xs">
                        {dateFormat(purchase.event.initialDate)}
                      </Label>
                      <Label className="text-xs">à</Label>
                      <Label className="text-xs">
                        {dateFormat(purchase.event.finalDate)}
                      </Label>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col justify-center items-start p-4">
                    <Dialog
                      open={showPurchaseDetails}
                      onOpenChange={setShowPurchaseDetails}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex flex-row gap-2 w-full underline-offset-4 hover:underline"
                        >
                          <Eye size={16} />
                          <Label className="text-xs hover:cursor-pointer">
                            Ver ingressos
                          </Label>
                        </Button>
                      </DialogTrigger>
                      <PurchaseDetailsDialog purchase={purchase} />
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
