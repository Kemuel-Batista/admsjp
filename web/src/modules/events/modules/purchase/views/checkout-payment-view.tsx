import { zodResolver } from '@hookform/resolvers/zod'
import { deleteCookie, getCookie } from 'cookies-next'
import { Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

  const eventPurchase: EventPurchaseInfo = JSON.parse(
    getCookie('admsjp.event-purchase') ?? '',
  )

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

  const { mutateAsync, isPending } = CreateManualPaymentService()

  async function onSubmit(data: CreateManualPaymentFormData) {
    await mutateAsync(data, {
      onSuccess: () => {
        router.push('/')

        if (!isPending) {
          deleteCookie('admsjp.event-purchase')
        }
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
            <PurchaseCountdown expiresAt={eventPurchase.expiresAt} />
            <CheckoutSummaryView
              tickets={eventPurchase.eventTickets}
              eventId={eventPurchase.eventId}
            />
          </div>
          <div className="grid gap-4">
            <Label className="text-xl">Informações de pagamento</Label>
            <div className="grid">
              <Label className="text-muted-foreground">ANDRÉ SANTANA</Label>
              <Label className="text-muted-foreground text-xs">
                Secretário da UMADSJP
              </Label>
            </div>
            <Label className="text-muted-foreground">Banco Inter</Label>

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
                  accept="image/*"
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Concluir pagamento
        </Button>
      </form>
    </Form>
  )
}
