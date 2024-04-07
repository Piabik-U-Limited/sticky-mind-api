import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDto } from './dto/note.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtTokenService } from '../auth/jwt/jwt-token.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Notes')
@ApiBearerAuth()
export class NotesController {
  constructor(
    private notesService: NotesService,
    private jwt: JwtTokenService,
  ) {}

  //add Note
  @Post()
  @ApiBody({ type: NoteDto })
  @ApiResponse({ status: 201, description: 'Note created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async addNote(
    @Req() request,

    @Body() dto: NoteDto,
  ) {
    const token = request.headers.authorization?.split(' ')[1];
    const userId = await this.jwt.getUserIdFromToken(token);
    return await this.notesService.addNote(dto, userId);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all Notes' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getNotes(@Req() request) {
    const token = request.headers.authorization?.split(' ')[1];
    const userId = await this.jwt.getUserIdFromToken(token);
    // (userId);
    return await this.notesService.getNotes(userId);
  }
  //get one
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Note retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getNote(@Param('id') id: string) {
    return await this.getNote(id);
  }

  //delete
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Note deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteNote(@Param('id') id: string) {
    return await this.notesService.deleteNote(id);
  }

  //edit
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Note deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async edit(@Body() dto: NoteDto, @Param('id') id: string) {
    return await this.notesService.editNote(id, dto);
  }
}
