import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import axios from 'axios'
import { GoogleBooksResponse } from './dto/google-book-response.dto'
import { ConfigService } from '@nestjs/config'
import { SearchBookDtoBookDto } from './dto/search-book.dto'
import { OpenLibrarySearchResponse } from './dto/open-library-book-response.dto'

@Injectable()
export class BookApiSearchService {
  private logger = new Logger('BookApiSearchService')
  constructor(private configService: ConfigService) {}

  async searchGoogleWithIsbn(isbn: string) {
    const api = this.configService.get<string>('GOOGLE_API')
    const apiKey = this.configService.get<string>('GOOGLE_BOOKS_API')

    if (!apiKey || !api) {
      this.logger.log('No api key for Google found')
      return
    }
    return axios.get<GoogleBooksResponse>(`${api}?q=+isbn:${isbn}&key=${apiKey}`)
  }

  async searchOpenLibraryWithIsbn(isbn: string) {
    const api = this.configService.get<string>('OPEN_LIBRARY_API')

    if (!api) {
      this.logger.log('No api for open library found')
      return
    }
    return axios.get<OpenLibrarySearchResponse>(`${api}?q=+isbn:${isbn}`)
  }

  async searchWithIsbn(isbn: string) {
    const googleBookData = await this.searchGoogleWithIsbn(isbn)

    if (googleBookData && googleBookData.data && googleBookData.data.totalItems > 0) {
      for (const book of googleBookData.data.items) {
        if (!book.volumeInfo.imageLinks) {
          const openLibraryBookData = await this.searchOpenLibraryWithIsbn(isbn)
          if (
            openLibraryBookData &&
            openLibraryBookData.data &&
            openLibraryBookData.data.numFound > 0
          ) {
            book.volumeInfo.imageLinks = {
              thumbnail:
                'https://covers.openlibrary.org/b/olid/' +
                openLibraryBookData.data.docs[0].cover_edition_key +
                '-L'
            }
          }
        }
      }
      return this.mapGoogleBooks(googleBookData.data)
    } else {
      const openLibraryBookData = await this.searchOpenLibraryWithIsbn(isbn)

      if (!openLibraryBookData) {
        this.logger.log('No book found')
        throw new NotFoundException('No book found in apis')
      } else {
        return this.mapOpenLibraryBooks(openLibraryBookData.data)
      }
    }
  }

  mapGoogleBooks(book: GoogleBooksResponse): SearchBookDtoBookDto[] {
    const mappedDto: SearchBookDtoBookDto[] = []
    book.items.forEach((item) => {
      mappedDto.push({
        title: item.volumeInfo.title,
        subTitle: item.volumeInfo.subtitle,
        pages: item.volumeInfo.pageCount,
        author: item.volumeInfo.authors,
        isbn: item.volumeInfo.industryIdentifiers,
        publishedAt: item.volumeInfo.publishedDate,
        cover: item.volumeInfo.imageLinks?.thumbnail
      })
    })
    return mappedDto
  }

  mapOpenLibraryBooks(book: OpenLibrarySearchResponse): SearchBookDtoBookDto[] {
    const mappedDto: SearchBookDtoBookDto[] = []
    book.docs.forEach((item) => {
      mappedDto.push({
        title: item.title,
        subTitle: undefined,
        pages: undefined,
        author: item.author_name,
        isbn: undefined,
        publishedAt: item.first_publish_year + '',
        cover: item.cover_edition_key
          ? 'https://covers.openlibrary.org/b/olid/' + item.cover_edition_key + '-L'
          : undefined
      })
    })
    return mappedDto
  }
}
