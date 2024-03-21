import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEnum,
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
  duedate: Date;

  @IsOptional()
  @IsEnum(Status, { message: 'Invalid status' })
  status: Status;

  @IsNotEmpty()
  categoryId: string;

  @IsDateString()
  duetime: Date;
}
