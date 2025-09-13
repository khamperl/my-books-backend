import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put
} from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post(':userId')
  async create(
    @Body() createBookDto: CreateBookDto,
    @Param('userId') userId: string,
    @Res() res: any
  ) {
    const newBook = await this.bookService.create(createBookDto, +userId)
    if (newBook) {
      res.status(HttpStatus.CREATED).json(newBook)
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Book cannot be created')
    }
  }

  @Get()
  async findAll(@Res() res: any) {
    const books = await this.bookService.findAll()
    if (books) {
      res.status(HttpStatus.OK).json(books)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Books cannot be found')
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: any) {
    const book = await this.bookService.findOne(+id)
    if (book) {
      res.status(HttpStatus.OK).json(book)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Book cannot be found')
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Res() res: any) {
    const updateBook = await this.bookService.update(+id, updateBookDto)
    if (updateBook.affected) {
      res.status(HttpStatus.CREATED).json(updateBook.raw)
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Book cannot be updated')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: any) {
    const deleteBook = await this.bookService.remove(+id)
    if (deleteBook.affected) {
      res.status(HttpStatus.CREATED).json(deleteBook.raw)
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Book cannot be deleted')
    }
  }
}
