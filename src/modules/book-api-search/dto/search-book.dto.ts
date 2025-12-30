import { IndustryIdentifier } from './google-book-response.dto'

export class SearchBookDtoBookDto {
  title: string
  subTitle?: string
  pages?: number
  author?: string[]
  isbn?: IndustryIdentifier[]
  publishedAt?: string
  cover?: string
}
