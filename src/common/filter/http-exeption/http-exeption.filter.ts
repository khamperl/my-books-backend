import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common'

@Catch()
export class HttpExeptionFilter implements ExceptionFilter {
  private logger = new Logger('HttpExeptionFilter')
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const errorMessage: string =
      (exception as Record<string, any>).response?.message ||
      (exception as Record<string, any>).response ||
      ''
    let errorKeys: string | string[] = ''

    if (Array.isArray(errorMessage)) {
      errorKeys = errorMessage.map((item) => item.replaceAll(' ', '_').toUpperCase())
    } else {
      errorKeys = errorMessage.replaceAll(' ', '_').toUpperCase()
    }

    this.logger.error(exception)

    const errorResponse = {
      code: status,
      message: response.error,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
      errorResourceKey: errorKeys
    }

    response.status(status).json(errorResponse)
  }
}
