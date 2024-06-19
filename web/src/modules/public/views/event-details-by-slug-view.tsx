'use client'

import Image from 'next/image'

import { Label } from '@/components/ui/label'
import { env } from '@/env'
import { GetEventAddressByEventIdService } from '@/modules/events/modules/event-address/services/get-event-address-by-event-id'
import { ListEventLotsView } from '@/modules/events/modules/event-lot/views/list-event-lots-view'
import { GetEventBySlugService } from '@/modules/events/services/get-event-by-slug'

import { Nav } from '../components/nav'

interface EventDetailsBySlugViewProps {
  slug: string
}

export function EventDetailsBySlugView({ slug }: EventDetailsBySlugViewProps) {
  const { data } = GetEventBySlugService(slug)
  const event = data?.event

  const result = GetEventAddressByEventIdService(event?.id)
  const address = result.data?.eventAddress

  console.log(address)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Nav />
      <main className="grid gap-10">
        <div className="relative flex justify-center max-h-80">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${event?.imagePath})`,
              zIndex: -10,
              filter: 'blur(10px)',
            }}
          ></div>
          <Image
            src={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${event?.imagePath}`}
            alt="Banner"
            className="relative z-10 w-1/3 rounded-lg"
            width={300}
            height={24}
            quality={100}
          />
        </div>
        <div className="grid grid-cols-[10fr_5fr] px-24">
          <Label className="text-3xl">{event?.title}</Label>
          <ListEventLotsView eventId={event?.id} />
        </div>
        <div className="flex flex-col px-24 w-full gap-10">
          <Label className="text-2xl">Descrição do evento</Label>
          <p>{event?.description}</p>
        </div>
        <footer className="my-10"></footer>
      </main>
    </div>
  )
}
