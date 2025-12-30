export interface GoogleBooksResponse {
  kind: string
  totalItems: number
  items: VolumeItem[]
}

export interface VolumeItem {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
}

export interface VolumeInfo {
  title: string
  subtitle?: string
  authors?: string[]
  publishedDate?: string
  industryIdentifiers?: IndustryIdentifier[]
  readingModes?: ReadingModes
  pageCount?: number
  printType?: string
  maturityRating?: string
  allowAnonLogging?: boolean
  contentVersion?: string
  imageLinks?: ImageLinks
  language?: string
  previewLink?: string
  infoLink?: string
  canonicalVolumeLink?: string
}

export interface IndustryIdentifier {
  type: string
  identifier: string
}

export interface ReadingModes {
  text: boolean
  image: boolean
}

export interface ImageLinks {
  smallThumbnail?: string
  thumbnail?: string
}

export interface SaleInfo {
  country: string
  saleability: string
  isEbook: boolean
}

export interface AccessInfo {
  country: string
  viewability: string
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: string
  epub: Availability
  pdf: Availability
  webReaderLink: string
  accessViewStatus: string
  quoteSharingAllowed: boolean
}

export interface Availability {
  isAvailable: boolean
}
