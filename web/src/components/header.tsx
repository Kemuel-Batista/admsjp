import { Label } from './ui/label'
import { Separator } from './ui/separator'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 mobile:ml-10 mobile:mt-1">
      <Label className="text-xl">{title}</Label>
      <Separator />
    </header>
  )
}
