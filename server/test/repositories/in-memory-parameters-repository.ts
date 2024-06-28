import { randomUUID } from 'node:crypto'

import { Parameter } from '@prisma/client'
import { ParameterProps } from 'test/factories/make-parameter'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ParametersRepository } from '@/domain/admsjp/repositories/parameters-repository'

export class InMemoryParametersRepository implements ParametersRepository {
  public items: Parameter[] = []

  async create(data: ParameterProps): Promise<Parameter> {
    const parameter = {
      id: randomUUID(),
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

  async list(options?: ListOptions): Promise<Parameter[]> {
    const { skip, take } = calcPagination(options)

    const parameters = this.items.slice(skip, skip + take)

    return parameters
  }

  async findById(id: Parameter['id']): Promise<Parameter> {
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
