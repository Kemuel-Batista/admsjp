import { Icons } from '../ui/icons'

export function GlobalLoad() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Icons.spinner className="h-20 w-20 animate-spin" />
    </div>
  )
}
