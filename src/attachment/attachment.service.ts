import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async saveFile(
    file: Express.Multer.File,
    uploadPath: string,
    fileType: string,
    id: number,
  ): Promise<CreateAttachmentDto> {
    // Check if file size exceeds the limit (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds the limit of 2MB.');
    }

    const newFile = this.attachmentRepository.create({
      name: file.originalname,
      mimetype: file.mimetype,
      path: uploadPath,
      fileType: fileType,
      size: file.size,
    });

    try {
      if (fileType === 'blog') {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
          throw new BadRequestException('Blog not found');
        }
        newFile.blogs = blog;
      } else {
        throw new BadRequestException('Invalid entity type');
      }

      const res = await this.attachmentRepository.save(newFile);
      return {
        message: 'File uploaded successfully',
        statusCode: 200,
        data: res,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message || 'File upload failed',
        statusCode: error.status || 500,
        error: error.message || error,
      });
    }
  }

  async updateFile(
    id: number,
    file: Express.Multer.File,
    uploadPath: string,
    fileType: string,
    entityId: number,
  ): Promise<CreateAttachmentDto> {
    // Find the file entity in the database
    const existingFile = await this.attachmentRepository.findOne({
      where: { id: entityId },
    });

    if (!existingFile) {
      throw new NotFoundException('File not found');
    }

    // Check if file size exceeds the limit (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds the limit of 2MB.');
    }

    existingFile.name = file.originalname;
    existingFile.mimetype = file.mimetype;
    existingFile.path = uploadPath;
    existingFile.fileType = fileType;
    existingFile.size = file.size;

    try {
      if (fileType === 'blog') {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
          throw new BadRequestException('Blog not found');
        }
        existingFile.blogs = blog;
      } else {
        throw new BadRequestException('Invalid entity type');
      }

      const res = await this.attachmentRepository.save(existingFile);
      return {
        message: 'File Updated successfully',
        statusCode: 200,
        data: res,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message || 'File upload failed',
        statusCode: error.status || 500,
        error: error.message || error,
      });
    }
  }
}
