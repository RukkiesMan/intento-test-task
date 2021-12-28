import { Module } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationsCrud } from './operation.controller';
import { Operation } from './operation.entity';
import { OperationsGateway } from './operations.gateway';
import { OperationsService } from './operations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  providers: [OperationsService, OperationsGateway, SchedulerRegistry],
  exports: [OperationsService],
  controllers: [OperationsCrud],
})
export class OperationsModule {}
