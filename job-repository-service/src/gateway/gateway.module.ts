import { Module, OnModuleInit } from "@nestjs/common";
import Socket from "./socket";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Server } from "socket.io";
import { WebSocketServer } from "@nestjs/websockets";
import { JobModule } from "src/job/job.module";

@Module({
    imports: [EventEmitter2,JobModule],
    providers:[Socket]
})
export class GatewayModule {}