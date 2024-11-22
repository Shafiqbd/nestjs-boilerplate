import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum UserType {
  Allround = 'Allround',
  Bodyguard = 'Bodyguard',
}

export class SignUpDto {
  @ApiProperty({
    example: 'Enter user name',
    description: 'User name will be like John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Enter email',
    description: 'Email will be like 0L2kW@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter valid email' })
  readonly email: string;

  @ApiProperty({
    example: 'Enter password',
    description: 'Password will be like 123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiPropertyOptional({
    example: 'Type must be either Allround or Bodyguard',
    description: 'Type must be either Allround or Bodyguard',
  })
  @IsOptional()
  @IsEnum(UserType, { message: 'Type must be either Allround or Bodyguard' })
  readonly type: UserType;
}
