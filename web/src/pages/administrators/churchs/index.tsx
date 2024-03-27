import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function AdministratorChurch() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2 mobile:flex-col mobile:items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Igrejas da ADMSJP!
          </h2>
          <p className="text-muted-foreground">
            Aqui estão a lista de igrejas da ADMSJP
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate('/administrators/church/save')}>
            Cadastrar nova igreja
          </Button>
        </div>
      </div>
    </div>
  )
}
