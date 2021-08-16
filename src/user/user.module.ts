import { Module } from '@nestjs/common';
import { IsEmailUniqueConstraint } from './validators/is-email-unique.validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [IsEmailUniqueConstraint, UserService],
  exports: [TypeOrmModule]
})
export class UserModule {}


