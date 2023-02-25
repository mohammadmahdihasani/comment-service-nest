import { Module } from '@nestjs/common';
import { dotEnvConfig, mongoConfig } from 'configs';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [dotEnvConfig,mongoConfig, UsersModule, CommentsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
