import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    try {
      const res = await this.blogRepository.save(createBlogDto);
      if (res) {
        return {
          message: 'Data created successfully',
          statusCode: 200,
          data: res,
        };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const res = await this.blogRepository.find({
        order: {
          createdAt: 'DESC',
        },
        relations: {
          attachment: true,
          seoMeta: true,
        },
      });
      const data = {
        message: 'Data get successfully',
        statusCode: 200,
        data: res,
      };
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(slug: string) {
    try {
      const res = await this.blogRepository.findOne({
        where: { slug },
        relations: {
          attachment: true,
          seoMeta: true,
        },
      });
      const data = {
        message: 'Data get successfully',
        statusCode: 200,
        data: res,
      };
      return data;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    try {
      const entity = await this.blogRepository.findOneBy({ id });
      if (!entity) {
        throw new NotFoundException('Data not found');
      }

      delete updateBlogDto.attachment;
      delete updateBlogDto.seoMeta;
      await this.blogRepository.update(id, updateBlogDto);
      const updateData = await this.blogRepository.findOneBy({ id });
      return {
        message: 'Data updated successfully',
        statusCode: 200,
        data: updateData,
      };
    } catch (error) {
      return {
        message: error.message || 'Data update failed',
        statusCode: error.status || 500,
        error: error.message || error,
      };
    }
  }

  async remove(id: number) {
    try {
      const entity = await this.blogRepository.findOneBy({ id });
      if (!entity) {
        throw new NotFoundException('Data not found');
      }

      await this.blogRepository.delete(id);

      return {
        message: 'Data deleted successfully',
        statusCode: 200,
        data: entity,
      };
    } catch (error) {
      return {
        message: error.message || 'Data deletion failed',
        statusCode: error.status || 500,
        error: error.message || error,
      };
    }
  }
}
