/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// entities
import { Blog } from './blog/entities/blog.entity';
import { Attachment } from './attachment/entities/attachment.entity';
import { SeoMeta } from './seo-meta/entities/seo-meta.entity';

import { User } from './auth/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { SeoMetaModule } from './seo-meta/seo-meta.module';
import { AttachmentModule } from './attachment/attachment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config accessible globally without needing to import in each module
    }),

    // Configuration for Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Blog, Attachment, SeoMeta, User],
        synchronize: true,
      }),
    }),

    // Static file and upload configurations
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    AuthModule,
    BlogModule,
    SeoMetaModule,
    AttachmentModule,
  ],

  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
