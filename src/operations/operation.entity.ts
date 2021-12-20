import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Statuses {
  InProgress = 'In Progress',
  Done = 'Done',
  Failed = 'Failed',
}

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: Statuses, default: Statuses.InProgress })
  status: Statuses;
}
