import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { Attachment } from './entities/attachment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../blog/entities/blog.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AttachmentController],
  providers: [AttachmentService, JwtService],
  imports: [TypeOrmModule.forFeature([Attachment, Blog])],
})
export class AttachmentModule {}
