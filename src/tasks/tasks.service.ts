import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { v4 } from 'uuid';

import { UpdateTaskDto, CreateTaskDTO, FilterProductsDto} from './dto/task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>
  ){}

  async getAllTask(params: FilterProductsDto) {
    if(params){
      const filters: FilterQuery<Task>= {}    
      const {limit, offset} = params;
      const {status} = params
      if(status){
         filters.status = TaskStatus
      }
      return await this.taskModel.find(filters).skip(offset).limit(limit).exec()
    }
    return await this.taskModel.find().exec();

  }

   createTask(data: CreateTaskDTO) {
    const task =  new this.taskModel(data)
    return task.save();
  }
  
  async getTaskById(id: string){
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto){
   const task = await this.taskModel.findByIdAndUpdate(id, {$set: updatedFields}, {new: true}).exec()
   if(!task){
    throw new NotFoundException(`Task #${id} not found`);
   }
   return task;
  }

  async deleteTask(id: string) {
   const task = await this.taskModel.findByIdAndRemove(id)
   return task;
  }
}
