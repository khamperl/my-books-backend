import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'
import { User } from '../user/entities/user.entity'
import { BookType } from './entities/book-type.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(BookType)
    private readonly bookTypeRepository: Repository<BookType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createBookDto: CreateBookDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found, book could not be created`)
    }
    const book = {
      ...createBookDto,
      user: user
    }
    return this.bookRepository.save(book)
  }

  async findAll() {
    return await this.bookRepository.find()
  }

  async findAllTypes() {
    return await this.bookTypeRepository.find()
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
