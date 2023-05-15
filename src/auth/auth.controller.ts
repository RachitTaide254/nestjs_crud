import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.model';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDto: User) {
    return this.authService.signup(userDto);
  }

  @Get('allusers')
  async allUsers(){
    return this.authService.allUsers();
  }

  @Post('signin')
  async signin(@Body() userDto: User) {
    return this.authService.signin(userDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('user/delete')
  async delete_User(@Body() userDto: User, @Req() req: Request) {
    return this.authService.deleteUser(userDto);
  }

  @Put('user/edit')
  async editUser(@Body() userDto: User) {
    return this.authService.editUser(userDto);
  }
}
