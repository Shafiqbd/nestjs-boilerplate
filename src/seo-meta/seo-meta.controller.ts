import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { SeoMetaService } from './seo-meta.service';
import { CreateSeoMetaDto } from './dto/create-seo-meta.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';

@ApiBearerAuth('token')
@ApiTags('Seo Meta')
@Controller('seo-meta')
export class SeoMetaController {
  constructor(private readonly seoMetaService: SeoMetaService) {}
  @UseGuards(AuthenticationGuard)
  @Post()
  create(@Body() body: CreateSeoMetaDto) {
    // Check if body is empty
    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('Empty data cannot be saved');
    }

    return this.seoMetaService.create(body);
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.seoMetaService.update(id, body);
  }

  @Get()
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: String })
  findAll(@Query('type') type?: string, @Query('id') id?: string) {
    return this.seoMetaService.findAll(type, id);
  }
}
