'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowData,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import React, { createContext, useContext, useMemo, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '../ui/button'
import { DefaultActionsBar } from './actions-bar/default-actions-bar'
import { Expander } from './buttons/expander'
import { IndeterminateCheckboxHeader } from './components/indeterminate-checkbox-header'
import { IndeterminateCheckboxRow } from './components/indeterminate-checkbox-row'

export type SearchState = {
  field: string | null
  condition: string | null
  value: string | null
  operator: string | null
}

export type Column<TColumn> = ColumnDef<TColumn, any> & {
  format?: (value: any) => any
  filterType?: string
  searchField?: React.ElementType
}

export type Lineaction = {
  label: string
  icon?: React.ElementType
  href?: string
  disabled?: boolean
  component?: React.ElementType
}

export type Massaction = {
  label: string
  tooltip?: string
  icon?: React.ElementType
  color?: string
  onClick?: (row: any) => void
  component?: React.ElementType
}

type DatagridProps = {
  service: any
  columns: any[]
  lineactions?: Lineaction[] | null
  massactions?: Massaction[] | null
  expandRow?: React.ElementType
  manualPagination?: boolean
  title: string
  id?: string
  enableRowSelection?: (row: RowData) => boolean
  source?: string
  module: string
}

type DatagridContextProps = DatagridProps & {
  rowSelection: any
  setRowSelection: any
  search: SearchState[] | []
  setSearch: any
  result: any
  table: any
}

type DatagridProviderProps = DatagridProps & {
  children: React.ReactNode
}

export const DatagridContext = createContext({} as DatagridContextProps)

const getTdBackground = (row: any, cell: any) => {
  const cellColor = cell.column.columnDef.meta?.colorCell && cell.getValue()
  const rowBackground = row.original.rowBackground

  const baseClasses = clsx(
    '!py-3 !px-6 border-b-[1px] !border-l-0 !border-r-0',
    {
      '!border-b-0': row.getIsExpanded(),
    },
  )

  if (cellColor) {
    return clsx(baseClasses, `bg-${cellColor}-500 bg-opacity-10`)
  } else if (rowBackground) {
    return clsx(baseClasses, `bg-${rowBackground}-200`)
  } else {
    return clsx(baseClasses)
  }
}

