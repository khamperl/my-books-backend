import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const newUser = await this.userService.create(createUserDto)
    if (newUser) {
      res.status(HttpStatus.CREATED).json(newUser)
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('User cannot be created')
    }
  }

  @Get()
  async findAll(@Res() res: any) {
    const users = await this.userService.findAll()
    res.status(HttpStatus.OK).json(users)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: any) {
    const user = await this.userService.findOne(+id)
    if (user) {
      res.status(HttpStatus.OK).json(user)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('User cannot be found')
    }
  }

  @Get('/ext/:id')
  async findOneByExtId(@Param('id') id: string, @Res() res: any) {
    const user = await this.userService.findOneByExtId(id)
    if (user) {
      res.status(HttpStatus.OK).json(user)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('User cannot be found')
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: any) {
    const updateUser = await this.userService.update(+id, updateUserDto)
    if (updateUser.affected) {
      res.status(HttpStatus.OK).json(updateUser.raw)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('User cannot be updated')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: any) {
    const deleteUser = await this.userService.remove(+id)
    if (deleteUser.affected) {
      res.status(HttpStatus.OK).json(deleteUser.raw)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('User cannot be deleted')
    }
  }

  @Put(':userId/book/:bookId')
  async addBookReadToUser(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
    @Res() res: any
  ) {
    const addBookToUser = await this.userService.userReadBook(+userId, +bookId)
    if (addBookToUser) {
      res.status(HttpStatus.CREATED).json(addBookToUser)
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Book cannot added to User')
    }
  }

  @Get(':userId/book')
  async getBooksReadByUserId(@Param('userId') userId: string, @Res() res: any) {
    const booksRead = await this.userService.getUserBooksRead(+userId)
    res.status(HttpStatus.OK).json(booksRead)
  }
}
