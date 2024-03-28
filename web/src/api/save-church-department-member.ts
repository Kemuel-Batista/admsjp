import { api } from '@/lib/axios'

interface SaveChurchDepartmentMemberBody {
  churchDepartmentId: string
  members: {
    name: string
    functionName: string
    subFunction: string
    phone: string
    email: string
    birthday: Date
  }[]
}

export const saveChurchDepartmentMember = async ({
  churchDepartmentId,
  members,
}: SaveChurchDepartmentMemberBody) => {
  await api.post(`/admsjp/churchs/department/${churchDepartmentId}`, {
    members,
  })
}
