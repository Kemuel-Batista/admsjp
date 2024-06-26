import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Icons } from '@/components/ui/icons'

import { CancelEventPurchaseByExpiredTimeService } from '../services/cancel-event-purchase-by-expired-time'

interface PurchaseLimitTimeDialogProps {
  purchaseId: string
}

export function PurchaseLimitTimeDialog({
  purchaseId,
}: PurchaseLimitTimeDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync } = CancelEventPurchaseByExpiredTimeService()

  async function handleNavigateToHome() {
    setIsLoading(true)

    await mutateAsync(purchaseId, {
      onSuccess: () => {
        router.push('/')
        setIsLoading(false)
      },
    })

    setIsLoading(false)
  }

  return (
    <DialogContent
      className="w-3/4 max-w-screen mobile:w-full"
      onInteractOutside={(e) => {
        e.preventDefault()
      }}
      showCloseButton={false}
    >
      <DialogHeader>
        <DialogTitle className="text-start">
          Seu tempo de compra expirou!
        </DialogTitle>
        <DialogDescription className="text-muted-foreground text-start leading-relaxed">
          Infelizmente o seu tempo de compra expirou! Retorne para a página
          inicial e faça uma nova compra
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={handleNavigateToHome} disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowLeft className="mr-2 h-4 w-4" />
          )}{' '}
          Voltar para tela inicial
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
