import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { BookApiSearchService } from './book-api-search.service'

@Controller('book-search')
export class BookApiSearchController {
  constructor(private readonly bookSearchService: BookApiSearchService) {}

  @Get('/isbn/:isbn')
  async getBookByIsbn(@Param('isbn') isbn: string, @Res() res: any) {
    const book = await this.bookSearchService.searchWithIsbn(isbn)
    if (book) {
      res.status(HttpStatus.OK).json(book)
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Book cannot be found in Apis')
    }
  }
}
