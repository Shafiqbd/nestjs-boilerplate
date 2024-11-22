import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AttachmentService } from './attachment.service';

import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs'; // Import the fs module
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';

@ApiBearerAuth('token')
@ApiTags('Attachment')
@Controller('attachment/upload')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = './uploads';
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const { fileType, id } = body;
    const uploadPath = `uploads/${file.filename}`;
    return this.attachmentService.saveFile(file, uploadPath, fileType, id);
  }
  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Directory to save uploaded files
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @UseGuards(AuthenticationGuard)
  update(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const { id, entityId, fileType } = body;
    const uploadPath = `uploads/${file.filename}`;
    return this.attachmentService.updateFile(
      +id,
      file,
      uploadPath,
      fileType,
      entityId,
    );
  }
}
