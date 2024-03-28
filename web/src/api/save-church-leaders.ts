import { api } from '@/lib/axios'

interface SaveChurchLeadersBody {
  churchId?: string
  leaders: {
    name: string
    functionName: string
    phone: string
    email: string
    birthday: Date
  }[]
}

export const saveChurchLeaders = async ({
  churchId,
  leaders,
}: SaveChurchLeadersBody) => {
  await api.post(`/admsjp/churchs/leaders/${churchId}`, {
    leaders,
  })
}
