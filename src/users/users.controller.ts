import { Controller, Get, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt-user'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  profile(@Req() req: Request) {
    const { _id }: any = req.user;
    return this.usersService.profile(_id);
  }
}
