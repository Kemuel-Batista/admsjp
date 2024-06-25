const pt = {
  eventPurchase: {
    find: {
      notFound: 'Não foi possível localizar o event purchase {{key}}',
      incorrectAssociation:
        'Usuário não tem permissão para completar o registro dos ingressos',
    },
    delete: {
      timeNotExpired: 'O tempo limite ainda não expirou!',
    },
  },
}

export default pt
