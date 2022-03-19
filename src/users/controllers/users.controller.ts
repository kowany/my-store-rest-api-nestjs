import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './../dtos/user.dtos';
import { UsersService } from './../services/users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get('')
  getUsers(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.usersService.getAll();
  }

  @Get(':userId')
  getOrder(@Param('userId') userId: string) {
    return this.usersService.getOne(+userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.usersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
