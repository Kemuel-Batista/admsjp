import { setCookie } from 'cookies-next'
import { Clock, Eye } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { env } from '@/env'
import { Nav } from '@/modules/public/components/nav'
import { dateFormat } from '@/utils/date-format'

import { ListMyEventPurchases } from '../services/list-my-event-purchases'
import { EventPurchaseWithEvent } from '../types/event-purchase-with-event'

export function MyPurchasesView() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { data } = ListMyEventPurchases({
    changeAllRecords: true,
  })
  const purchases = data?.eventPurchases

  function handleNavigateToHome() {
    router.push('/')
  }

  function handleNavigateToDetails(purchase: EventPurchaseWithEvent) {
    setIsLoading(true)

    setCookie('admsjp.purchase-details', JSON.stringify(purchase), {
      sameSite: true,
    })

    setTimeout(() => {
      router.push('/purchases/details')
    }, 1500)

    setIsLoading(false)
  }

  return (
    <main className="flex min-h-screen w-full flex-col gap-2">
      <Nav />
      <div className="flex flex-col p-6 px-36 gap-4 mobile:px-6">
        <Label className="text-3xl font-semibold mobile:text-xl">
          Ingressos
        </Label>

        <Separator />

        {purchases?.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="mobile:text-lg">
                Ainda não existem compras registradas
              </CardTitle>
              <CardDescription className="mobile:text-xs">
                Que tal fazer sua primeira compra hoje? Clique no botão abaixo e
                confira os eventos disponíveis
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full mobile:text-xs"
                size="sm"
                onClick={handleNavigateToHome}
              >
                Procurar eventos
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-3 gap-10 mobile:grid-cols-1">
          {purchases &&
            purchases.map((purchase) => {
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
                      <Label className="text-base">
                        {purchase.event.title}
                      </Label>
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
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex flex-row gap-2 w-full underline-offset-4 hover:underline"
                        onClick={() => handleNavigateToDetails(purchase)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Icons.spinner />
                        ) : (
                          <>
                            <Eye size={16} />

                            <Label className="text-xs hover:cursor-pointer">
                              Ver ingressos
                            </Label>
                          </>
                        )}
                      </Button>
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
