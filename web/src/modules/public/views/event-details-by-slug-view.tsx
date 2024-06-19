'use client'

import Image from 'next/image'

import { env } from '@/env'
import { GetEventBySlugService } from '@/modules/events/services/get-event-by-slug'

import { Nav } from '../components/nav'

interface EventDetailsBySlugViewProps {
  slug: string
}

export function EventDetailsBySlugView({ slug }: EventDetailsBySlugViewProps) {
  const { data } = GetEventBySlugService(slug)

  const event = data?.event

  return (
    <main className="flex min-h-screen w-full flex-col">
      <Nav />
      <div className="flex flex-1 justify-center bg-primary max-h-80">
        <Image
          src={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${event?.imagePath}`}
          alt="Banner"
          className="w-1/3 rounded-lg"
          width={300}
          height={24}
        />
      </div>
    </main>
  )
}
