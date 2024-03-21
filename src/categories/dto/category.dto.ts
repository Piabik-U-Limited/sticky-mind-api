import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsOptional()
  published: Boolean;
}
