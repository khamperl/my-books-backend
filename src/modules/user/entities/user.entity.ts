import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToMany(() => Book, (book) => book.userBorrowed)
  lendBooks: Book[]

  @ManyToMany(() => Book, { cascade: true })
  @JoinTable()
  booksRead: Book[]
}
