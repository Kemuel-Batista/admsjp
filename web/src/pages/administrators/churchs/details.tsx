import { useQuery } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getChurchDetails } from '@/api/get-church-details'
import { ChurchDeparmentMembers } from '@/components/administrators/church-department-members'
import { ChurchForm } from '@/components/administrators/church-form'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'

export function ChurchDetails() {
  const { admsjp_church_id } = parseCookies()
  const navigate = useNavigate()
  const [editChurchInformation, setEditChurchInformation] = useState(false)

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

  return (
    <div className="flex-1 flex-col space-y-8 p-8">
      <div className="grid gap-4">
        <h2 className="text-2xl tracking-tight">Igreja - {church?.name}</h2>

        <div className="grid gap-2">
          <Input disabled value={church?.username} />

          <ChurchForm church={church} />
        </div>
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

                <ChurchDeparmentMembers />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
