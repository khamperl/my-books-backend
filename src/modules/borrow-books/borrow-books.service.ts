import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { BorrowBook } from './entities/borrow-book.entity'
import { Repository } from 'typeorm'
import { Book } from '../book/entities/book.entity'

@Injectable()
export class BorrowBooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BorrowBook)
    private readonly borrowBookRepository: Repository<BorrowBook>
  ) {}

  async create(bookId: number, bookLenderId: number, bookReceiverId: number) {
    const book = await this.bookRepository.findOneBy({ id: bookId })
    const bookLender = await this.userRepository.findOneBy({ id: bookLenderId })
    const bookReceiver = await this.userRepository.findOneBy({ id: bookReceiverId })

    if (!book || !bookLender || !bookReceiver) {
      throw new NotFoundException('Book or User does not exist')
    }
    console.log(bookId)

    const newBorrow: Partial<BorrowBook> = {
      book: book,
      bookOwner: bookLender,
      bookReceiver: bookReceiver
    }
    return await this.borrowBookRepository.save(newBorrow)
  }

  async findAllLendBooks(bookLenderId: number) {
    const bookLender = await this.userRepository.findOneBy({ id: bookLenderId })
    if (!bookLender) {
      throw new NotFoundException('User not found')
    }
    return await this.borrowBookRepository.find({
      where: { bookOwner: bookLender },
      relations: {
        book: true,
        bookReceiver: true
      }
    })
  }

  async findAllBorrowedBooks(bookReceiverId: number) {
    const bookReceiver = await this.userRepository.findOneBy({ id: bookReceiverId })
    if (!bookReceiver) {
      throw new NotFoundException('User not found')
    }
    return await this.borrowBookRepository.find({
      where: { bookReceiver: bookReceiver },
      relations: {
        book: true,
        bookOwner: true
      }
    })
  }

  async update(id: number, updateBorrowBookDto: UpdateBorrowBookDto) {
    const updateBorrowData = new BorrowBook()
    if (updateBorrowBookDto.book) {
      const book = await this.bookRepository.findOneBy({ id: updateBorrowBookDto.book })
      if (!book) {
        throw new NotFoundException('Book does not exist')
      }
      updateBorrowData.book = book
    }

    if (updateBorrowBookDto.bookReceiver) {
      const user = await this.userRepository.findOneBy({ id: updateBorrowBookDto.bookReceiver })
      if (!user) {
        throw new NotFoundException('User does not exist')
      }
      updateBorrowData.bookReceiver = user
    }

    if (updateBorrowBookDto.bookOwner) {
      const user = await this.userRepository.findOneBy({ id: updateBorrowBookDto.bookOwner })
      if (!user) {
        throw new NotFoundException('User does not exist')
      }
      updateBorrowData.bookOwner = user
    }
    updateBorrowData.bookReturned = updateBorrowBookDto.bookReturned || false
    updateBorrowData.bookReceived = updateBorrowBookDto.bookReceived || false

    return await this.borrowBookRepository.update(id, updateBorrowData)
  }

  async remove(id: number) {
    return await this.borrowBookRepository.delete(id)
  }
}
