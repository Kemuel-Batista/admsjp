import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <div className="flex w-full flex-row">
      <div
        data-current={pathname === props.to}
        className="flex w-2 rounded-l-md bg-muted data-[current=true]:bg-primary"
      ></div>
      <Link
        data-current={pathname === props.to}
        className="flex w-full items-center gap-1.5 bg-muted/10 p-2 text-xs font-medium text-muted-foreground hover:text-foreground data-[current=true]:rounded-r-md data-[current=true]:bg-primary/10 data-[current=true]:font-medium data-[current=true]:text-primary"
        {...props}
      />
    </div>
  )
}
