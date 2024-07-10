import { Row } from '@tanstack/react-table'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Lineaction } from '@/components/datagrid'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { env } from '@/env'
import { maskEventDate } from '@/utils/masks'

import { Event } from '../types/event'

export function EventViewSheet({
  lineaction,
  row,
}: {
  lineaction: Lineaction
  row: Row<Event>
}) {
  const [open, setOpen] = useState(false)

  const { icon: Icon } = lineaction

  const { original: event } = row

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className="flex items-center gap-2 px-2 py-1.5 text-sm">
        {Icon ? (
          <Icon
            style={{
              width: 16,
              height: 16,
            }}
          />
        ) : undefined}
        {lineaction.label}
      </SheetTrigger>
      <SheetContent className="grid gap-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{event.title}</SheetTitle>
          <SheetDescription>{event.slug}</SheetDescription>
        </SheetHeader>
        <Image
          src={`${env.NEXT_PUBLIC_API_BUCKET_URL}/${env.NEXT_PUBLIC_API_BUCKET_NAME}/${event.imagePath}`}
          className="w-full"
          alt="Banner"
          unoptimized
          width={300}
          height={24}
        />

        <div className="grid gap-4">
          <div className="flex flex-col gap-4 justify-center">
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
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <Label className="text-lg">Descrição do evento</Label>
          <p className="whitespace-pre-wrap">{event?.description}</p>
          <Separator />
        </div>
      </SheetContent>
    </Sheet>
  )
}
