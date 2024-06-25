import { Module } from '@nestjs/common'

import { CreateParameterUseCase } from '@/domain/admsjp/use-cases/parameters/create-parameter'
import { EditParameterUseCase } from '@/domain/admsjp/use-cases/parameters/edit-parameter'
import { FindParameterByIdUseCase } from '@/domain/admsjp/use-cases/parameters/find-parameter-by-id'
import { ListParametersUseCase } from '@/domain/admsjp/use-cases/parameters/list-parameters'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateParameterController } from './controllers/create-parameter.controller'
import { EditParameterController } from './controllers/edit-parameter.controller'
import { FindParameterByIdController } from './controllers/find-parameter-by-id.controller'
import { ListParametersController } from './controllers/list-parameters.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateParameterController,
    EditParameterController,
    FindParameterByIdController,
    ListParametersController,
  ],
  providers: [
    CreateParameterUseCase,
    EditParameterUseCase,
    FindParameterByIdUseCase,
    ListParametersUseCase,
  ],
})
export class ParameterHttpModule {}
