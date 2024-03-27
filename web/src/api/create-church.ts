import { api } from '@/lib/axios'

interface CreateChurchBody {
  name: string
  description: string
  street: string
  neighborhood: string
  postalCode: string
  number: string
  latitude: number
  longitude: number
}

export const createChurch = async ({
  name,
  description,
  street,
  neighborhood,
  postalCode,
  number,
  latitude,
  longitude,
}: CreateChurchBody) => {
  await api.post('/admsjp/churchs', {
    name,
    description,
    street,
    neighborhood,
    city: 'SJP',
    state: 'PR',
    postalCode,
    number,
    latitude,
    longitude,
  })
}
