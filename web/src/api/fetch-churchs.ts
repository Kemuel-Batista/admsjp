import { api } from '@/lib/axios'

export interface ChurchProps {
  id: string
  name: string
  description: string
  street: string
  neighborhood: string
  postalCode: string
  number: string
  latitude: number
  longitude: number
}

export interface FetchChurchsResponse {
  churchs: ChurchProps[]
}

export async function fetchChurchs() {
  const response = await api.get<FetchChurchsResponse>('/churchs')

  return response.data
}
