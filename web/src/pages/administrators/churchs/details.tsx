import { useQuery } from '@tanstack/react-query'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getChurchDetails } from '@/api/get-church-details'
import { ChurchDeparmentMembers } from '@/components/administrators/church-department-members'
import { ChurchForm } from '@/components/administrators/church-form'
import { ChurchLeaders } from '@/components/administrators/church-leaders'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ChurchDetails() {
  const { admsjp_church_id, admsjp_church_type } = parseCookies()
  const navigate = useNavigate()

  useEffect(() => {
    if (!admsjp_church_id) {
      navigate('/administrators/church')
    }
  }, [navigate, admsjp_church_id])

  const { data: result } = useQuery({
    queryKey: ['church_details', admsjp_church_id],
    queryFn: () => getChurchDetails({ churchId: admsjp_church_id }),
  })

  const church = result?.church
  const isChurchFormView = admsjp_church_type === 'view'

  function handleNavigateBack() {
    destroyCookie(undefined, 'admsjp_church_id')
    destroyCookie(undefined, 'admsjp_church_type')

    navigate('/administrators/church')
  }

  return (
    <div className="flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2 mobile:flex-col mobile:items-start">
        <h2 className="text-2xl tracking-tight">
          {isChurchFormView && 'Visualizar - '}Igreja - {church?.name}
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => handleNavigateBack()}>
            Voltar a tela anterior
          </Button>
        </div>
      </div>
      <div className="grid gap-2">
        <Input disabled value={church?.username} />

        <ChurchForm church={church} formType={admsjp_church_type} />
      </div>
      <div className="grid">
        <h2 className="text-xl font-bold tracking-tight">
          Líderes da congregação
        </h2>
        <ChurchLeaders
          churchId={church?.id}
          leaders={church?.leaders ?? []}
          formType={admsjp_church_type}
        />
      </div>
      <div className="grid">
        <h2 className="text-xl font-bold tracking-tight">Departamentos</h2>
        {church?.departments.map((churchDepartment) => (
          <Accordion key={churchDepartment.id} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {churchDepartment.departmentName}
              </AccordionTrigger>
              <AccordionContent>
                <Input disabled value={churchDepartment.username} />

                <ChurchDeparmentMembers
                  churchDepartmentId={churchDepartment.id}
                  members={churchDepartment.members}
                  formType={admsjp_church_type}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
