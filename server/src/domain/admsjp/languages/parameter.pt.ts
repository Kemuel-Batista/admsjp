const pt = {
  parameter: {
    create: {
      keyAlreadyExists: 'Parâmetro {{key}} já existe no sistema',
    },
    find: {
      notFound: 'Não foi possível localizar o parâmetro {{key}}',
    },
    update: {
      keyAlreadyExists: 'Parâmetro {{key}} já existe no sistema',
    },
    delete: {
      hasAssociations:
        'Não foi possível deletar o parâmetro pois existem ingressos associados a esse parâmetro',
    },
  },
}

export default pt
