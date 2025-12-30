import { Module } from '@nestjs/common'
import { BookApiSearchService } from './book-api-search.service'
import { BookApiSearchController } from './book-api-search.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  exports: [BookApiSearchService],
  controllers: [BookApiSearchController],
  providers: [BookApiSearchService]
})
export class BookApiSearchModule {}
