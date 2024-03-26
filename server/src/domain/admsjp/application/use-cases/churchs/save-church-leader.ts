import { Either, failure, success } from '@/core/either'
import { ChurchsRepository } from '../../repositories/churchs-repository'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ChurchLeaders } from '@/domain/admsjp/enterprise/entities/church-leaders'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ChurchLeadersList } from '@/domain/admsjp/enterprise/entities/church-leaders-list'

interface SaveChurchLeaderUseCaseRequest {
  churchId: string
  leaders: {
    name: string
    functionName: string
    phone: string
    email: string
  }[]
}

type SaveChurchLeaderUseCaseResponse = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class SaveChurchLeaderUseCase {
  constructor(private churchsRepository: ChurchsRepository) {}

  async execute({
    churchId,
    leaders,
  }: SaveChurchLeaderUseCaseRequest): Promise<SaveChurchLeaderUseCaseResponse> {
    const church = await this.churchsRepository.findById(churchId)

    if (!church) {
      return failure(new ResourceNotFoundError('Church'))
    }

    const churchLeaders = leaders.map((leader) => {
      return ChurchLeaders.create({
        churchId: new UniqueEntityID(churchId),
        email: leader.email,
        name: leader.name,
        phone: leader.phone,
        functionName: leader.functionName,
      })
    })

    church.leaders = new ChurchLeadersList(churchLeaders)

    await this.churchsRepository.save(church)

    return success(null)
  }
}
