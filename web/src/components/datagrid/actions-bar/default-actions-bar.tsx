'use client'
import { useContext } from 'react'

import { RefreshButton } from '../buttons/refresh-button'
import { DatagridContext } from '../index'
import { MassActionsBar } from './mass-actions-bar'

export const DefaultActionsBar = () => {
  const { massactions, rowSelection } = useContext(DatagridContext)

  return (
    <div className="flex items-center">
      {Object.keys(rowSelection).length === 0 ? (
        <div className="flex gap-3 w-full justify-end">
          <RefreshButton />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          {massactions && (
            <>
              {/* <Box bg="gray.400" w="1px" h={4} mx={1} /> */}
              <MassActionsBar />
            </>
          )}
          {Object.keys(rowSelection).length > 1
            ? `${Object.keys(rowSelection).length} itens selecionados`
            : `${Object.keys(rowSelection).length} itens selecionados`}
        </div>
      )}
    </div>
  )
}
