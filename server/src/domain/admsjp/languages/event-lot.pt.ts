const pt = {
  eventLot: {
    create: {
      keyAlreadyExists: 'Event lot {{key}} já existe no sistema',
    },
    find: {
      notFound: 'Não foi possível localizar o event lot {{key}}',
      event: {
        'not-match': 'Esse event lot não pertence a esse evento',
      },
    },
    sales: {
      'remaining-qty-not-enough':
        'Não existem ingressos suficientes para sua solicitação',
      'sold-out': 'Ingressos esgotados para esse lote {{key}}',
    },
  },
}

export default pt
