import { PartialType } from '@nestjs/swagger';
import { CreateSeoMetaDto } from './create-seo-meta.dto';

export class UpdateSeoMetaDto extends PartialType(CreateSeoMetaDto) {}
