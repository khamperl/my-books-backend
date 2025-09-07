import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from '../../book/entities/book.entity'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @OneToMany(() => Book, (book: Book) => book.author)
  books: Book
}
