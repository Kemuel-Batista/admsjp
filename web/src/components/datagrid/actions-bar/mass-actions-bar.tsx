import { useContext } from 'react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { DatagridContext, Massaction } from '../index'

export const MassActionsBar = () => {
  const { massactions, table } = useContext(DatagridContext)

  const rows = table.getSelectedRowModel().flatRows

  return (
    <div>
      {massactions &&
        massactions.map((button: Massaction) => {
          const { icon: Icon, component: Component, onClick } = button
          return Component ? (
            <Component button={button} rows={rows} key={button.label} />
          ) : onClick ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => onClick(rows)}>
                  {Icon && <Icon size={16} />}
                  {button.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{button?.tooltip}</TooltipContent>
            </Tooltip>
          ) : null
        })}
    </div>
  )
}
