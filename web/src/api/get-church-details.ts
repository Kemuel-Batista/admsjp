import { api } from '@/lib/axios'

export interface ChurchLeaderProps {
  id: string
  name: string
  functionName: string
  phone: string
  email: string
  birthday: Date
}

export interface ChurchDeparmentMemberProps {
  id: string
  name: string
  functionName: string
  subFunction: string
  phone: string
  email: string
  birthday: string
}

export interface ChurchDeparmentProps {
  id: string
  departmentName: string
  username: string
  members: ChurchDeparmentMemberProps[]
}

export interface ChurchDetailsProps {
  id: string
  name: string
  description: string
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  number: string
  latitude: number
  longitude: number
  username: string
  leaders: ChurchLeaderProps[]
  departments: ChurchDeparmentProps[]
}

export interface GetChurchDetailsRequest {
  churchId: string
}

export interface GetChurchDetailsResponse {
  church: ChurchDetailsProps
}

export async function getChurchDetails({ churchId }: GetChurchDetailsRequest) {
  const response = await api.get<GetChurchDetailsResponse>(
    `/admsjp/churchs/${churchId}`,
  )

  return response.data
}
