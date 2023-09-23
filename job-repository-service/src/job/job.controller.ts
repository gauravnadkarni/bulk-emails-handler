import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, interval, map } from 'rxjs';

@Controller('jobs')
export class JobController {

    constructor(private eventEmitter:EventEmitter2){}

    @Sse("sse")
    createJob():Observable<MessageEvent> {
        /*return fromEvent(this.eventEmitter, "email.sent")
            .pipe(map(price => {
                return { data: price } as MessageEvent;
            }));*/
        return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
    }
}
