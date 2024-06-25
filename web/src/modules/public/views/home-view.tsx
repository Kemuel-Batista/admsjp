'use client'

import Image from 'next/image'
import Link from 'next/link'

import Banner from '@/assets/capa-site.png'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Label } from '@/components/ui/label'
import { env } from '@/env'
import { ListPublicEventsService } from '@/modules/events/services/list-public-events'
import { dateFormat } from '@/utils/date-format'

import { Nav } from '../components/nav'

export function HomeView() {
  const result = ListPublicEventsService({
    pageIndex: 1,
  })

  const events = result.data?.events || []

  return (
    <main className="flex min-h-screen w-full flex-col">
      <Nav />
      <main>
        <div className="flex flex-col items-center justify-center flex-1 h-full">
          <Image src={Banner} alt="Banner" />
        </div>
        <div className="grid px-24 pt-10 gap-10">
          <Label className="text-xl">
            Eventos mais vistos nas últimas 24h 👀
          </Label>

          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {events?.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Link href={`/events/details/${item.slug}`} className="p-1">
                    <Card>
                      <Image
                        src={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${item.imagePath}`}
                        alt="Banner"
                        className="w-full rounded-t-lg"
                        width={300}
                        height={24}
                      />
                      <CardContent className="flex flex-col gap-4 p-6">
                        <Label className="text-sm font-semibold text-primary">
                          {dateFormat(item.initialDate)} à{' '}
                          {dateFormat(item.finalDate)}
                        </Label>
                        <Label className="text-xl font-semibold">
                          {item.title}
                        </Label>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </main>
      <footer className="mt-10"></footer>
    </main>
  )
}
