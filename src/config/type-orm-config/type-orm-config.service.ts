import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Injectable, Logger } from '@nestjs/common'
import process from 'process'
import { config as dotenvConfig } from 'dotenv'
import { Book } from '../../modules/book/entities/book.entity'
import { User } from '../../modules/user/entities/user.entity'

dotenvConfig({ path: '.env.db' })
const env = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : 'UNKNOWN'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private logger = new Logger('TypeOrmConfigService')

  createTypeOrmOptions(): TypeOrmModuleOptions {
    this.logger.log('create db options', env)
    this.logger.log('db host', process.env['DB_HOST_' + env])
    return {
      type: 'mariadb',
      host: process.env['DB_HOST_' + env],
      port: parseInt(process.env['DB_PORT_' + env] || '3306'),
      username: process.env['DB_USER_' + env],
      password: process.env['DB_PASSWORD_' + env],
      database: process.env['DB_DATABASE_' + env],
      entities: [Book, User],
      //migrations: ['dist/migrations/*{.ts,.js}'],
      //autoLoadEntities: true,
      synchronize: true,
      logging: true
    }
  }
}

const config = new TypeOrmConfigService().createTypeOrmOptions()
export const connectionSource = new DataSource(config as DataSourceOptions)
