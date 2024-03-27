import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { fetchDepartments } from '@/api/fetch-departments'
import { Button } from '@/components/ui/button'

import { DataTableDepartments } from './data-table'
import { DataTableDepartmentColumns } from './data-table-columns'

export function DepartmentList() {
  const navigate = useNavigate()

  const { data: result } = useQuery({
    queryKey: ['departments'],
    queryFn: () => fetchDepartments(),
  })

  const departments = result?.departments || []

  return (
    <div className="flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2 mobile:flex-col mobile:items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Departamentos da ADMSJP!
          </h2>
          <p className="text-muted-foreground">
            Aqui estão a lista de departamentos oficiais da ADMSJP
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate('/administrators/departments/save')}>
            Cadastrar novo departamento
          </Button>
        </div>
      </div>

      <DataTableDepartments
        columns={DataTableDepartmentColumns}
        data={departments}
      />
    </div>
  )
}
