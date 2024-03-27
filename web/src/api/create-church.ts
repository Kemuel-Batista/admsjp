import { api } from '@/lib/axios'

interface CreateChurchBody {
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
}

export const createChurch = async ({
  name,
  description,
  street,
  neighborhood,
  city,
  state,
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
    city,
    state,
    postalCode,
    number,
    latitude,
    longitude,
  })
}
