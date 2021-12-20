import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationsModule } from './operations/operations.module';
import { AppGateway } from './app.gateway';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    OperationsModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
