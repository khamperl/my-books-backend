import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from '../../book/entities/book.entity'
import { User } from '../../user/entities/user.entity'

@Entity()
export class BorrowBook {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Book)
  @JoinColumn()
  book: Book

  @OneToOne(() => User)
  @JoinColumn()
  bookOwner: User

  @OneToOne(() => User)
  @JoinColumn()
  bookReceiver: User

  @Column({ type: 'boolean', nullable: true })
  bookReturned: boolean

  @Column({ type: 'boolean', nullable: true })
  bookReceived: boolean
}
