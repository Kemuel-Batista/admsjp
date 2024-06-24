import { setCookie } from 'cookies-next'
import { Calendar, Eye } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { env } from '@/env'
import { Nav } from '@/modules/public/components/nav'
import { dateFormat } from '@/utils/date-format'

import { PurchaseStatusBadge } from '../components/purchase-status-badge'
import { ListMyEventPurchases } from '../services/list-my-event-purchases'

export function MyPurchasesView() {
  const router = useRouter()

  const { data } = ListMyEventPurchases({
    allRecords: true,
  })
  const purchases = data?.eventPurchases

  function handleNavigateToPurchaseDetails(purchaseId: string) {
    setCookie('admsjp.purchase-details-id', purchaseId)

    router.push('/purchases/details')
  }

  return (
    <main className="flex min-h-screen w-full flex-col gap-2">
      <Nav />
      <div className="flex flex-col p-6 gap-4">
        <Label className="text-xl">Meus ingressos</Label>

        <Separator />

        {purchases?.map((purchase) => {
          const imageURL = `${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${purchase.event?.imagePath}`

          return (
            <div
              key={purchase.id}
              className="flex flex-row gap-4 mobile:flex-col"
            >
              <Image
                src={imageURL}
                alt="Banner evento"
                width={300}
                height={50}
                className="rounded-lg mobile:w-full"
              />
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row justify-between items-center mobile:flex-col mobile:gap-2 mobile:items-start">
                  <div className="flex flex-row gap-1 items-center">
                    <Calendar size={24} color="#f97015" />
                    <Label className="text-primary font-bold">
                      {dateFormat(purchase.event.initialDate)}
                    </Label>
                    <Label className="text-primary font-bold">à</Label>
                    <Label className="text-primary font-bold">
                      {dateFormat(purchase.event.finalDate)}
                    </Label>
                  </div>
                  <PurchaseStatusBadge status={purchase.status} />
                </div>
                <Label className="text-xl font-semibold">
                  {purchase.event.title}
                </Label>
                <Button
                  onClick={() => handleNavigateToPurchaseDetails(purchase.id)}
                  className="gap-2"
                  type="button"
                  variant="outline"
                >
                  <Eye size={20} />
                  <Label>Visualizar detalhes da compra</Label>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
