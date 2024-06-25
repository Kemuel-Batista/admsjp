import { Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { env } from '@/env'
import { GetEventAddressByEventIdService } from '@/modules/events/modules/event-address/services/get-event-address-by-event-id'
import { ListEventLotsView } from '@/modules/events/modules/event-lot/views/list-event-lots-view'
import { GetEventBySlugService } from '@/modules/events/services/get-event-by-slug'
import { maskEventDate } from '@/utils/masks'

import { Nav } from '../components/nav'

interface EventDetailsBySlugViewProps {
  slug: string
}

export function EventDetailsBySlugView({ slug }: EventDetailsBySlugViewProps) {
  const { data } = GetEventBySlugService(slug)
  const event = data?.event

  const result = GetEventAddressByEventIdService(event?.id)
  const address = result.data?.eventAddress

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
              filter: 'blur(5px)',
            }}
          ></div>
          <Image
            src={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${event?.imagePath}`}
            alt="Banner"
            className="relative z-10 w-2/4 rounded-lg"
            width={300}
            height={500}
            unoptimized
          />
        </div>
        <div className="grid grid-cols-[10fr_5fr] px-24">
          <div className="flex flex-col gap-10 justify-center">
            <Label className="text-3xl font-bold">{event?.title}</Label>
            <div className="flex gap-2">
              <Calendar size={24} />
              <Label className="text-base font-normal">
                {maskEventDate(event?.initialDate)}
              </Label>
              <Label className="text-base font-normal">{'>'}</Label>
              <Label className="text-base font-normal">
                {maskEventDate(event?.finalDate)}
              </Label>
            </div>
            {address && (
              <div className="flex gap-2">
                <MapPin size={24} />
                <Label className="text-base font-normal">
                  Evento presencial em {address.street}, {address.number} -{' '}
                  {address.neighborhood}
                </Label>
              </div>
            )}
          </div>
          <ListEventLotsView eventId={event?.id} eventSlug={event?.slug} />
        </div>
        <div className="flex flex-col px-24 w-full gap-10">
          <Label className="text-2xl">Descrição do evento</Label>
          <p className="whitespace-pre-wrap">{event?.description}</p>
          <Separator />
          {address && (
            <>
              <Label className="text-xl">Local do evento</Label>
              <Label className="text-base font-normal">
                Evento presencial em {address.street}, {address.number} -{' '}
                {address.neighborhood}
              </Label>
              <a
                href={`https://maps.google.com/?q=${address.latitude},${address.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="mt-2 mx-auto gap-2"
                >
                  <MapPin size={24} />
                  Ver no mapa
                </Button>
              </a>
            </>
          )}
        </div>
        <footer className="my-10"></footer>
      </main>
    </div>
  )
}
