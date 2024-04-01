import { PaginationParams } from '@/core/repositories/paginations-params'
import { ChurchsRepository } from '@/domain/admsjp/application/repositories/churchs-repository'
import { Church } from '@/domain/admsjp/enterprise/entities/church'
import { ChurchDetails } from '@/domain/admsjp/enterprise/entities/value-objects/church-details'

export class InMemoryChurchsRepository implements ChurchsRepository {
  public items: Church[] = []

  async findById(id: string): Promise<Church> {
    const newBeliever = this.items.find((item) => item.id.toString() === id)

    if (!newBeliever) {
      return null
    }

    return newBeliever
  }

  async findDetailsById(id: string): Promise<ChurchDetails> {
    throw new Error('Method not implemented.')
  }

  async findByName(name: string, id?: string): Promise<Church> {
    const newBeliever = this.items.find(
      (item) => item.name === name && item.id.toString() !== id,
    )

    if (!newBeliever) {
      return null
    }

    return newBeliever
  }

  async findByUsername(username: string): Promise<Church> {
    const newBeliever = this.items.find((item) => item.username === username)

    if (!newBeliever) {
      return null
    }

    return newBeliever
  }

  async findMany({ page }: PaginationParams): Promise<Church[]> {
    const churchs = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return churchs
  }

  async create(church: Church): Promise<void> {
    this.items.push(church)
  }

  async save(church: Church): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === church.id)

    this.items[itemIndex] = church
  }

  async delete(church: Church): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === church.id)

    this.items.splice(itemIndex, 1)
  }
}
