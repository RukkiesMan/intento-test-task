import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Status } from './enums';
import { Operation } from './operation.entity';

@Injectable()
export class OperationsService extends TypeOrmCrudService<Operation> {
  constructor(@InjectRepository(Operation) repo) {
    super(repo);
  }

  changeStatus(operationId: number, status: Status) {
    this.repo.update(operationId, { status });
  }
}
