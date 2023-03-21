import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { MongoIdPipe } from "../../common/mongo-id/mongo-id.pipe";
import { TasksService } from '../tasks.service';
import { CreateTaskDTO, UpdateTaskDto, FilterProductsDto } from '../dto/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTask(@Query() params: FilterProductsDto) {
    return this.tasksService.getAllTask(params);
  }

  @Get(':taskId')
  @HttpCode(HttpStatus.ACCEPTED)
  getTaskbyId(@Param('taskId', MongoIdPipe) taskId: string){
    return this.tasksService.getTaskById(taskId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() newTask: CreateTaskDTO) {
    return this.tasksService.createTask(newTask);
  }

  @Patch(':id')
  updateTask(@Param('id', MongoIdPipe) id: string, @Body() updatedFields: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updatedFields);
  }

  @Delete(':id')
  deleteTask(@Param('id', MongoIdPipe) id: string) {
   return this.tasksService.deleteTask(id);
  }
}
