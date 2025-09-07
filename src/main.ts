import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { HttpExeptionFilter } from './common/filter/http-exeption/http-exeption.filter'

async function loadSettings() {
  global.GlobalEnv = process.env.NODE_ENV?.toUpperCase() || 'test'
  console.log('Settings: ', global.GlobalEnv)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api/v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExeptionFilter())

  await app.listen(process.env.PORT ?? 3000)
}
loadSettings()
bootstrap()
