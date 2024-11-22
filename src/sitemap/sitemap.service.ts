import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSitemapDto } from './dto/create-sitemap.dto';
import { UpdateSitemapDto } from './dto/update-sitemap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitemap } from './entities/sitemap.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(Sitemap)
    private readonly serviceAreaRepo: Repository<Sitemap>,
  ) {}

  async create(createSitemapDto: CreateSitemapDto) {
    try {
      const res = await this.serviceAreaRepo.save(createSitemapDto);
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
      const res = await this.serviceAreaRepo.find({
        order: {
          createdAt: 'DESC',
        },
      });
      return {
        message: 'Data get successfully',
        statusCode: 200,
        data: res,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceArea`;
  }

  async update(id: number, updateSitemapDto: UpdateSitemapDto) {
    try {
      const entity = await this.serviceAreaRepo.findOneBy({ id });
      if (!entity) {
        throw new NotFoundException('Data not found');
      }

      await this.serviceAreaRepo.update(id, updateSitemapDto);
      const updateData = await this.serviceAreaRepo.findOneBy({ id });
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
      const entity = await this.serviceAreaRepo.findOneBy({ id });
      if (!entity) {
        throw new NotFoundException('Data not found');
      }

      await this.serviceAreaRepo.delete(id);

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
