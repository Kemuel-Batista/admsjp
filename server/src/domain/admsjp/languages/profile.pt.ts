const pt = {
  profile: {
    create: {
      keyAlreadyExists: 'Profile {{name}} já existe no sistema',
    },
    find: {
      notFound: 'Não foi possível localizar o profile {{profile}}',
      invalidStatus:
        'Status inválido, esperado {{expectedStatus}} recebido {{receivedStatus}}',
      disable: 'Profile está desativado',
    },
    update: {
      keyAlreadyExists: 'Profile {{key}} já existe no sistema',
      value: 'Alterado valor do prametro',
    },
  },
}

export default pt
