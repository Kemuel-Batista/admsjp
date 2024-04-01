import { api } from '@/lib/axios'

interface SaveNewBelieverBody {
  churchId: string
  name: string
  lastName: string
  phone: string
  email?: string
  birthday: Date
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  number: string
  lgpd: boolean
}

export const saveNewBeliever = async ({
  churchId,
  name,
  lastName,
  phone,
  email,
  birthday,
  street,
  neighborhood,
  city,
  state,
  postalCode,
  number,
  lgpd,
}: SaveNewBelieverBody) => {
  await api.post('/admsjp/believer', {
    churchId,
    name,
    lastName,
    phone,
    email,
    birthday,
    street,
    neighborhood,
    city,
    state,
    postalCode,
    number,
    lgpd,
  })
}
