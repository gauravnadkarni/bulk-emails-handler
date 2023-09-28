import { OnModuleInit } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export default class Socket implements OnModuleInit{
    @WebSocketServer()
    server:Server;

    constructor(private readonly eventEmitter: EventEmitter2) {}

    onModuleInit() {
        this.eventEmitter.on('job.created',(event) =>{
            this.server.emit('job.created',event);
        });
        this.eventEmitter.on('job.updated',(event) =>{
            this.server.emit('job.updated',event);
        });
    }
}