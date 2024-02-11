/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/siginin-userDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }
  @Post('signin')
  singIn(@Body(ValidationPipe) signinUserDto: SigninUserDto) {
    return this.userService.signin(signinUserDto);
  }
}
