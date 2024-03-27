export function maskCep(value: string) {
  value = value.replace(/\D/g, '') // 54564555
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')

  return value
}
