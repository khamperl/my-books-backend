import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Book } from '../../book/entities/book.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  externalId: string

  @OneToMany(() => Book, (book) => book.user)
  books: Book[]

  @ManyToMany(() => Book, { cascade: true })
  @JoinTable()
  booksRead: Book[]
}
