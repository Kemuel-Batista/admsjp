const pt = {
  event: {
    create: {
      invalidAttachmentType: 'Formato {{key}} inválido.',
      keyAlreadyExists: 'Event {{key}} já existe no sistema',
    },
    find: {
      notFound: 'Não foi possível localizar o event {{key}}',
      invalidStatus:
        'Status inválido, esperado {{expectedStatus}} recebido {{receivedStatus}}',
      disable: 'Event está desativado',
    },
    update: {
      keyAlreadyExists: 'Event {{key}} já existe no sistema',
      value: 'Alterado valor do prametro',
    },
  },
}

export default pt
