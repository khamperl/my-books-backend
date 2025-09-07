import { Module } from '@nestjs/common'
import { TypeOrmConfigService } from './config/type-orm-config/type-orm-config.service'
import { BookModule } from './modules/book/book.module'
import { AuthorModule } from './modules/author/author.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),

    BookModule,
    AuthorModule
  ],
  controllers: [],
  providers: [TypeOrmConfigService, ConfigService]
})
export class AppModule {}
