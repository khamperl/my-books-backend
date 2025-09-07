import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Author } from '../../author/entities/author.entity'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  subTitle: string

  @Column({ type: 'varchar', length: 1024, nullable: true })
  description: string

  @Column({ type: 'int', nullable: true })
  pages: number

  @ManyToOne(() => Author, (author: Author) => author.books)
  author: Author

  @Column({ type: 'varchar', length: 255, nullable: true })
  publisher: string

  @Column({ type: 'varchar', length: 13, nullable: false })
  isbn: string

  @Column({ type: 'double', nullable: true })
  price: number

  @Column({ type: 'boolean', default: false })
  hardcover: boolean
}
