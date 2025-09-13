import { Module } from '@nestjs/common'
import { BorrowBooksService } from './borrow-books.service'
import { BorrowBooksController } from './borrow-books.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BorrowBook } from './entities/borrow-book.entity'
import { User } from '../user/entities/user.entity'
import { Book } from '../book/entities/book.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BorrowBook, User, Book])],
  controllers: [BorrowBooksController],
  providers: [BorrowBooksService]
})
export class BorrowBooksModule {}
