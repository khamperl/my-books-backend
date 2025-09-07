import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
  externalId7: string
}
