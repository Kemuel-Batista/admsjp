function maskCurrency(value: string) {
  value = value.replace(/\D/g, '')

  if (value === '0') {
    return 'R$ 0,00'
  }

  value = value.replace(/(\d+)(\d{2})$/, 'R$ $1,$2')
  // Montar um bloco de 3 digitos quetiver logo em seguida um valor não númerico (,) e adicionar um ponto
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')

  return value
}

function maskEventDate(value?: string) {
  if (value === undefined) {
    return
  }

  const date = new Date(value)

  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' }) // "Jul"
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day} ${month} - ${year} • ${hours}:${minutes}`
}

export { maskCurrency, maskEventDate }
