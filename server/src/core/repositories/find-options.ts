import HttpStatusCode from '../enums/HttpStatusCode'

interface IFindOptions {
  throwIfFound?: boolean // Se verdadeiro, lança um erro se o registro for encontrado.
  throwIfNotFound?: boolean // Se verdadeiro, lança um erro se o registro não for encontrado.
  errorKeyFound?: string // Chave da mensagem de erro a ser exibida quando o registro for encontrado.
  errorKeyNotFound?: string // Chave da mensagem de erro a ser exibida quando o registro não for encontrado.
  errorCodeFound?: HttpStatusCode // Código de erro HTTP a ser retornado quando o registro for encontrado. (default: 400)
  errorCodeNotFound?: HttpStatusCode // Código de erro HTTP a ser retornado quando o registro não for encontrado. (default: 404)
}

export type { IFindOptions }
