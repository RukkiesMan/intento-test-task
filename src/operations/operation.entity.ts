import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './enums';

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: Status, default: Status.InProgress })
  status: Status;
}
