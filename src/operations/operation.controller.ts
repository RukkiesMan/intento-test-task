import { Controller, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Status } from './enums';
import { Operation } from './operation.entity';
import { OperationsGateway } from './operations.gateway';
import { OperationsService } from './operations.service';

@Crud({
  model: {
    type: Operation,
  },
})
@Controller('operations')
export class OperationsCrud implements CrudController<Operation> {
  constructor(
    public service: OperationsService,
    private operationsGateway: OperationsGateway,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  get base(): CrudController<Operation> {
    return this;
  }

  private logger: Logger;

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Operation,
  ) {
    const operation = await this.base.createOneBase(req, dto);

    this.schedulerRegistry.addTimeout(
      `operation_${operation.id}_status_changing`,
      setTimeout(() => {
        const status = Math.random() > 0.5 ? Status.Done : Status.Failed;
        this.service.changeStatus(operation.id, status);
        this.operationsGateway.server.emit('msgToClient', {
          id: operation.id,
          status,
        });
      }, 5000),
    );

    return operation;
  }
}
