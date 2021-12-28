import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway()
export class OperationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(@MessageBody() data: string): void {
    this.server.emit('msgToClient', data);
  }

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
