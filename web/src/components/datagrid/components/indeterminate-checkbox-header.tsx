import { Table } from '@tanstack/react-table'

import { IndeterminateCheckbox } from './indeterminate-checkbox'

export const IndeterminateCheckboxHeader = ({
  table,
}: {
  table: Table<any>
}) => (
  <IndeterminateCheckbox
    {...{
      checked: table.getIsAllRowsSelected(),
      indeterminate: table.getIsSomeRowsSelected(),
      onChange: table.getToggleAllRowsSelectedHandler(),
    }}
  />
)
