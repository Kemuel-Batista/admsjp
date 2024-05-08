const pt = {
  event: {
    create: {
      invalidAttachmentType: 'Formato {{type}} inválido.',
      keyAlreadyExists: 'Event {{title}} já existe no sistema',
    },
    find: {
      notFound: 'Não foi possível localizar o event {{event}}',
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
