import axios from 'axios'

export interface IBGEUFResponse {
  sigla: string
}

export interface IBGECityResponse {
  id: number
  nome: string
}

export const getStates = async () => {
  const response = await axios.get<IBGEUFResponse[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  )

  return response.data
    .map((uf) => uf.sigla)
    .sort()
    .filter((uf) => uf.includes('PR'))
}

export const getCities = async (state: string) => {
  const response = await axios.get<IBGECityResponse[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
  )

  // ID = 4125506 = São José dos Pinhais
  return response.data.filter((city) => city.id === 4125506)
}
