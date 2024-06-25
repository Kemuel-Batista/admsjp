import { Row } from '@tanstack/react-table'

import { IndeterminateCheckbox } from './indeterminate-checkbox'

export const IndeterminateCheckboxRow = ({ row }: { row: Row<any> }) => (
  <IndeterminateCheckbox
    {...{
      checked: row.getIsSelected(),
      indeterminate: row.getIsSomeSelected(),
      onChange: row.getToggleSelectedHandler(),
      className: !row.getCanSelect() ? '!cursor-not-allowed opacity-30' : '',
    }}
  />
)
