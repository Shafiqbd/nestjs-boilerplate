import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSeoMetaDto {
  readonly id?: string;

  @IsOptional()
  @IsNotEmpty()
  readonly title: string;

  readonly description: string;
  readonly kewords: string;
  readonly type: string;
  readonly author?: string;
  public services?: string;
  public blogs?: string;
  public setting?: string;
}