export const DatagridTable = ({
  title,
  actionsDatagrid,
}: {
  title: string
  actionsDatagrid: JSX.Element
}) => {
  const { result, table, expandRow: ExpandRow } = useContext(DatagridContext)
  const tableColumns = table.getAllColumns()

  const sortLineactionsToEnd = (a: any, b: any) => {
    if (a.id.includes('lineactions')) return 1 // Move o elemento com id 'lineactions' para o final
    if (b.id.includes('lineactions')) return -1 // Move o elemento com id 'lineactions' para o final
    return a.index - b.index // Mantém a ordem dos outros elementos
  }

  return (
    <div className="datagrid flex flex-col w-full border-gray-300 border-[1px] border-b-0 rounded-tr-lg rounded-tl-lg">
      <div className="hidden items-center justify-between w-full px-6 py-4 !border-gray-300 border-b-[1px]">
        <h2 className="text-lg font-medium">Listagem de {title}</h2>
        {actionsDatagrid}
      </div>

      <div className="table table-fixed w-full">
        <div className="table-cell overflow-x-auto w-full">
          <Table className="!border-gray-300">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers
                    .sort(sortLineactionsToEnd)
                    .map((header: any) => {
                      const sizeCol = header.column.columnDef.meta?.size
                      return (
                        <TableHead
                          key={header.id}
                          className="!bg-secondary !border-b-[1px]"
                          style={{
                            borderLeft: 0,
                            borderRight: 0,
                            padding: 0,
                            width: [
                              'select',
                              'expander',
                              'lineactions',
                            ].includes(header.id)
                              ? '10px'
                              : sizeCol || 'auto',
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <>
                              <div
                                className="py-3 px-6 justify-between items-center capitalize text-xs text-gray-700 font-medium"
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </div>
                            </>
                          )}
                        </TableHead>
                      )
                    })}
                </TableRow>
              ))}
            </TableHeader>
            {!result.isError && (
              <TableBody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row: any) => {
                    return (
                      <React.Fragment key={row.id}>
                        <TableRow>
                          {row
                            .getVisibleCells()
                            .sort(sortLineactionsToEnd)
                            .map((cell: any) => {
                              return (
                                <React.Fragment key={cell.id}>
                                  {cell.getContext().getValue() ||
                                  cell.getContext().getValue() === 0 ||
                                  cell.id.includes('expander') ||
                                  cell.id.includes('select') ||
                                  cell.column.columnDef.meta?.renderNull ||
                                  cell.id.includes('lineactions') ? (
                                    <TableCell
                                      className={getTdBackground(row, cell)}
                                    >
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                      )}
                                    </TableCell>
                                  ) : (
                                    <TableCell
                                      className={getTdBackground(row, cell)}
                                    >
                                      Não informado
                                    </TableCell>
                                  )}
                                </React.Fragment>
                              )
                            })}
                        </TableRow>
                        {row.getIsExpanded() && ExpandRow && (
                          <TableRow>
                            <TableCell colSpan={row.getVisibleCells().length}>
                              <ExpandRow row={row} />
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      className="!bg-gray-100 text-gray-400 !py-3 !px-6 !border-b-[1px] !text-center"
                      style={{
                        borderLeft: 0,
                        borderRight: 0,
                      }}
                      colSpan={tableColumns.length}
                    >
                      Não há registros cadastrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>
      </div>

      {/* {result.isError && !result.isFetching && (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="100px"
          gap="1"
        >
          <AlertIcon boxSize="40px" m={0} />
          <AlertDescription>
            <div>Não foi possível carregar as informações')}.</d
            {result.error.response && (
              <div>esult.error.response.data.message)}</d
            )}
          </AlertDescription>
        </Alert>
      )}
      {result.isFetching && (
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="100px"
          gap="1"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Box>Carregando')}</Box>
        </Flex>
      )} */}
    </div>
  )
}

export const DatagridProvider = ({
  service,
  columns,
  lineactions,
  massactions,
  expandRow,
  children,
  title,
  id,
  enableRowSelection,
  source,
  module,
}: DatagridProviderProps) => {
  const [search, setSearch] = useState<SearchState[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  let newColumns = [...columns]

  if (lineactions) {
    newColumns = [
      {
        accessorKey: 'lineactions',
        header: '',
        cell: ({ row }: { row: RowData }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col gap-2">
                {lineactions.map((item) => {
                  const {
                    icon: Icon,
                    href,
                    component: Component,
                    disabled,
                  } = item

                  const menuItem = (
                    <Link key={item.label} href={href ?? ''}>
                      <Button className="gap-2" size="lg" variant="link">
                        {Icon ? (
                          <Icon
                            style={{
                              width: 16,
                              height: 16,
                            }}
                          />
                        ) : undefined}
                        <div className="title">{item.label}</div>
                      </Button>
                    </Link>
                  )

                  return disabled ? undefined : Component ? (
                    <Component lineaction={item} row={row} key={item.label} />
                  ) : (
                    menuItem
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
        enableColumnFilter: false,
        enableSorting: false,
      },
      ...newColumns,
    ]
  }

  if (expandRow) {
    newColumns = [
      {
        accessorKey: 'expander',
        header: '',
        cell: Expander,
        enableColumnFilter: false,
        enableSorting: false,
      },
      ...newColumns,
    ]
  }

  if (massactions) {
    newColumns = [
      {
        accessorKey: 'select',
        header: IndeterminateCheckboxHeader,
        cell: IndeterminateCheckboxRow,
        enableColumnFilter: false,
        enableSorting: false,
      },
      ...newColumns,
    ]
  }

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  })

  const params = { search, isEnabled: true, pageIndex, pageSize, id }

  const result = service(params, pageIndex, pageSize)

  const defaultData = useMemo(() => [], [])

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )

  const table = useReactTable({
    data: result.data?.[module] ?? defaultData,
    pageCount: Math.ceil(result.data?.['x-total-count'] / pageSize),
    columns: newColumns,
    getRowCanExpand:
      expandRow &&
      (() => {
        return true
      }),
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination: true,
    getRowId: (row: any) => row.id,
    enableRowSelection,
  })

  const contextBag = {
    service,
    columns,
    lineactions,
    massactions,
    expandRow,
    rowSelection,
    setRowSelection,
    enableRowSelection,
    search,
    setSearch,
    result,
    table,
    title,
    id,
    source,
    module,
  }

  return (
    <DatagridContext.Provider value={contextBag}>
      {children}
    </DatagridContext.Provider>
  )
}

export const Datagrid = ({
  service,
  columns,
  lineactions,
  massactions,
  expandRow,
  manualPagination,
  title,
  id,
  enableRowSelection,
  source,
  module,
}: DatagridProps) => {
  return (
    <DatagridProvider
      service={service}
      columns={columns}
      lineactions={lineactions}
      massactions={massactions}
      expandRow={expandRow}
      manualPagination={manualPagination}
      title={title}
      id={id}
      enableRowSelection={enableRowSelection}
      source={source}
      module={module}
    >
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col">
          <DatagridTable
            title={title}
            actionsDatagrid={<DefaultActionsBar />}
          />
          {/* <PaginationButton /> */}
        </div>
      </div>
    </DatagridProvider>
  )
}

export const useDatagrid = () => {
  return useContext(DatagridContext)
}
