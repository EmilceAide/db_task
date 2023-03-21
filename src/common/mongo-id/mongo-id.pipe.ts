import { ArgumentMetadata, BadGatewayException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId, IsMongoId } from 'class-validator';
@Injectable()

export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!isMongoId(value)){
      throw new BadGatewayException(`${value} not is a mongoId`)
    }
    return value;
  }
}
