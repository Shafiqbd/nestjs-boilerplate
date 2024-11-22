import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { Attachment } from 'src/attachment/entities/attachment.entity';
import { SeoMeta } from 'src/seo-meta/entities/seo-meta.entity';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({
    description: 'Id of the blog',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;

  public attachment?: Attachment;
  public seoMeta?: SeoMeta;
}
