import { OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export default class Socket implements OnModuleInit{
    @WebSocketServer()
    server:Server;

    constructor(private readonly eventEmitter: EventEmitter2,private readonly configService:ConfigService) {}

    onModuleInit() {
        const emitterJobCreatedEvent = this.configService.get("EMITTER_JOB_CREATED_EVENT");
        const emitterJobUpdatedEvent = this.configService.get("EMITTER_JOB_UPDATED_EVENT");
        const socketJobCreatedEvent = this.configService.get("SOCKET_JOB_CREATED_EVENT");
        const socketJobUpdatedEvent = this.configService.get("SOCKET_JOB_UPDATED_EVENT");
        this.eventEmitter.on(emitterJobCreatedEvent,(event) =>{
            this.server.emit(socketJobCreatedEvent,event);
        });
        this.eventEmitter.on(emitterJobUpdatedEvent,(event) =>{
            this.server.emit(socketJobUpdatedEvent,event);
        });
    }
}