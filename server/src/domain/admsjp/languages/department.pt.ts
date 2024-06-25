const pt = {
  department: {
    create: {
      keyAlreadyExists: 'Department {{name}} já existe no sistema',
    },
    find: {
      notFound: 'Não foi possível localizar o department {{key}}',
      invalidStatus:
        'Status inválido, esperado {{expectedStatus}} recebido {{receivedStatus}}',
      disable: 'Department está desativado',
    },
    update: {
      keyAlreadyExists: 'Department {{key}} já existe no sistema',
      value: 'Alterado valor do prametro',
    },
  },
}

export default pt
