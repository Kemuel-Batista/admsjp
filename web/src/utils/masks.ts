function maskCurrency(value: string) {
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d+)(\d{2})$/, 'R$ $1,$2')
  // Montar um bloco de 3 digitos quetiver logo em seguida um valor não númerico (,) e adicionar um ponto
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')

  return value
}

export { maskCurrency }
