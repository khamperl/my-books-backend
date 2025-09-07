import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { Author } from '../author/entities/author.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
