import { navigation } from '@/config/navigation'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export function Categories() {
  return navigation.map((item) => (
    <NavigationMenuItem key={item.href}>
      {item.subnav ? (
        <>
          <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="ease-in duration-300 bg-white w-screen">
              <div className="p-8 bg-white">
                <ul className="grid grid-cols-5 gap-10 mobile:grid-cols-1 mobile:gap-2">
                  {(item.subnav &&
                    item.subnav.map((subitem) => {
                      return (
                        <li
                          className="text-base text-muted-foreground"
                          key={subitem.label}
                        >
                          <Link
                            href={subitem.href}
                            className="flex gap-2 items-center"
                          >
                            {/* {subitem.icon ? <Icon strokeWidth={1.5} /> : <span>icon?</span>}{' '} */}
                            {subitem.label}
                          </Link>
                        </li>
                      )
                    })) ??
                    []}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </>
      ) : (
        <Link href={item.href} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {item.label}
          </NavigationMenuLink>
        </Link>
      )}
    </NavigationMenuItem>
  ))
}

export function Nav() {
  return (
    <nav>
      <ul className="flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <Categories />
          </NavigationMenuList>
        </NavigationMenu>
      </ul>
    </nav>
  )
}
