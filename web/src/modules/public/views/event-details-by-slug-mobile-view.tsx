import { Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { env } from '@/env'
import { GetEventAddressByEventIdService } from '@/modules/event-address/services/get-event-address-by-event-id'
import { ListEventLotsView } from '@/modules/event-lot/views/list-event-lots-view'
import { GetEventBySlugService } from '@/modules/events/services/get-event-by-slug'
import { maskEventDate } from '@/utils/masks'

import { Nav } from '../components/nav'

interface EventDetailsBySlugViewProps {
  slug: string
}

export function EventDetailsBySlugMobileView({
  slug,
}: EventDetailsBySlugViewProps) {
  const { data } = GetEventBySlugService(slug)
  const event = data?.event

  const result = GetEventAddressByEventIdService(event?.id)
  const address = result.data?.eventAddress

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Nav />
      <main className="grid gap-10">
        <Image
          src={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${event?.imagePath}`}
          alt="Banner"
          className="w-full h-56 rounded-lg"
          width={300}
          height={500}
          unoptimized
        />
        <div className="grid px-6 gap-4">
          <div className="flex flex-col gap-4 justify-center">
            <Label className="text-xl font-bold">{event?.title}</Label>
            <div className="flex gap-2">
              <Calendar size={24} />
              <Label className="text-sm font-normal">
                {maskEventDate(event?.initialDate)}
              </Label>
              <Label className="text-sm font-normal">{'>'}</Label>
              <Label className="text-sm font-normal">
                {maskEventDate(event?.finalDate)}
              </Label>
            </div>
            {address && (
              <div className="flex gap-2">
                <MapPin size={24} />
                <Label className="text-sm font-normal">
                  Evento presencial em {address.street}, {address.number} -{' '}
                  {address.neighborhood}
                </Label>
              </div>
            )}
          </div>
          <ListEventLotsView eventId={event?.id} eventSlug={event?.slug} />
        </div>
        <div className="flex flex-col px-6 w-full gap-4">
          <Label className="text-lg">Descrição do evento</Label>
          <p className="whitespace-pre-wrap">{event?.description}</p>
          <Separator />
          {address && (
            <>
              <Label className="text-lg">Local do evento</Label>
              <Label className="text-sm font-normal">
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
                  size="sm"
                  className="mt-2 mx-auto gap-2 text-xs"
                >
                  <MapPin size={16} />
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
