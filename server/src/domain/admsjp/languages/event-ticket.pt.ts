const pt = {
  eventTicket: {
    create: {
      keyAlreadyExists: 'Já existe um ingresso associado a esse evento!',
    },
    find: {
      notFound: 'Não foi possível localizar o event ticket {{key}}',
      incorrectAssociation:
        'Usuário não tem permissão para completar o registro dos ingressos',
    },
  },
}

export default pt
