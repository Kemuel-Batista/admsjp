import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { setCookie } from 'nookies'
import { toast } from 'sonner'

import { ChurchProps } from '@/api/fetch-churchs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const DataTableChurchColumns: ColumnDef<ChurchProps>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'street',
    header: 'Rua',
  },
  {
    accessorKey: 'number',
    header: 'Número',
  },
  {
    accessorKey: 'postalCode',
    header: 'CEP',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const church = row.original

      function handleNavigateToChurchDetails(type: string) {
        setCookie(undefined, 'admsjp_church_id', church.id)
        setCookie(undefined, 'admsjp_church_type', type)
        window.location.assign('/administrators/church/details')
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleNavigateToChurchDetails('view')}
            >
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleNavigateToChurchDetails('edit')}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast.info('Funcionalidade ainda em desenvolvimento')
              }
            >
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
