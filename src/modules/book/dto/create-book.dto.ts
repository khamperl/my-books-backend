import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateBookDto {
  @IsString()
  @MaxLength(255)
  title: string

  @IsString()
  @MaxLength(255)
  @IsOptional()
  subTitle?: string

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  pages?: number

  @IsString()
  @IsOptional()
  author?: string

  @IsString()
  @MaxLength(255)
  @IsOptional()
  publisher?: string

  @IsString()
  @MaxLength(13)
  @IsOptional()
  isbn?: string

  @IsNumber()
  @IsOptional()
  price?: number

  @IsBoolean()
  hardcover: boolean
}
