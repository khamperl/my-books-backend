import { Injectable } from '@nestjs/common'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  async create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto)
  }

  async findAll() {
    return await this.bookRepository.find()
  }

  async findOne(id: number) {
    return await this.bookRepository.findOneBy({ id })
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.update(id, updateBookDto)
  }

  async remove(id: number) {
    return await this.bookRepository.delete(id)
  }
}
