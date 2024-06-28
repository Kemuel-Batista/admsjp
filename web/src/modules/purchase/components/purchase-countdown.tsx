import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import { PurchaseLimitTimeDialog } from './purchase-limit-time-dialog'

interface PurchaseCountdownProps {
  purchaseId: string
  expiresAt?: string
}

export function PurchaseCountdown({
  purchaseId,
  expiresAt,
}: PurchaseCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [showPurchaseLimitTimeDialog, setShowPurchaseLimitTimeDialog] =
    useState(false)

  useEffect(() => {
    if (!expiresAt) return

    const intervalId = setInterval(() => {
      const now = new Date().getTime()
      const expirationTime = new Date(expiresAt).getTime()
      const timeDifference = expirationTime - now

      if (timeDifference <= 0) {
        clearInterval(intervalId)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      } else {
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        )
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalId)
          setShowPurchaseLimitTimeDialog(true)
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        }

        setTimeLeft({ hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [expiresAt])

  const { hours, minutes, seconds } = timeLeft

  return (
    <div className="grid gap-4 w-full bg-muted p-2 rounded-lg">
      <div className="flex flex-row gap-2 items-center">
        <Clock size={24} />
        <Label>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Label>
      </div>
      <Label className="font-normal text-xs">
        Após este tempo, os ingressos serão liberados para venda novamente.
      </Label>
      <Dialog
        open={showPurchaseLimitTimeDialog}
        onOpenChange={setShowPurchaseLimitTimeDialog}
      >
        <PurchaseLimitTimeDialog purchaseId={purchaseId} />
      </Dialog>
    </div>
  )
}
