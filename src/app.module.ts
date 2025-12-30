import { Module } from '@nestjs/common'
import { TypeOrmConfigService } from './config/type-orm-config/type-orm-config.service'
import { BookModule } from './modules/book/book.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { BorrowBooksModule } from './modules/borrow-books/borrow-books.module'
import { BookApiSearchModule } from './modules/book-api-search/book-api-search.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    BookModule,
    UserModule,
    BorrowBooksModule,
    BookApiSearchModule
  ],
  controllers: [],
  providers: [TypeOrmConfigService, ConfigService]
})
export class AppModule {}
