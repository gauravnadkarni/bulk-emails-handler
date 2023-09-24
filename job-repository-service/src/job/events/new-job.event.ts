import {Job as JobDto} from '../dto/job.dto';

export default class NewJobEvent {
    constructor(public jobDto:JobDto) {}
}