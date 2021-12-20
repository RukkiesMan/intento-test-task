import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Operation } from './operation.entity';

@Injectable()
export class OperationsService extends TypeOrmCrudService<Operation> {
  constructor(@InjectRepository(Operation) repo) {
    super(repo);
  }
}
