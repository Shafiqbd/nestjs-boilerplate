import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeoMeta } from './entities/seo-meta.entity';
import { Repository } from 'typeorm';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class SeoMetaService {
  constructor(
    @InjectRepository(SeoMeta)
    private readonly seoRepository: Repository<SeoMeta>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}
  async create(body: any) {
    const { id, type } = body;
    let dto = this.seoRepository.create({});
    dto = body;

    try {
      if (type === 'blog') {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
          throw new BadRequestException('Blog not found');
        }
        dto.blogs = blog;
      }
      const res = await this.seoRepository.save(dto);
      const data = {
        message: 'Data created successfully',
        statusCode: 200,
        data: res,
      };
      return data;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, body: any) {
    const { id: updateId, type } = body;
    const updateObj = await this.seoRepository.findOne({
      where: { id: id },
    });

    if (!updateObj) {
      throw new NotFoundException('Data not found');
    }

    updateObj.title = body.title;
    updateObj.description = body.description;
    updateObj.keywords = body.keywords;

    try {
      if (type === 'blog') {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
          throw new BadRequestException('Blog not found');
        }
        updateObj.blogs = blog;
      }
      const res = await this.seoRepository.save(updateObj);
      const data = {
        message: 'Data update successfully',
        statusCode: 200,
        data: res,
      };
      return data;
    } catch (error) {
      return error;
    }
  }

  async findAll(type?: string, id?: string) {
    try {
      const whereClause: any = {};
      if (type) {
        whereClause.type = type;
      }
      if (id) {
        whereClause.id = id;
      }

      const res = await this.seoRepository.find({
        order: {
          createdAt: 'DESC',
        },
        where: whereClause,
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
}
