const pt = {
  eventTicket: {
    create: {
      keyAlreadyExists: 'Já existe um ingresso associado a esse evento!',
    },
    find: {
      notFound: 'Não foi possível localizar o event ticket {{key}}',
      incorrectAssociation: 'Esse ingresso não pertence a essa compra',
    },
    pickup: {
      alreadyPickedUp: 'Este ingresso já foi retirado!',
    },
  },
}

export default pt
