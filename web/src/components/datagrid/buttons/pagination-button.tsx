import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useDatagrid } from '../index'

export const PaginationButton = () => {
  const { table, result } = useDatagrid()

  const { pagination } = table.getState()

  const currentPageCount = table.options.data.length

  const rows = result.data?.count || 0
  const page = pagination.pageIndex + 1
  const pages = table.getPageCount()

  return (
    <div className="flex items-center justify-between px-6 py-3 !border-gray-300 border-x-[1px] !border-b-[1px] rounded-br-lg rounded-bl-lg">
      <div className="text">
        <span className="mr-2">
          {`Exibindo ${currentPageCount} de ${rows} resultados`}
        </span>
        {' | '}
        <span className="ml-2 mr-2">{`Página ${page} de ${pages}`}</span>
        {' | '}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-2 text-blue-500"
              aria-label="Opções de paginação"
            >
              Alterar exibição
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            className="min-w-fit bg-white rounded-md p-3 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            {[2, 5, 10, 20, 30, 40, 50].map((pageSize: number) => {
              const currentPageSize = table.getState().pagination.pageSize

              return (
                <DropdownMenuItem
                  key={pageSize}
                  className={`${
                    currentPageSize === pageSize
                      ? 'text-blue-500 font-semibold'
                      : 'text-blue-900'
                  } group text-[13px] leading-none rounded-md flex items-center py-3 relative px-2  data-[highlighted]:bg-blue-500 data-[highlighted]:text-white`}
                  onClick={() => table.setPageSize(Number(pageSize))}
                >
                  Exibir {pageSize} itens
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="buttons flex gap-3">
        <Button
          onClick={() => {
            table.setPageIndex(0)
          }}
          variant="ghost"
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft />
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            table.previousPage()
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            table.nextPage()
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1)
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
