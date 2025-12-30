import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './book.entity'

@Entity()
export class BookType {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @OneToMany(() => Book, (book) => book.user)
  books: Book[]
}
