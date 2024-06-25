import { randomUUID } from 'node:crypto'

import { Parameter } from '@prisma/client'
import { ParameterProps } from 'test/factories/make-parameter'
import { applyFilters } from 'test/utils/filtering'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ListParameterDTO } from '@/domain/admsjp/dtos/parameter'
import { ParametersRepository } from '@/domain/admsjp/repositories/parameters-repository'

export class InMemoryParametersRepository implements ParametersRepository {
  public items: Parameter[] = []

  async create(data: ParameterProps): Promise<Parameter> {
    const id = getLastInsertedId(this.items)

    const parameter = {
      id,
      uuid: randomUUID(),
      key: data.key,
      keyInfo: data.keyInfo,
      status: data.status,
      value: data.value,
      visible: data.visible,
      createdAt: new Date(),
      createdBy: data.createdBy,
      updatedAt: null,
      updatedBy: null,
    }

    this.items.push(parameter)

    return parameter
  }

  async update(data: Parameter): Promise<Parameter> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const parameter = this.items[itemIndex]

    const parameterUpdated = {
      ...parameter,
      key: data.key,
      keyInfo: data.keyInfo,
      value: data.value,
      status: data.status,
      visible: data.visible,
      updatedAt: new Date(),
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = parameterUpdated

    return parameter
  }

  async list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListParameterDTO> {
    let filteredParameters = this.items

    if (searchParams && searchParams.length > 0) {
      const searchFilter = buildSearchFilter<Parameter>(searchParams)
      filteredParameters = applyFilters<Parameter>(this.items, [searchFilter])
    }

    const { skip, take } = calcPagination(options)
    const paginatedParameters = filteredParameters.slice(skip, skip + take)

    const count = filteredParameters.length

    return { parameters: paginatedParameters, count }
  }

  async findById(id: number): Promise<Parameter> {
    const parameter = this.items.find((item) => item.id === id)

    if (!parameter) {
      return null
    }

    return parameter
  }

  async findByKey(key: string): Promise<Parameter> {
    const parameter = this.items.find((item) => item.key === key)

    if (!parameter) {
      return null
    }

    return parameter
  }
}
