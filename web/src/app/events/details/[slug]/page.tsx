import { EventDetailsBySlugView } from '@/modules/public/views/event-details-by-slug-view'

export default function EventDetailsBySlugPage({
  params,
}: {
  params: { slug: string }
}) {
  return <EventDetailsBySlugView slug={params.slug} />
}
