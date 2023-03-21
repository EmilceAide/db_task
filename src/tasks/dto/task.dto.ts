import { TaskStatus } from '../entities/task.entity';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
import {
  IsIn,
  IsOptional,
  MinLength,
  Min
} from 'class-validator';
import { PartialType, ApiProperty} from '@nestjs/swagger';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly description: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDTO) {
  @IsString()
  @IsOptional()
  @ApiProperty()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  readonly status?: TaskStatus;
}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  
  @IsOptional()
  @Min(0)
  offset: number; 

  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  status: TaskStatus;
}