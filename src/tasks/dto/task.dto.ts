import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEnum,
  IsTimeZone,
  IsNumber,
} from 'class-validator';
import { Status } from '@prisma/client';
export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsOptional()
  date: Date;

  @IsOptional()
  @IsEnum(Status, { message: 'Invalid status' })
  status: Status;

  @IsNotEmpty()
  categoryId: string;

  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsNumber()
  priority: number;
}
