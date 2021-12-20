import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Operation } from './operation.entity';
import { OperationsService } from './operations.service';

@Crud({
  model: {
    type: Operation,
  },
})
@Controller('operations')
export class OperationsController implements CrudController<Operation> {
  constructor(public service: OperationsService) {}
}
