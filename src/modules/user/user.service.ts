import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { BookService } from '../book/book.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bookService: BookService
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto)
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id })
  }

  async findOneByExtId(externalId: string) {
    return await this.userRepository.findOneBy({ externalId })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    return await this.userRepository.delete(id)
  }

  async userReadBook(userId: number, bookId: number) {
    const book = await this.bookService.findOne(bookId)
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['booksRead']
    })
    if (!user || !book) {
      throw new NotFoundException('Book or User not found')
    }

    if (!user.booksRead) {
      user.booksRead = []
    }

    if (!user.booksRead.find((book) => book.id === bookId)) {
      user.booksRead.push(book)
    }

    return await this.userRepository.save(user)
  }

  async getUserBooksRead(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['booksRead']
    })

    if (!user) {
      throw new NotFoundException('Books read for User cannot be found')
    }
    return user.booksRead
  }
}
