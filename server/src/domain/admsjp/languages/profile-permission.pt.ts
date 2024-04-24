const pt = {
  profilePermission: {
    create: {
      default: 'Criado permissão de acesso',
      keyAlreadyExists: 'Permissão de acesso {{keyName}} já existe no sistema',
    },
    find: {
      notFound: 'Não foi possível localizar o permissão de acesso {{keyName}}',
      invalidStatus:
        'Status inválido, esperado {{expectedStatus}} recebido {{receivedStatus}}',
      disable: 'Permissão de acesso está desativado',
    },
    update: {
      keyAlreadyExists: 'Permissão de acesso {{keyName}} já existe no sistema',
      value: 'Alterado valor do prametro',
    },
  },
}

export default pt
