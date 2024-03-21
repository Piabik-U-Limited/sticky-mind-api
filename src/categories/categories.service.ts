import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaClient) {}
  async getCategories(userId: string) {
    return await this.prisma.category.findMany({
      where: { userId },
    });
  }
  async addCategory(dto: CategoryDto, userId: string) {
    const category = await this.prisma.category.create({
      data: {
        userId,
        name: dto.name,
        content: dto.content,
      },
    });
    return { category, message: 'category created successfully' };
  }

  async deleteCategory(id: string) {
    const deletedCategory = await this.prisma.category.delete({
      where: { id },
    });
    return {
      message: 'category deleted successfully',
      category: deletedCategory,
    };
  }

  async editCategory(id: string, dto: CategoryDto) {
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: { name: dto.name, content: dto.content },
    });
    return {
      message: 'category updated successfully',
      category: updatedCategory,
    };
  }
}
