import { Module } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sitemap } from './entities/sitemap.entity';

@Module({
  controllers: [SitemapController],
  providers: [SitemapService],
  imports: [TypeOrmModule.forFeature([Sitemap])],
})
export class SitemapModule {}
