import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer ,ConnectedSocket} from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway({
  cors: {
    origin:"*"
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto) {
    const msg = await this.chatService.create(createChatDto);
    this.server.emit("msg",msg)
    return msg
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('join')
  join(
    @MessageBody("name") name: string,
    @ConnectedSocket()   client:Socket
  ) { 
    return this.chatService.joinRoom(name,client)
  }

  @SubscribeMessage('typing')
  typing(
    @MessageBody("typing") isTyping: boolean,
    @ConnectedSocket()   client:Socket
  ) {
    return this.chatService.findUser(client.id)
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
