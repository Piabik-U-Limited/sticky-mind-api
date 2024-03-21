import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }
  async getUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async deleteUser(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return { message: 'User deleted successfully', user: deletedUser };
  }

  async editUserField(id: string, field: string, value) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { [field]: value },
    });
    return { message: 'User Updadated successfully', user: updatedUser };
  }
}
