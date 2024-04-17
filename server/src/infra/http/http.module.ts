import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'

import { ProfileHttpModule } from '@/domain/profile/http/profile-http.module'
import { AuthHttpModule } from '@/domain/user/http/auth-http.module'
import { UserHttpModule } from '@/domain/user/http/user-http.module'

@Module({
  imports: [
    AuthHttpModule,
    RouterModule.register([{ path: 'auth', module: AuthHttpModule }]),
    UserHttpModule,
    RouterModule.register([{ path: 'users', module: UserHttpModule }]),
    ProfileHttpModule,
    RouterModule.register([{ path: 'profile', module: ProfileHttpModule }]),
  ],
})
export class HttpModule {}
