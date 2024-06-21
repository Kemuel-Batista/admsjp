'use client'

import { EventCheckoutView } from '@/modules/events/modules/tickets/views/checkout-view'

export default function EventCheckout({
  params,
}: {
  params: { slug: string }
}) {
  return <EventCheckoutView slug={params.slug} />
}
