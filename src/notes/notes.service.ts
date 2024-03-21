import { Injectable } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class NotesService {
  constructor(private prisma: PrismaClient) {}

  async getNotes(userId: string) {
    return await this.prisma.note.findMany({
      where: { userId },
    });
  }
  async addNote(dto: NoteDto, userId: string) {
    const task = await this.prisma.note.create({ data: { ...dto, userId } });
    return { task, message: 'Note created successfully' };
  }

  async deleteNote(id: string) {
    const deletedTask = await this.prisma.note.delete({ where: { id } });
    return { message: 'Note deleted successfully', task: deletedTask };
  }

  async editNote(id: string, dto: NoteDto) {
    const updatedTask = await this.prisma.note.update({
      where: { id },
      data: { ...dto },
    });
    return { message: 'Note updated successfully', task: updatedTask };
  }
}
