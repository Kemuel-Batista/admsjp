import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { UserStatus } from '@/domain/admsjp/enums/user'
import { RegisterUserUseCase } from '@/domain/admsjp/use-cases/user/register-user'
import { Public } from '@/infra/auth/public'
import { logger } from '@/infra/config/winston-config'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const RegisterUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(50),
  password: z.string().min(6).max(20),
  photo: z.string().optional(),
  departmentId: z.string().uuid(),
  profileId: z.string().uuid(),
  status: z.nativeEnum(UserStatus),
})

type RegisterUserBodySchema = z.infer<typeof RegisterUserSchema>

const bodyValidationPipe = new ZodValidationPipe(RegisterUserSchema)

@Controller('/')
@Public()
export class RegisterUserController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body(bodyValidationPipe) body: RegisterUserBodySchema) {
    const {
      email,
      name,
      password,
      photo,
      status = UserStatus.ACTIVE,
      departmentId,
      profileId,
    } = body

    const result = await this.registerUser.execute({
      email,
      name,
      password,
      photo,
      status,
      departmentId,
      profileId,
      provider: 'system',
    })

    if (result.isError()) {
      const error = result.value
      logger.error(`Create User Error - ${error.message}`)

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
