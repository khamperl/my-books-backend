import { Module } from '@nestjs/common'
import { TypeOrmConfigService } from './config/type-orm-config/type-orm-config.service'
import { BookModule } from './modules/book/book.module'
import { AuthorModule } from './modules/author/author.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),

    BookModule,
    AuthorModule,
    UserModule
  ],
  controllers: [],
  providers: [TypeOrmConfigService, ConfigService]
})
export class AppModule {}
