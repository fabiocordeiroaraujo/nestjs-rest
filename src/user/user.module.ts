import { Module } from '@nestjs/common';
import { IsEmailUniqueConstraint } from './validators/is-email-unique.validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, IsEmailUniqueConstraint]
})
export class UserModule {}


