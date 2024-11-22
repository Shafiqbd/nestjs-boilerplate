import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Attachment } from '../attachment/entities/attachment.entity';
import { SeoMeta } from '../seo-meta/entities/seo-meta.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BlogController],
  providers: [BlogService, JwtService],
  imports: [TypeOrmModule.forFeature([Blog, Attachment, SeoMeta])],
})
export class BlogModule {}
