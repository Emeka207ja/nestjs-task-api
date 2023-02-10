import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import {Socket} from "socket.io"

@Injectable()
export class ChatService {
  private messages: Chat[] = []
  private userStorage = {}

  create(createChatDto: CreateChatDto):CreateChatDto {
    const newMsg = {...createChatDto}
    this.messages.push(newMsg)
    return newMsg;
  }

  findAll():Chat[] {
    return this.messages;
  }
  joinRoom(name: string, client: Socket) {
    this.userStorage[client?.id] = name;
    return Object.values(this.userStorage);
  }

  findUser(id: string) {
    return this.userStorage[id]
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
