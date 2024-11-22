import { Module } from '@nestjs/common';
import { SeoMetaService } from './seo-meta.service';
import { SeoMetaController } from './seo-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeoMeta } from './entities/seo-meta.entity';
import { Blog } from 'src/blog/entities/blog.entity';

import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SeoMetaController],
  providers: [SeoMetaService, JwtService],
  imports: [TypeOrmModule.forFeature([SeoMeta, Blog])],
})
export class SeoMetaModule {}
