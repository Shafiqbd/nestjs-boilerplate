import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    example: 'Blog title',
    description: 'Blog title',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Enter slug',
    description: 'slug will be like blog-title',
  })
  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @ApiProperty({
    example: 'Enter blog content',
    description: 'Content will be html value',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiPropertyOptional({
    example: 'Enter short description',
    description: 'Short description will be like blog content',
  })
  @IsOptional()
  @IsString()
  readonly shortDescription: string;

  @ApiPropertyOptional({
    example: 'Enter author name',
    description: 'Author name',
  })
  @IsOptional()
  @IsString()
  readonly author: string;
}
