export default interface Job {
    jobId:string
    numOfEmailsToBeSent:number
    numOfEmailsSentSoFar:number
    status: "initiating" | "running" | "failed" | "success"
}