import { LucideIcon } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon
}

export function SidebarButton({
  icon: Icon,
  className,
  children,
  ...props
}: SidebarButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn('gap-2 justify-start', className)}
      {...props}
    >
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </Button>
  )
}

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  )
}
