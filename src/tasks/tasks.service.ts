import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TaskDto } from './dto/task.dto';
@Injectable()
export class TasksService {
  constructor(private prisma: PrismaClient) {}

  async getTasks(userId: string) {
    return await this.prisma.task.findMany({
      where: { userId },
    });
  }
  async addTask(dto: TaskDto, userId: string) {
    const task = await this.prisma.task.create({ data: { ...dto, userId } });
    return { task, message: 'Task created successfully' };
  }

  async deleteTask(id: string) {
    const deletedTask = await this.prisma.task.delete({ where: { id } });
    return { message: 'Task deleted successfully', task: deletedTask };
  }

  async editTask(id: string, dto: TaskDto) {
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: { ...dto },
    });
    return { message: 'Task updated successfully', task: updatedTask };
  }

  //Todo tasks
  async getTodoTasks(userId: string) {
    return await this.prisma.task.findMany({
      where: { userId, status: 'TODO' },
    });
  }

  //In Progress tasks
  async getInProgressTasks(userId: string) {
    return await this.prisma.task.findMany({
      where: { userId, status: 'IN_PROGRESS' },
    });
  }
  //Completed tasks
  async getCompletedTasks(userId: string) {
    return await this.prisma.task.findMany({
      where: { userId, status: 'DONE' },
    });
  }
}
