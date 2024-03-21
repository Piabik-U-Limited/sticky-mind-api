import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoriesModule,
    TasksModule,
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
