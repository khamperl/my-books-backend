import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common'
import { BorrowBooksService } from './borrow-books.service'
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto'

@Controller('borrow-books')
export class BorrowBooksController {
  constructor(private readonly borrowBooksService: BorrowBooksService) {}

  @Post(':lenderId/book/:bookId/receiver/:receiverId')
  async create(
    @Param('lenderId') lenderId: string,
    @Param('bookId') bookId: string,
    @Param('receiverId') receiverId: string,
    @Res() res: any
  ) {
    const newBorrow = await this.borrowBooksService.create(+bookId, +lenderId, +receiverId)
    if (newBorrow) {
      res.status(HttpStatus.CREATED).json(newBorrow)
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Book cannot be borrowed')
    }
  }

  @Get(':lenderId')
  async findAllBooksLend(@Param('lenderId') lenderId: string, @Res() res: any) {
    const books = await this.borrowBooksService.findAllLendBooks(+lenderId)
    if (books) {
      res.status(HttpStatus.OK).json(books)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Borrows cannot be found')
    }
  }

  @Get(':borrowId/borrowed')
  async findOne(@Param('borrowId') borrowId: string, @Res() res: any) {
    const books = await this.borrowBooksService.findAllBorrowedBooks(+borrowId)
    if (books) {
      res.status(HttpStatus.OK).json(books)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Borrows cannot be found')
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBorrowBookDto: UpdateBorrowBookDto,
    @Res() res: any
  ) {
    const updateBorrow = await this.borrowBooksService.update(+id, updateBorrowBookDto)
    if (updateBorrow.affected) {
      res.status(HttpStatus.OK).json(updateBorrow.raw)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Borrow cannot be updated')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: any) {
    const deleteResult = await this.borrowBooksService.remove(+id)
    if (deleteResult.affected) {
      res.status(HttpStatus.OK).json(deleteResult.raw)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Borrow cannot deleted')
    }
  }
}
