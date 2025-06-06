import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  CreateManualPaymentFormData,
  createManualPaymentSchema,
} from '@/modules/orders/schemas/create-manual-payment-schema'
import { CreateManualPaymentService } from '@/modules/orders/services/create-manual-payment'

import { PurchaseCountdown } from '../components/purchase-countdown'
import { EventPurchaseInfo } from '../types/event-purchase-info'
import { CheckoutSummaryView } from './checkout-summary-view'

export function CheckoutPaymentView() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const eventPurchase: EventPurchaseInfo = JSON.parse(
    getCookie('admsjp.event-purchase') ?? '',
  )

  useEffect(() => {
    if (!eventPurchase) {
      router.push('/')
    }
  }, [eventPurchase])

  const form = useForm<CreateManualPaymentFormData>({
    resolver: zodResolver(createManualPaymentSchema),
    defaultValues: {
      transactionId: eventPurchase.eventPurchaseId,
    },
  })

  const fileRef = form.register('image')

  function handleCopyPixCodeText() {
    navigator.clipboard.writeText(eventPurchase.pixKey)
  }

  const { mutateAsync } = CreateManualPaymentService()

  async function onSubmit(data: CreateManualPaymentFormData) {
    setIsLoading(true)

    await mutateAsync(data, {
      onSuccess: () => {
        router.push('/purchases')
      },
    })
  }

  return (
    <Form {...form}>
      <div className="flex items-center justify-center h-12 bg-popover-foreground">
        <Label className="text-popover">ADMSJP</Label>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid px-24 p-6 gap-4 mobile:px-12"
      >
        <main className="grid grid-cols-2 mobile:grid-cols-1 gap-4">
          <div className="grid gap-4">
            <PurchaseCountdown
              purchaseId={eventPurchase.eventPurchaseId}
              expiresAt={eventPurchase.expiresAt}
            />
            <CheckoutSummaryView
              tickets={eventPurchase.eventTickets}
              eventId={eventPurchase.eventId}
            />
          </div>
          <div className="grid gap-4">
            <Label className="text-xl">Informações de pagamento</Label>
            <div className="grid">
              <Label className="text-muted-foreground">IEADMSJP</Label>
              <Label className="text-muted-foreground text-xs">
                Igreja Evangélica Assembléia de Deus - Ministerio São José dos
                Pinhais
              </Label>
            </div>
            <Label className="text-muted-foreground">Banco Santander</Label>

            <div className="flex flex-col gap-1">
              <Label className="text-muted-foreground">Chave PIX</Label>

              <div className="flex flex-row justify-between items-center gap-2">
                <Input
                  value={eventPurchase.pixKey}
                  placeholder={eventPurchase.pixKey}
                />
                <Button
                  onClick={handleCopyPixCodeText}
                  className="gap-2"
                  type="button"
                  variant="secondary"
                >
                  <Copy size={20} color="#f97015" />
                </Button>
              </div>
            </div>
          </div>
        </main>
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Comprovante de pagamento</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Picture"
                  accept="image/*,application/pdf"
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Icons.spinner /> : 'Concluir pagamento'}
        </Button>
      </form>
    </Form>
  )
}
