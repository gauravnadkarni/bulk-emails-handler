import { Module, OnModuleInit } from "@nestjs/common";
import Socket from "./socket";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Server } from "socket.io";
import { WebSocketServer } from "@nestjs/websockets";

@Module({
    imports: [EventEmitter2],
    providers:[Socket]
})
export class GatewayModule {}