'use client'

import { useMediaQuery } from 'usehooks-ts'

import { EventDetailsBySlugMobileView } from '@/modules/public/views/event-details-by-slug-mobile-view'
import { EventDetailsBySlugView } from '@/modules/public/views/event-details-by-slug-view'

export default function EventDetailsBySlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  })

  if (isDesktop) {
    return <EventDetailsBySlugView slug={params.slug} />
  }

  return <EventDetailsBySlugMobileView slug={params.slug} />
}
