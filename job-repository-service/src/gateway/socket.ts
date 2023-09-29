import { OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Job } from "../job/dto/job.dto";
import { JobService } from "src/job/job.service";

@WebSocketGateway()
export default class Socket implements OnModuleInit{
    @WebSocketServer()
    server:Server;

    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly configService:ConfigService,
        private readonly jobService:JobService
    ) {}

    onModuleInit() {
        const emitterJobCreatedEvent = this.configService.get("EMITTER_JOB_CREATED_EVENT");
        const emitterJobUpdatedEvent = this.configService.get("EMITTER_JOB_UPDATED_EVENT");
        const socketJobCreatedEvent = this.configService.get("SOCKET_JOB_CREATED_EVENT");
        const socketJobUpdatedEvent = this.configService.get("SOCKET_JOB_UPDATED_EVENT");
        const socketJobsRefreshEvent = this.configService.get("SOCKET_JOBS_REFRESH_EVENT");
        this.eventEmitter.on(emitterJobCreatedEvent,(event) =>{
            this.server.emit(socketJobCreatedEvent,event);
        });
        this.eventEmitter.on(emitterJobUpdatedEvent,(event) =>{
            this.server.emit(socketJobUpdatedEvent,event);
        });
        this.server.on("connection",async (socket)=>{
            socket.on(socketJobsRefreshEvent,async ()=>{
                const jobs:Array<Job> = await this.jobService.findAllJobs();
                this.server.emit("jobs.refresh",jobs);
            });
        });
    }
}