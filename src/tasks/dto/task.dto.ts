import { TaskStatus } from '../task.entity';
import { IsString, IsNotEmpty } from 'class-validator';
import {
  IsIn,
  IsOptional,
  MinLength,
} from 'class-validator/types/decorator/decorators';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly title: string;

  @IsString()
  readonly description: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDTO) {
  @IsString()
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  readonly status?: TaskStatus;
}
