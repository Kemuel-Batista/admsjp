import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function CheckoutLoading() {
  return (
    <>
      <div className="flex items-center justify-center h-12 bg-popover-foreground">
        <Skeleton className="w-full" />
      </div>
      <div className="grid grid-cols-[10fr_4fr] px-24 p-6 gap-4 mobile:px-12 mobile:grid-cols-1">
        <main>
          <div className="flex flex-col gap-4 justify-center">
            <Skeleton className="w-full h-6" />
            <div className="flex gap-2">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-full" />
            </div>
          </div>
          <Separator className="my-10" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6" />
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-16">
              <div className="flex flex-row items-center p-3 gap-4">
                <Skeleton className="h-12 w-12" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-36 h-4" />
                  <Skeleton className="w-36 h-4" />
                </div>
              </div>
            </div>
            <Skeleton className="w-full h-8" />
          </div>
          <div className="grid gap-5 my-10">
            <Skeleton className="w-36 h-6" />
            <Skeleton className="w-full h-6" />

            <div className="grid mt-5 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
              </div>
            </div>
          </div>
        </main>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-52" />
          <Skeleton className="w-full h-6" />
        </div>
        <Skeleton className="w-full h-8" />
      </div>
    </>
  )
}
