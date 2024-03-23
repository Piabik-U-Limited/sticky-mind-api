import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaClient) {}

  async getDashboardData(userId: string) {
    let eat = new Date().toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi',
    });
    let currentDate = new Date(eat);
    let year = currentDate.getFullYear();
    let startOfDay = new Date(
      year,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    let endOfDay = new Date(
      year,
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );

    const todoTasksToday = await this.prisma.task.findMany({
      where: {
        userId,
        status: 'TODO',
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    const inProgressTasks = await this.prisma.task.findMany({
      where: { userId, status: 'IN_PROGRESS' },
    });

    const completedTasksToday = await this.prisma.task.findMany({
      where: { userId, status: 'DONE' },
    });
    let startOfMonth = new Date(year, currentDate.getMonth(), 1);
    let endOfMonth = new Date(year, currentDate.getMonth() + 1, 0);
    const todoThisMonth = await this.prisma.task.findMany({
      where: {
        userId,
        status: 'TODO',
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
    const currentDateWithoutTime = new Date(
      currentDate.toISOString().split('T')[0],
    ); // Extracting only the date part

    const overDueTasks = await this.prisma.task.findMany({
      where: {
        userId,
        status: 'TODO',
        date: {
          lt: currentDateWithoutTime, // Use 'lt' (less than) to find tasks with a date in the past
        },
      },
    });
    return {
      todoTasksToday,
      inProgressTasks,
      completedTasksToday,
      todoThisMonth,
      overDueTasks,
    };
  }
}
